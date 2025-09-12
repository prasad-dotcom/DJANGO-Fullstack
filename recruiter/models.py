from django.db import models

# Create your models here.

class Recruiters_data(models.Model):
    Recruiter_name = models.CharField(max_length=100)
    Organisation = models.CharField(max_length=100)
    Position = models.CharField(max_length=100)
    
    