from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from requests import Request
from sqlalchemy import JSON
from .models import Teacher
from django.core.exceptions import ObjectDoesNotExist
import json
import base64

def get_all_teachers(request: Request):
    if request.method == 'GET':
        # Authenticate the user
        try:
            data = []
            all_teachers = Teacher.objects.values()
            list_of_teachers = list(all_teachers)
            for teacher in list_of_teachers: 
                data.append({
                        "TeacherID": str(teacher["TeacherID"]),
                        'img': base64.b64encode(teacher['image_data']).decode('utf-8'),
                        'FirstName': teacher['FirstName'],
                        'LastName': teacher['LastName'],
                        'Email': teacher['Email'],
                        'Phone': teacher['Phone'],
                        'date': '',
                        'gender': '',
                        'mobile': '',
                        'school': '',
                        'degree': ''
                })
            print(data)
                # Compare the password
            return JsonResponse(data=data, safe=False)
        except ObjectDoesNotExist:
            # User not found
            return JsonResponse({'success': False, 'error': 'Server Error'})
    else:
        # Return an error response for unsupported HTTP methods
        return JsonResponse({'success': False, 'error': 'Server Error'})

