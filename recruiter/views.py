from django.shortcuts import render,HttpResponse

# Create your views here.

def start(request):
    return HttpResponse("Hello, Recruiter!")
