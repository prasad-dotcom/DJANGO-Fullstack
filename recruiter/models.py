from django.db import models

# Create your models here.

class Recruiter_detail(models.Model):
    user = models.OneToOneField('accounts.Users', on_delete=models.CASCADE, primary_key=True)
    company_name = models.CharField(max_length=100,null=True, blank=True)
    job_title = models.CharField(max_length=100,null=True, blank=True)
    
    def __str__(self):
        return self.user.name

    @property
    def name(self):
        return self.user.name

    @property
    def email(self):
        return self.user.email
