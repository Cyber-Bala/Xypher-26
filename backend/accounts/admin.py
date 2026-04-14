from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from unfold.admin import ModelAdmin
from .models import User


@admin.register(User)
class UserAdmin(BaseUserAdmin, ModelAdmin):
    list_display = ('email', 'first_name', 'last_name', 'college_name', 'is_email_verified', 'is_ieee_member', 'date_joined')
    list_filter = ('is_email_verified', 'is_ieee_member', 'year', 'is_staff', 'is_active')
    search_fields = ('email', 'first_name', 'last_name', 'college_name', 'ieee_id')
    ordering = ('-date_joined',)

    fieldsets = BaseUserAdmin.fieldsets + (
        ('College & IEEE Details', {
            'fields': ('college_name', 'department', 'year', 'is_ieee_member', 'ieee_id'),
        }),
        ('Email Verification', {
            'fields': ('is_email_verified', 'email_verification_code', 'email_verification_sent_at'),
        }),
    )
