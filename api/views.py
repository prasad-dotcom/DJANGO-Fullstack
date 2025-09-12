from django.shortcuts import render
from django.http import JsonResponse
#importing models from app
from Hello.models import Freelancer_data 
from recruiter.models import Recruiters_data 
#importing serializers
from . serializers import FreelancersSerializer
from . serializers import RecruitersSerializer  
from rest_framework.response import Response #used for json format response for API
from rest_framework import status #to return status.status=HttpErrors
from rest_framework.decorators import api_view #for function-based serializers
from rest_framework.views import APIView  # for class-based function serializers
from django.http import Http404


# Create your views here.

@api_view(['GET','POST'])
def Freelancers(request):
    if request.method == 'GET':
        Freelancer = Freelancer_data.objects.all()
        serializer = FreelancersSerializer(Freelancer, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        serializer = FreelancersSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
@api_view(['GET','PUT','DELETE'])    
def freelancer_details(request,id):
    try:
        Freelancer = Freelancer_data.objects.get(id=id)
    except Freelancer_data.DoesNotExist:
        return Response({'error': 'Freelancer not found'}, status=status.HTTP_404_NOT_FOUND)   
        
    if request.method == 'GET':
        serializer = FreelancersSerializer(Freelancer)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method=='PUT':
        serializer = FreelancersSerializer(Freelancer,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        Freelancer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class Recruiters(APIView):
    def get(self, request):
        Recruiters = Recruiters_data.objects.all()
        serializer = RecruitersSerializer(Recruiters, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer =RecruitersSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class recruiter_details(APIView):
    def get_object(self,id):
        try:
            return Recruiters_data.objects.get(id=id)
        except Recruiters_data.DoesNotExist:
            raise Http404
    def get(self,request,id):
        Recruiter = self.get_object(id)
        serializer = RecruitersSerializer(Recruiter)
        return Response(serializer.data,status=status.HTTP_200_OK)
        