from rest_framework import serializers
from Hello.models import Freelancer_data
from recruiter.models import Recruiters_data
from accounts.models import Users 

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
        