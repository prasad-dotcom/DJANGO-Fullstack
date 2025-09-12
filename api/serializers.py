from rest_framework import serializers
from Hello.models import Freelancer_data
from recruiter.models import Recruiters_data
from . import views

class FreelancersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Freelancer_data
        fields = '__all__'
        
class RecruitersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recruiters_data
        fields ='__all__'