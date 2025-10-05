from django.db import models
from accounts.models import Users

# Create your models here.

from django.core.validators import RegexValidator

phone_validator = RegexValidator(
    regex=r'^\+?1?\d{9,15}$',
    message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed."
)

class Freelancer_detail(models.Model):
    user = models.OneToOneField(Users, on_delete=models.CASCADE, primary_key=True)
    mobile_No = models.CharField(max_length=15, validators=[phone_validator],null=True, blank=True)
    bio = models.TextField(null=True, blank=True)
    ge = models.PositiveIntegerField(null=True, blank=True)
    address = models.CharField(max_length=255, null=True, blank=True)
    resume = models.FileField(upload_to='resumes/', null=True, blank=True)
    portfolio = models.URLField(max_length=200, null=True, blank=True)
    sample_work = models.FileField(upload_to='sample_works/', null=True, blank=True)
    hourly_rate = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    lambdainkedin_profile = models.URLField(max_length=200, null=True, blank=True)
    github_profile= models.URLField(max_length=200, null=True, blank=True)
    skills = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.user.name

    @property
    def name(self):
        return self.user.name

    @property
    def email(self):
        return self.user.email
    @property
    def hourly_rate_display(self):
        if self.hourly_rate is None:
            return None
        # format as rupees with symbol
        return f"₹{self.hourly_rate:.2f}"

