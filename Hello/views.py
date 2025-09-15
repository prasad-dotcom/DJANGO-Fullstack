
from django.shortcuts import render



# Create your views here.


def index(request):
    return render(request, 'Hello/index.html')

def contact(request):
    return render(request,'Hello/contact.html')

def dynamic(request,id,name):
    
    return render(request,'Hello/dynamic_url.html')

def RegistrationPage(request):
    
    return render(request,'Hello/register.html')

def login(request):
    return render(request,'Hello/login.html')

