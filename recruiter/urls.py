from django.urls import path
from . import views


urlpatterns = [
    path('Rhome',views.recruiter_dashboard,name='recruiter_home'),
]

