from django.db import models

# Create your models here.

class Freelancer_data(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    skills = models.TextField()
