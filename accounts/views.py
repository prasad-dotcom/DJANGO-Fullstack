from django.shortcuts import render, HttpResponse
from accounts.models import Users
from django.shortcuts import redirect




# Create your views here.

def RegistrationPage(request):
    return render(request,'accounts/register.html')

def LoginPage(request):
    return render(request,'accounts/login.html')

def ProfilePage(request):
    if not request.user.is_authenticated:
        return redirect('login')  # or your login URL name
    return render(request,'accounts/profile.html',{'user': request.user})

def ChangePasswordPage(request):
    return render(request,'accounts/change_password.html')

