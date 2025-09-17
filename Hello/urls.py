from django.urls import path
from . import views



urlpatterns =[
    
    path('contact-us/', views.contact, name='contact'),
    path('Home/',views.Home, name='home'),
    path('about/',views.about, name='about'),

    path('<int:id>/<name>/', views.dynamic,name='dynamic'),
]