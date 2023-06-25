from datetime import datetime
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

default_location = settings.MEDIA_ROOT + '/uploads/'

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
                        # 'img': base64.b64encode(teacher['image_data']).decode('utf-8'),
                        'FirstName': teacher['FirstName'],
                        'LastName': teacher['LastName'],
                        'Email': teacher['Email'],
                        'Phone': teacher['Phone'],
                        'date': teacher['joining_date'],
                        # 'cvData': base64.b64encode(teacher['cv_file']).decode('utf-8'),
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

def remove_user(request: Request, teacher_id):
    if request.method == 'DELETE':
        try:
            print(teacher_id)
            teacher = Teacher.objects.get(TeacherID=teacher_id)
            user = teacher.user_uuid
            user.delete()
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
            teacher_data = json.loads(request.body)
            user = User.objects.get(uuid=teacher_data['user_uuid'])
            new_teacher = Teacher(
                FirstName=teacher_data['FirstName'],
                LastName=teacher_data['LastName'],
                Email=teacher_data['Email'],
                Phone=teacher_data['Phone'],
                # image_file=image_file_path,
                # cv_file=cv_file_path,
                joining_date=teacher_data['date'],
                # about_me=teacher_data['aboutMe'],
                address=teacher_data['address'],
                title=teacher_data['title'],
                user_uuid=user
            )           
            new_teacher.save()
            
            return JsonResponse({'statusCode': 200})
        except Exception as e:
            # Handle any errors
            return JsonResponse({'success': False, 'error': str(e)})
    else:
        # Return an error response for unsupported HTTP methods
        return JsonResponse({'success': False, 'error': 'Server Error'})
    
def create_school(request):
    if request.method == 'POST':
        # Extract the data from the request
        data = json.loads(request.body)
        teacher = Teacher.objects.get(user_uuid=data['user_uuid'])
        school = School.objects.get(SchoolID=data['school'])
        raw_date = data['date']
        formatted_date = datetime.strptime(raw_date, "%Y-%m-%dT%H:%M:%S.%fZ").strftime("%Y-%m-%d")
        teacher_school = TeacherSchool.objects.create(
            teacher=teacher,
            school=school,
            joining_date=formatted_date
        ) # Assuming you are passing the teacher_id from the frontend
        teacher_school.save()
        # Get the Teacher instance
        # Create a new School instance
        return JsonResponse({'message': 'School created successfully'})
    else:
        return JsonResponse({'error': 'Invalid request method'})
    
def get_all_schools(request, user_id):

    teacher = Teacher.objects.get(user_uuid=user_id)
    # Retrieve all schools associated with the teacher
    schools = TeacherSchool.objects.filter(teacher_id=teacher.TeacherID)
    # Prepare the response data
    if schools.exists():
        response_data = []
        for school in schools:
            school_data = {
                'id': school.school.SchoolID,
                'schoolName': school.school.schoolName,
                'hod': school.school.hod,
                'phone': school.school.phone,
                'email': school.school.email,
                'address': school.school.address,
                'city': school.school.city,
                'state': school.school.state,
                'country': school.school.country
            }
            response_data.append(school_data)

        return JsonResponse(response_data, safe=False)
    else:
      return JsonResponse({'error': 'Invalid request method'})  


def delete_school(request, school_id):
    if request.method == 'DELETE':
        school = TeacherSchool.objects.get(school=school_id)
        # Extract the data from the request
        school.delete()
        # Get the Teacher instance
        # Create a new School instance
        return JsonResponse({'message': 'School deleted successfully'})
    else:
        return JsonResponse({'error': 'Invalid request method'})


def delete_section(request, section_id):
    if request.method == 'DELETE':
        school = Section.objects.get(id=section_id)
        # Extract the data from the request
        school.delete()
        # Get the Teacher instance
        # Create a new School instance
        return JsonResponse({'message': 'School deleted successfully'})
    else:
        return JsonResponse({'error': 'Invalid request method'})

def delete_course(request, course_id):
    if request.method == 'DELETE':
        course = TeacherCourses.objects.get(id=course_id)
        # Extract the data from the request
        course.delete()
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
    
    
def add_course(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        print(data)
        user_uuid = data.get('user_uuid')
        school_name = data.get('schools')
        try:
            # Retrieve user email from User table
            teacher = Teacher.objects.get(user_uuid=user_uuid)            
            # Retrieve school ID from School table
            school = School.objects.get(SchoolID=school_name)
            # Create and save course in Course table
            course = TeacherCourses(
                courseID=data['courseID'],
                courseName=data['courseName'],
                courseDetails=data['courseDetails'],
                teacher=teacher, 
                school=school
                )
            course.save()
            
            return JsonResponse({'status': 'success'})
        
        except User.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'User does not exist'})
        
        except Teacher.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Teacher does not exist'})
        
        except School.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'School does not exist'})
        
    else:
        return JsonResponse({'status': 'error', 'message': 'Invalid request method'})

def get_courses(request, user_id):
    # Extract user_uuid from the GET request
    # Retrieve user from the User table
   
    teacher = Teacher.objects.get(user_uuid=user_id)

    courses = TeacherCourses.objects.filter(teacher=teacher.TeacherID)

    # Prepare response data (e.g., course details)
    response_data = []
    for course in courses:
        course_data = {
            'id': course.id,
            'courseID': course.courseID,
            'courseName': course.courseName,
            'schoolName': course.school.schoolName
        }
        response_data.append(course_data)

    return JsonResponse(response_data, safe=False)

def add_section(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        # Retrieve the course based on courseName
        # Create and save the section in the Section table
        course = TeacherCourses.objects.get(id=data['courseName'])
        section = Section(
            course=course,
            sectionID=data['sectionID'],
            num_of_students=data['numOfStudents']
        )
        section.save()

        # Return a success response or redirect to another page
        return JsonResponse({'message': 'Teacher updated successfully'})
    else:
        # Handle GET request case
        # Return an error response or redirect to another page
        return HttpResponseBadRequest('Invalid request method')
    
    
def get_sections(request, courseID):
    # Extract user_uuid from the GET request
    # Retrieve user from the User table
    # Retrieve teacher from the Teacher table using the email
    # # Retrieve courses from the Course table with the teacher_id
    sections = Section.objects.filter(course=courseID)

    # Prepare response data (e.g., course details)
    response_data = []
    for section in sections:
        section_data = {
            'sectionID': section.id,
            'courseName': section.course.CourseName,
            'numOfStudents': section.num_of_students
            # Include other course details as needed
        }
        response_data.append(section_data)

    return JsonResponse(response_data, safe=False)


def get_teacher_creds(request, user_id):
    teacher = Teacher.objects.get(TeacherID=user_id)
    user = User.objects.get(uuid=teacher.user_uuid.uuid)
    response_data = {
        'email': user.email,
        'password': user.password
    }
    return JsonResponse(response_data, safe=False)

def update_teacher(request):
    if request.method == 'PUT':
        data = json.loads(request.body)
        print(data)
        teacher = Teacher.objects.get(TeacherID=data['id'])
        teacher.FirstName=data['FirstName']
        teacher.LastName=data['LastName']
        teacher.Email=data['Email']
        teacher.Phone=data['Phone']
        teacher.address=data['address']
        teacher.title=data['title']
        # Extract the data from the request
        teacher.save()
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
    
    
def get_all_teacher_courses(request, user_id):
    teacherObj = Teacher.objects.get(user_uuid=user_id)
    
    courses = TeacherCourses.objects.filter(teacher=teacherObj.TeacherID)

    # Prepare response data (e.g., course details)
    response_data = []
    for course in courses:
        course_data = {
            'id': course.id,
            'courseName': course.courseName,
            # Include other course details as needed
        }
        response_data.append(course_data)

    return JsonResponse(response_data, safe=False)

def get_all_sections(request, user_id):

    teacher = Teacher.objects.get(user_uuid=user_id)
    # Retrieve all schools associated with the teacher
    courses = TeacherCourses.objects.filter(teacher=teacher.TeacherID)
    # Prepare the response data
    if courses.exists():
        response_data = []
        for course in courses:
            sections = Section.objects.filter(course=course.id)
            if sections.exists():
                for section in sections:
                    section_data = {
                        'id': section.id,
                        'sectionID': section.sectionID,
                        'courseName': course.courseName,
                        'numOfStudents': section.num_of_students,
                    }
                    response_data.append(section_data)

        return JsonResponse(response_data, safe=False)
    else:
      return JsonResponse({'error': 'Invalid request method'})  
