from django.urls import path
from . import views

urlpatterns =[
    
    path('contact-us/', views.contact, name='contact'),
    path('register/', views.RegistrationPage, name='register_page'),
    path('login/',views.login,name='login_page'),
    path('<int:id>/<name>/', views.dynamic,name='dynamic'),
]