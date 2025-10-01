from django.contrib import admin
from .models import Recruiter_detail
from .models import Job

# Register your models here.
@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ('id','recruiter_id', 'recruiter', 'title', 'created_at')
    
    

@admin.register(Recruiter_detail)
class RecruiterDetailAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'user', 'name', 'company_name', 'job_title')

    def user_id(self, obj):
        return obj.user_id
    user_id.short_description = 'User ID'