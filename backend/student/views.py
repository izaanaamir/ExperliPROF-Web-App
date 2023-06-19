import base64
import json
from django.shortcuts import render
from requests import Request
from .models import Student
from django.http import HttpResponse, JsonResponse
from django.core.exceptions import ObjectDoesNotExist


def student_list(request):
    cell_number = (
        Student.objects.filter(FirstName="Izaan")
        .values_list("CellphoneNumber", flat=True)
        .first()
    )
    return HttpResponse(cell_number)

def add_student(request: Request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            print(data)
            new_student = Student(
                    FirstName=data['FirstName'],
                    LastName=data['LastName'],
                    Matricule=data['Matricule'],
                    GroupMajor=data['GroupMajor'],
                    StudentStatus=data['statusOfStudent'],
                    SpecialArrangement=data['specialRequirement'],
                    PersonalEmail=data['PersonalEmail'],
                    School=data['school'],
                    registrationNumber=data['registrationNumber'],
                    SchoolEmail=data['Email'],
                    Title=data['title']
                )           
            new_student.save()
                # Compare the password
            return JsonResponse({'statusCode': 200})
        except ObjectDoesNotExist:
            # User not found
            return JsonResponse({'success': False, 'error': 'Server Error'})
    else:
        # Return an error response for unsupported HTTP methods
        return JsonResponse({'success': False, 'error': 'Server Error'})
    
def get_all_students(request: Request):
    if request.method == 'GET':
        # Authenticate the user
        try:
            data = []
            all_students = Student.objects.values()
            list_of_students = list(all_students)
            print(list_of_students)
            if list_of_students:
                for student in list_of_students:
                    data.append({
                            "studentId": str(student["StudentID"]),
                            'FirstName': student['FirstName'],
                            'LastName': student['LastName'],
                            'SchoolEmail': student['SchoolEmail'],
                            'PersonalEmail': student['PersonalEmail'],
                            'title': student['Title'],
                            'registrationNumber': student['registrationNumber'],
                            'groupMajor': student['GroupMajor'],
                            'GSM': student['Matricule'],
                            'statusOfStudent': student['StudentStatus'],
                            'specialRequirements': student['SpecialArrangement'],
                            'school': 'ESIEE'
                    })
                    # Compare the password
                return JsonResponse(data=data, safe=False)
        except ObjectDoesNotExist:
            # User not found
            return JsonResponse({'success': False, 'error': 'No students found'})
    else:
        # Return an error response for unsupported HTTP methods
        return JsonResponse({'success': False, 'error': 'Not available'})
