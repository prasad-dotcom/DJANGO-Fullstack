from django.urls import path
from . import views

urlpatterns = [
    path('Freelancers/',views.Freelancers,name='Freelancers'),
    path('Freelancers/<int:id>/',views.freelancer_details,name='freelancer_details'),
    path('recruiters/',views.Recruiters.as_view(),name='Recruiters'),
    path('recruiters/<int:id>/',views.recruiter_details.as_view(),name='recruiter_details'),
    path('accounts/register/',views.UserRegistrationView.as_view(),name='registration'),
    path('accounts/login/',views.UserLoginView.as_view(),name='login_user'),
    path('accounts/profile/',views.ProfileView.as_view(),name='profile'),
    path('accounts/passwordchange/',views.ChangePasswordView.as_view(),name='change_password'),
    path('accounts/passwordreset/',views.SendPasswordResetEmailView.as_view(),name='send_reset_password_email'),
    path('accounts/reset/<uid>/<token>/',views.PasswordResetView.as_view(),name='reset_password'),
]