import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.contrib.auth import authenticate
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User


def get_user_from_token(request):
    """Extract user from JWT Authorization header."""
    auth_header = request.META.get('HTTP_AUTHORIZATION', '')
    if not auth_header.startswith('Bearer '):
        return None
    token_str = auth_header.split(' ')[1]
    try:
        from rest_framework_simplejwt.tokens import AccessToken
        token = AccessToken(token_str)
        user_id = token['user_id']
        return User.objects.get(id=user_id)
    except Exception:
        return None


def send_verification_email(user):
    """Send a verification code email to the user."""
    code = user.generate_verification_code()

    context = {
        'name': user.get_full_name() or user.username,
        'code': code,
    }

    html_content = render_to_string('accounts/emails/verification_code.html', context)
    text_content = strip_tags(html_content)

    subject = f"Your Verification Code: {code} — IEEE-CS Portal"
    from_email = None  # Uses DEFAULT_FROM_EMAIL
    to = [user.email]

    try:
        msg = EmailMultiAlternatives(subject, text_content, from_email, to)
        msg.attach_alternative(html_content, "text/html")
        msg.send()
        return True
    except Exception as e:
        print(f"Error sending verification email: {e}")
        return False


@csrf_exempt
@require_http_methods(["POST"])
def signup(request):
    """Create a new user account and send verification email."""
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)

    required_fields = ['email', 'password', 'first_name', 'last_name']
    missing = [f for f in required_fields if not data.get(f)]
    if missing:
        return JsonResponse({'error': f'Missing required fields: {", ".join(missing)}'}, status=400)

    email = data['email'].strip().lower()
    password = data['password']

    if len(password) < 8:
        return JsonResponse({'error': 'Password must be at least 8 characters long'}, status=400)

    if User.objects.filter(email=email).exists():
        return JsonResponse({'error': 'An account with this email already exists'}, status=400)

    # Create username from email (before @)
    username = email.split('@')[0]
    base_username = username
    counter = 1
    while User.objects.filter(username=username).exists():
        username = f"{base_username}{counter}"
        counter += 1

    user = User.objects.create_user(
        username=username,
        email=email,
        password=password,
        first_name=data['first_name'],
        last_name=data['last_name'],
        college_name=data.get('college_name', ''),
        department=data.get('department', ''),
        year=data.get('year', ''),
        is_ieee_member=data.get('is_ieee_member', False),
        ieee_id=data.get('ieee_id', ''),
        is_email_verified=False,
    )

    # Send verification email
    send_verification_email(user)

    return JsonResponse({
        'success': True,
        'message': 'Account created. Please verify your email with the code sent to your inbox.',
        'email': user.email,
    }, status=201)


@csrf_exempt
@require_http_methods(["POST"])
def verify_email(request):
    """Verify the email with the 6-digit code."""
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)

    email = data.get('email', '').strip().lower()
    code = data.get('code', '').strip()

    if not email or not code:
        return JsonResponse({'error': 'Email and verification code are required'}, status=400)

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return JsonResponse({'error': 'Account not found'}, status=404)

    if user.is_email_verified:
        return JsonResponse({'error': 'Email is already verified'}, status=400)

    if user.is_verification_code_valid(code):
        user.is_email_verified = True
        user.email_verification_code = ''
        user.save(update_fields=['is_email_verified', 'email_verification_code'])

        # Return JWT tokens so user is logged in after verification
        refresh = RefreshToken.for_user(user)
        return JsonResponse({
            'success': True,
            'message': 'Email verified successfully!',
            'tokens': {
                'access': str(refresh.access_token),
                'refresh': str(refresh),
            },
            'user': _user_to_dict(user),
        })
    else:
        return JsonResponse({'error': 'Invalid or expired verification code'}, status=400)


@csrf_exempt
@require_http_methods(["POST"])
def resend_verification(request):
    """Resend the verification code."""
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)

    email = data.get('email', '').strip().lower()
    if not email:
        return JsonResponse({'error': 'Email is required'}, status=400)

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return JsonResponse({'error': 'Account not found'}, status=404)

    if user.is_email_verified:
        return JsonResponse({'error': 'Email is already verified'}, status=400)

    send_verification_email(user)
    return JsonResponse({'success': True, 'message': 'Verification code resent. Check your inbox.'})


@csrf_exempt
@require_http_methods(["POST"])
def login_view(request):
    """Authenticate and return JWT tokens."""
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)

    email = data.get('email', '').strip().lower()
    password = data.get('password', '')

    if not email or not password:
        return JsonResponse({'error': 'Email and password are required'}, status=400)

    # Find user by email
    try:
        user_obj = User.objects.get(email=email)
    except User.DoesNotExist:
        return JsonResponse({'error': 'Invalid email or password'}, status=401)

    user = authenticate(username=user_obj.username, password=password)
    if user is None:
        return JsonResponse({'error': 'Invalid email or password'}, status=401)

    if not user.is_email_verified:
        # Resend verification email
        send_verification_email(user)
        return JsonResponse({
            'error': 'Email not verified. A new verification code has been sent to your email.',
            'needs_verification': True,
            'email': user.email,
        }, status=403)

    refresh = RefreshToken.for_user(user)
    return JsonResponse({
        'success': True,
        'tokens': {
            'access': str(refresh.access_token),
            'refresh': str(refresh),
        },
        'user': _user_to_dict(user),
    })


@csrf_exempt
@require_http_methods(["POST"])
def token_refresh(request):
    """Refresh the JWT access token."""
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)

    refresh_token = data.get('refresh')
    if not refresh_token:
        return JsonResponse({'error': 'Refresh token is required'}, status=400)

    try:
        refresh = RefreshToken(refresh_token)
        return JsonResponse({
            'success': True,
            'access': str(refresh.access_token),
        })
    except Exception:
        return JsonResponse({'error': 'Invalid or expired refresh token'}, status=401)


@csrf_exempt
@require_http_methods(["GET", "PUT"])
def profile(request):
    """Get or update the authenticated user's profile."""
    user = get_user_from_token(request)
    if not user:
        return JsonResponse({'error': 'Authentication required'}, status=401)

    if request.method == 'GET':
        return JsonResponse({'user': _user_to_dict(user)})

    # PUT — update profile
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)

    updatable_fields = ['first_name', 'last_name', 'college_name', 'department', 'year', 'is_ieee_member', 'ieee_id']
    for field in updatable_fields:
        if field in data:
            setattr(user, field, data[field])
    user.save()

    return JsonResponse({'success': True, 'user': _user_to_dict(user)})


@csrf_exempt
@require_http_methods(["GET"])
def my_registrations(request):
    """Return all event registrations for the authenticated user."""
    user = get_user_from_token(request)
    if not user:
        return JsonResponse({'error': 'Authentication required'}, status=401)

    from registration.models import Registration

    registrations = Registration.objects.filter(user=user).select_related('event', 'team').order_by('-created_at')

    data = []
    for reg in registrations:
        reg_data = {
            'id': reg.id,
            'event_id': reg.event.id,
            'event_name': reg.event.name,
            'event_type': reg.event.event_type,
            'event_day': reg.event.day,
            'amount': str(reg.amount),
            'payment_status': reg.payment_status,
            'is_team_leader': reg.is_team_leader,
            'created_at': reg.created_at.isoformat(),
        }
        if reg.team:
            members = reg.team.members.all().order_by('-is_team_leader', 'created_at')
            reg_data['team'] = {
                'name': reg.team.name,
                'code': reg.team.code,
                'member_count': members.count(),
                'max_size': reg.event.team_size_max,
                'members': [
                    {'name': m.name, 'role': 'Leader' if m.is_team_leader else 'Member'}
                    for m in members
                ],
            }
        data.append(reg_data)

    return JsonResponse({'registrations': data})


def _user_to_dict(user):
    """Serialize user to a dict."""
    return {
        'id': user.id,
        'email': user.email,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'username': user.username,
        'college_name': user.college_name,
        'department': user.department,
        'year': user.year,
        'is_ieee_member': user.is_ieee_member,
        'ieee_id': user.ieee_id,
        'is_email_verified': user.is_email_verified,
    }
