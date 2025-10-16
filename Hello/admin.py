from django.contrib import admin
from .models import Freelancer_detail

# Register your models here.
@admin.register(Freelancer_detail)
class FreelancerDetailAdmin(admin.ModelAdmin):
<<<<<<< HEAD
    list_display = ('user_id',  'name','email',  'skills')
=======
    list_display = ('user_id', 'user', 'name')
>>>>>>> origin/main

    def user_id(self, obj):
        return obj.user_id
    user_id.short_description = 'User ID'