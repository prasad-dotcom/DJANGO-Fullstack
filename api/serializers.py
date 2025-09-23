from rest_framework import serializers
from Hello.models import Freelancer_data
from recruiter.models import Recruiters_data
from accounts.models import Users 
#imports required for reset password via email
from django.core.exceptions import ValidationError
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from .utils import Util  # Make sure utils.py is in the same directory, or adjust the import as needed

class FreelancersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Freelancer_data
        fields = '__all__'
        
class RecruitersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recruiters_data
        fields ='__all__'
        
class UserRegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type':'password'},write_only=True)
    class Meta:
        model= Users
        fields=['email','name','role','password','password2','tc']
        extra_kwargs = {'password':{'write_only':True},'password2':{'write_only':True}}
        
    def validate(self,attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        role = attrs.get('role', None)
        if password != password2:
            raise serializers.ValidationError("Password and Confirm Password doesn't match")
        if not role:
            raise serializers.ValidationError("Role is required Field")
        return attrs

    def create(self,validate_data):
        return Users.objects.create_user(**validate_data)


class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255)
    class Meta:
        model = Users
        fields = ['email','password']
        

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['id','email','name']
        
class ChangePasswordSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=255,style={'input_type':'password'},write_only=True)
    password2 = serializers.CharField(max_length=255,style={'input_type':'password'},write_only=True)
    class Meta:
        model = Users
        fields=['password','password2']
        
    def validate(self,attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        user = self.context.get('user')
        if password != password2:
            raise serializers.ValidationError("Password and Confirm Password doesn't match")
        user.set_password(password)
        user.save()
        return attrs
    
class SendPasswordResetEmailSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255)
    class Meta:
        model = Users
        fields = ['email']
        
    def validate(self,attrs):
        email = attrs.get('email')
        if Users.objects.filter(email=email).exists():
            user = Users.objects.get(email=email)
            uid = urlsafe_base64_encode(smart_bytes(user.id))
            print('Encoded UID', uid)
            token = PasswordResetTokenGenerator().make_token(user)
            print('Password Reset Token', token)
            link = 'http://localhost:3000/api/accounts/reset/'+uid+'/'+token
            print('Password Reset Link', link)
            #sending email
            body = 'Click Following Link to Reset Your Password \n ' + link
            data = {
                'subject': 'Reset Password Link',
                'body': body,
                'to_email': user.email
            }
            Util.send_email(data)
            
            return attrs
        else:
            raise ValidationError("You are not a Registered User")
    
class PasswordResetSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=255,style={'input_type':'password'},write_only=True)
    password2 = serializers.CharField(max_length=255,style={'input_type':'password'},write_only=True)
    class Meta:
        model = Users
        fields=['password','password2']
        
    def validate(self,attrs):
        try:
            password = attrs.get('password')
            password2 = attrs.get('password2')
            uid = self.context.get('uid')
            token = self.context.get('token')
            if password != password2:
                raise serializers.ValidationError("Password and Confirm Password doesn't match")
            id = smart_str(urlsafe_base64_decode(uid))
            user = Users.objects.get(id=id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise ValidationError("Token is not Valid or Expired")
            user.set_password(password)
            user.save()
            return attrs
        except DjangoUnicodeDecodeError as identifier:
            PasswordResetTokenGenerator().check_token(user, token)
            raise ValidationError("Token is not Valid or Expired")
         