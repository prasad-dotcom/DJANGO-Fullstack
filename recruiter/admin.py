from django.contrib import admin
from .models import Recruiter_detail
from .models import Job

# Register your models here.
@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ('job_id','recruiter_id', 'recruiter', 'job_role')
    
    

@admin.register(Recruiter_detail)
class RecruiterDetailAdmin(admin.ModelAdmin):
<<<<<<< HEAD
    list_display = ('user_id', 'email', 'name', 'company_name')
=======
    list_display = ('user_id', 'user', 'name')
>>>>>>> origin/main

    def user_id(self, obj):
        return obj.user_id
    user_id.short_description = 'User ID'