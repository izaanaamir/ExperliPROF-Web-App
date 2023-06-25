import base64
import json
from django.shortcuts import render
from requests import Request
from authentication.models import User

from teacher.models import School
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
            school = School.objects.get(SchoolID=data['school'])
            user = User.objects.get(uuid=data['user_uuid'])
            new_student = Student(
                    FirstName=data['firstName'],
                    LastName=data['lastName'],
                    Matricule=data['GSM'],
                    GroupMajor=data['groupmajor'],
                    StudentStatus=data['statusofstudent'],
                    SpecialArrangement=data['specialrequirements'],
                    PersonalEmail=data['personalemail'],
                    School=school,
                    registrationNumber=data['registrationnumber'],
                    SchoolEmail=data['schoolemail'],
                    Title=data['Title'],
                    user_uuid=user
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
            if list_of_students:
                for student in list_of_students:
                    print(student)
                    school = School.objects.get(SchoolID=student['School_id'])
                    data.append({
                            "studentId": str(student["StudentID"]),
                            'firstName': student['FirstName'],
                            'lastName': student['LastName'],
                            'schoolEmail': student['SchoolEmail'],
                            'personalEmail': student['PersonalEmail'],
                            'title': student['Title'],
                            'registrationNumber': student['registrationNumber'],
                            'groupMajor': student['GroupMajor'],
                            'GSM': student['Matricule'],
                            'statusOfStudent': student['StudentStatus'],
                            'specialRequirements': student['SpecialArrangement'],
                            'user_uuid': student['user_uuid_id'],
                            'school': school.schoolName
                    })
                    # Compare the password
                return JsonResponse(data=data, safe=False)
        except ObjectDoesNotExist:
            # User not found
            return JsonResponse({'success': False, 'error': 'No students found'})
    else:
        # Return an error response for unsupported HTTP methods
        return JsonResponse({'success': False, 'error': 'Not available'})


def update_student(request):
    if request.method == 'PUT':
        data = json.loads(request.body)
        print(data)
        student = Student.objects.get(StudentID=data['id'])
        student.LastName=data['LastName']
        student.FirstName=data['FirstName']
        student.Email=data['Email']
        student.Phone=data['Phone']
        student.address=data['address']
        student.title=data['title']
        # Extract the data from the request
        student.save()
        # Get the Teacher instance
        # Create a new School instance
        
        user = User.objects.get(uuid=teacher.user_uuid.uuid)
        user.email = data["Email"]
        user.first_name = data["FirstName"]
        user.last_name = data["LastName"]
        
        user.save()
        return JsonResponse({'message': 'Teacher updated successfully'})
    else:
        return JsonResponse({'error': 'Invalid request method'})
    
def get_student_creds(request, user_id):
    student = Student.objects.get(StudentID=user_id)
    user = User.objects.get(uuid=student.user_uuid.uuid)
    response_data = {
        'email': user.email,
        'password': user.password
    }
    return JsonResponse(response_data, safe=False)