from django.urls import path
from . import views

app_name = 'accounts'

urlpatterns = [
    path('api/auth/signup/', views.signup, name='signup'),
    path('api/auth/verify-email/', views.verify_email, name='verify-email'),
    path('api/auth/resend-verification/', views.resend_verification, name='resend-verification'),
    path('api/auth/login/', views.login_view, name='login'),
    path('api/auth/refresh/', views.token_refresh, name='token-refresh'),
    path('api/auth/profile/', views.profile, name='profile'),
    path('api/auth/my-registrations/', views.my_registrations, name='my-registrations'),
]
