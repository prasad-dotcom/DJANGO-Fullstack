from django.shortcuts import render, HttpResponse
from accounts.models import Users



# Create your views here.

def RegistrationPage(request):
    return render(request,'accounts/register.html')

def LoginPage(request):
    return render(request,'accounts/login.html')

