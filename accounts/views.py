from django.shortcuts import render, HttpResponse

# Create your views here.

def register(request):
    return HttpResponse("This is register page")

def login(request):
    return HttpResponse("This is login page")
