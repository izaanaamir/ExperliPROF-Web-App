from django.contrib.auth import authenticate, login
from django.http import HttpResponse, HttpResponseBadRequest, JsonResponse
from requests import Request
from sqlalchemy import JSON
from .models import *
from authentication.models import *
from django.core.exceptions import ObjectDoesNotExist
import json
import base64
from django.conf import settings
from teacher.models import *

# Create your views here.
def get_all_schools(request):
    #user_uuid = request.GET.get('user_uuid')  # Assuming the user_uuid is passed as a query parameter

    # Retrieve the user based on user_uuid
    # Retrieve the teacher based on the user's email
    # Retrieve all schools associated with the teacher
    # Prepare the response data
    schools = School.objects.all()
    response_data = []
    for school in schools:
        school_data = {
            'id': school.SchoolID,
            'schoolName': school.schoolName,
            'hod': school.hod,
            'phone': school.phone,
            'email': school.email,
            'address': school.address,
            'city': school.city,
            'state': school.state,
            'country': school.country
        }
        response_data.append(school_data)

    return JsonResponse(response_data, safe=False)

def create_school(request):
    if request.method == 'POST':
        # Extract the data from the request
        data = json.loads(request.body)
        school = School.objects.create(
            schoolName=data['schoolName'],
            hod=data['hod'],
            phone=data['phone'],
            email=data['email'],
            address=data['address'],
            city=data['city'],
            state=data['state'],
            country=data['country'],
        ) # Assuming you are passing the teacher_id from the frontend
        school.save()
        # Get the Teacher instance
        # Create a new School instance
        return JsonResponse({'message': 'School created successfully'})
    else:
        return JsonResponse({'error': 'Invalid request method'})
    
    
def delete_school(request, school_id):
    if request.method == 'DELETE':
        print(school_id)
        school = School.objects.get(SchoolID=school_id)
        # Extract the data from the request
        school.delete()
        # Get the Teacher instance
        # Create a new School instance
        return JsonResponse({'message': 'School deleted successfully'})
    else:
        return JsonResponse({'error': 'Invalid request method'})

def update_school(request, school_id):
    if request.method == 'PUT':
        data = json.loads(request.body)
        print(data)
        school= School.objects.get(SchoolID=school_id)
        print(data["schoolName"])
        school.schoolName=data['schoolName']
        school.hod=data['hod']
        school.phone=data['phone']
        school.email=data['email']
        school.address=data['address']
        school.city=data['city']
        school.state=data['state']
        school.country=data['country']
        # Extract the data from the request
        school.save()
        # Get the Teacher instance
        # Create a new School instance
        return JsonResponse({'message': 'School updated successfully'})
    else:
        return JsonResponse({'error': 'Invalid request method'})