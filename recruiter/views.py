from django.shortcuts import render,HttpResponse

# Create your views here.

def recruiter_dashboard(request):
    return render(request,'recruiter/recruiter_dashboard.html')
