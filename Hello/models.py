from django.db import models
from accounts.models import Users

# Create your models here.

class Freelancer_detail(models.Model):
    user = models.OneToOneField(Users, on_delete=models.CASCADE, primary_key=True)
    age = models.IntegerField(null=True, blank=True)
    skills = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.user.name

    @property
    def name(self):
        return self.user.name

    @property
    def email(self):
        return self.user.email

