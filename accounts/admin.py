from django.contrib import admin
from accounts.models import LoginAttempt, Users, UserJobList
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin


# Register your models here.
class UserModelAdmin(BaseUserAdmin):


    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserAdmin
    # that reference specific fields on auth.User.
    list_display = ["id", "email", "name", "role", "tc", "is_admin"]
    list_filter = ["is_admin"]
    fieldsets = [
        ('User Credentials', {"fields": ["email", "password"]}),
        ("Personal info", {"fields": ["name", "tc", "role"]}),
        ("Permissions", {"fields": ["is_admin",]}),
    ]
    # add_fieldsets is not a standard ModelAdmin attribute. UserAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    add_fieldsets = [
        (
            None,
            {
                "classes": ["wide"],
                "fields": ["email", "name", "tc", "role", "password1", "password2"],
            },
        ),
    ]
    search_fields = ["email","role"]
    ordering = ["email", "id"]
    filter_horizontal = []
    
@admin.register(LoginAttempt)
class LoginAttemptAdmin(admin.ModelAdmin):
    list_display = ('email', 'timestamp', 'success', 'ip_address', 'user_agent')
    list_filter = ('success', 'timestamp', 'email')
    search_fields = ('email', 'ip_address', 'user_agent')


@admin.register(UserJobList)
class UserJobListAdmin(admin.ModelAdmin):
    list_display = ('id','user', 'saved_job_ids','applied_job_ids',  'updated_at')         
    search_fields = ('user', 'name')
    readonly_fields = ('updated_at',)


# Now register the new UserAdmin...
admin.site.register(Users, UserModelAdmin)

