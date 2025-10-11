from django.db import models

# Create your models here.

class Recruiter_detail(models.Model):
    user = models.OneToOneField('accounts.Users', on_delete=models.CASCADE, primary_key=True)
    about_us = models.TextField(max_length=500, blank=True,null=True)
    company_logo = models.ImageField(upload_to='company_logos/', blank=True, null=True)
    company_name = models.CharField(max_length=255, blank=True,null=True)
    contact_email = models.EmailField(max_length=255, blank=True,null=True)
    company_motive = models.TextField(max_length=500, blank=True,null=True)
    instagram = models.URLField(max_length=200, null=True, blank=True)
    linkedin = models.URLField(max_length=200, null=True, blank=True)
    
    

    
    def __str__(self):
        return self.user.name

    @property
    def name(self):
        return self.user.name

    @property
    def email(self):
        return self.user.email
    
class Job(models.Model):
    id = models.AutoField(primary_key=True)  # Django adds this by default

    recruiter = models.ForeignKey(Recruiter_detail, on_delete=models.CASCADE,related_name='jobs')
    title = models.TextField(max_length=255)
    description = models.TextField()
    Responsibilities = models.TextField()
    skills_required = models.TextField()
    experience_required = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title 
    
    
    