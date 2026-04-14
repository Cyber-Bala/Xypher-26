from django.contrib.auth.models import AbstractUser
from django.db import models
import random
import string
from django.utils import timezone
from datetime import timedelta


class User(AbstractUser):
    """Custom user model with college/IEEE fields for the IEEE-CS portal."""
    YEAR_CHOICES = [
        ('1', '1st Year'),
        ('2', '2nd Year'),
        ('3', '3rd Year'),
        ('4', '4th Year'),
    ]

    email = models.EmailField(unique=True)
    college_name = models.CharField(max_length=300, blank=True)
    department = models.CharField(max_length=200, blank=True)
    year = models.CharField(max_length=1, choices=YEAR_CHOICES, blank=True)
    is_ieee_member = models.BooleanField(default=False)
    ieee_id = models.CharField(max_length=50, blank=True)

    # Email verification
    is_email_verified = models.BooleanField(default=False)
    email_verification_code = models.CharField(max_length=6, blank=True)
    email_verification_sent_at = models.DateTimeField(null=True, blank=True)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'first_name', 'last_name']

    def __str__(self):
        return f"{self.get_full_name()} ({self.email})"

    def generate_verification_code(self):
        """Generate a 6-digit verification code."""
        self.email_verification_code = ''.join(random.choices(string.digits, k=6))
        self.email_verification_sent_at = timezone.now()
        self.save(update_fields=['email_verification_code', 'email_verification_sent_at'])
        return self.email_verification_code

    def is_verification_code_valid(self, code):
        """Check if the verification code is valid and not expired (15 min window)."""
        if not self.email_verification_code or not self.email_verification_sent_at:
            return False
        if self.email_verification_code != code:
            return False
        # Code expires after 15 minutes
        expiry = self.email_verification_sent_at + timedelta(minutes=15)
        return timezone.now() <= expiry
