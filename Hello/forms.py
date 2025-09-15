from django import forms
from django.contrib.auth.forms import UsersCreationForm

from accounts.models import Users

class RegistrationForm(forms.ModelForm):
    email=forms.EmailField(max_length=100)
    name=forms.CharField(max_length=100)
    role=forms.ChoiceField(choices=(('freelancer','Freelancer'),('recruiter','Recruiter')))
    password=forms.CharField(max_length=100,widget=forms.PasswordInput)
    password2=forms.CharField(max_length=100,widget=forms.PasswordInput)

    class Meta:
        model=Users
        fields=['email','name','role','password','password2']
        widgets ={
            "password": forms.PasswordInput(),
        }
        
        
        
        