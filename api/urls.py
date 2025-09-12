from django.urls import path
from . import views

urlpatterns = [
    path('Freelancers/',views.Freelancers,name='Freelancers'),
    path('Freelancers/<int:id>/',views.freelancer_details,name='freelancer_details'),
    path('recruiters/',views.Recruiters.as_view(),name='Recruiters'),
    path('recruiters/<int:id>/',views.recruiter_details.as_view(),name='recruiter_details'),
]