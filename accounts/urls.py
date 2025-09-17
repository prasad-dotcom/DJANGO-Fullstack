from django.urls import path
from . import views


urlpatterns =[
    
   path('register/',views.RegistrationPage,name='register_page'),
   path('login/',views.LoginPage,name='login_page'),
   path('profile/',views.ProfilePage,name='profile_page'),
   path('change-password/',views.ChangePasswordPage,name='change_password_page'),
   

    
]