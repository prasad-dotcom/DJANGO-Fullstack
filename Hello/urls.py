from django.urls import path
from . import views
from Hello import views


urlpatterns =[
    
    path('contact-us/', views.contact, name='contact'),
    path('Home/',views.Home, name='home'),

    path('<int:id>/<name>/', views.dynamic,name='dynamic'),
]