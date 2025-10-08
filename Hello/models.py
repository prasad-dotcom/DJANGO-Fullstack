from django.db import models
from accounts.models import Users
from phonenumber_field.modelfields import PhoneNumberField

# Create your models here.

class Freelancer_detail(models.Model):
    user = models.OneToOneField(Users, on_delete=models.CASCADE, primary_key=True)
    profile_photo = models.ImageField(upload_to='profile_photos/', null=True, blank=True)
    course = models.CharField(max_length=100, null=True, blank=True)
    bio = models.TextField(null=True, blank=True)
    skills = models.TextField(null=True, blank=True)
    experience = models.TextField(null=True, blank=True)
    linkedin = models.URLField(max_length=200, null=True, blank=True)
    Github = models.URLField(max_length=200, null=True, blank=True)
    portfolio = models.URLField(max_length=200, null=True, blank=True)
    languages = models.CharField(max_length=100, null=True, blank=True)
    courseName = models.TextField(null=True, blank=True)
    university = models.TextField(null=True, blank=True)
    completionDate = models.DateField(null=True, blank=True)
    jobpreferences = models.CharField(max_length=100, null=True, blank=True)
    resume = models.FileField(upload_to='resumes/',null=True, blank=True)
    phone = PhoneNumberField(null=True, blank=True, unique=True)

    def __str__(self):
        return self.user.name

    @property
    def name(self):
        return self.user.name

    @property
    def email(self):
        return self.user.email

