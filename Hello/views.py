
from django.shortcuts import render



# Create your views here.


def index(request):
    return render(request, 'Hello/index.html')

def Home(request):
    return render(request,'Hello/home.html')

def contact(request):
    return render(request,'Hello/contact.html')

def dynamic(request,id,name):
    
    return render(request,'Hello/dynamic_url.html')

def about(request):
    return render(request,'Hello/about.html')

