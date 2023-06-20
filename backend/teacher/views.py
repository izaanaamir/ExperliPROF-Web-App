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
                        'date': teacher['joining_date'],
                        'cvData': base64.b64encode(teacher['cv_file']).decode('utf-8'),
                        'aboutMe': teacher['about_me'],
                        'address': teacher['address'],
                        'title': teacher['title']
                })
                # Compare the password
            return JsonResponse(data=data, safe=False)
        except ObjectDoesNotExist:
            # User not found
            return JsonResponse({'success': False, 'error': 'Server Error'})
    else:
        # Return an error response for unsupported HTTP methods
        return JsonResponse({'success': False, 'error': 'Server Error'})

def remove_teacher(request: Request, teacher_id):
    if request.method == 'DELETE':
        try:
            print(teacher_id)
            teacher = Teacher.objects.filter(TeacherID=teacher_id)
            teacher.delete()
                # Compare the password
            return JsonResponse({'statusCode': 200})
        except ObjectDoesNotExist:
            # User not found
            return JsonResponse({'success': False, 'error': 'Server Error'})
    else:
        # Return an error response for unsupported HTTP methods
        return JsonResponse({'success': False, 'error': 'Server Error'})
    
def add_teacher(request: Request):
    if request.method == 'POST':
        try:
            teacher_data = json.loads(request.POST.get('teachersData'))
            # data = json.loads(request.body)
            print(teacher_data)
            teacher_data['cvData'] = request.FILES.get('cvData')
            teacher_data['img'] = request.FILES.get('img')
            new_teacher = Teacher(
                    FirstName=teacher_data['FirstName'],
                    LastName=teacher_data['LastName'],
                    Email=teacher_data['Email'],
                    Phone=teacher_data['Phone'],
                    image_data=teacher_data['img'],
                    cv_file=teacher_data['cvData'],
                    joining_date=teacher_data['date'],
                    about_me=teacher_data['aboutMe'],
                    address=teacher_data['address'],
                    title=teacher_data['title']
                )           
            new_teacher.save()
                # Compare the password
            return JsonResponse({'statusCode': 200})
        except ObjectDoesNotExist:
            # User not found
            return JsonResponse({'success': False, 'error': 'Server Error'})
    else:
        # Return an error response for unsupported HTTP methods
        return JsonResponse({'success': False, 'error': 'Server Error'})
