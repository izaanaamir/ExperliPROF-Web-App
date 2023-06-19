from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from requests import Request
from .models import User, Task
from django.core.exceptions import ObjectDoesNotExist
import json
import base64

def login_view(request: Request):
    if request.method == 'POST':
        print(request.method)
        data = json.loads(request.body)
        username = data['username']
        password = data['password']
        print(username, password)
        # Authenticate the user
        try:
            user = User.objects.get(email=username)    
                # Compare the password
            if user.password == password:
                # Valid username and password
                user_uuid = user.uuid
                user_status = user.role
                first_name = user.first_name
                last_name = user.last_name
                display_image = user.display_image
                display_image = base64.b64encode(display_image).decode('utf-8')
                return JsonResponse({'success': True, 'uuid': str(user_uuid), 'role': user_status, 'firstname': first_name, 'lastname': last_name, 'display_image': display_image})
            else:
                # Invalid username or password
                return JsonResponse({'success': False, 'error': 'Invalid username or password.'})
        except ObjectDoesNotExist:
            # User not found
            return JsonResponse({'success': False, 'error': 'Invalid username or password.'})
    else:
        # Return an error response for unsupported HTTP methods
        return JsonResponse({'success': False, 'error': 'Method not allowed.'})
    

def get_user_tasks(request: Request, user_id):
    if request.method == 'GET':
        # Authenticate the user
        try:
            data = []
            all_tasks = Task.objects.filter(UserId=user_id).values()
            list_of_tasks = list(all_tasks)
            print(list_of_tasks)
            if list_of_tasks:
                for task in list_of_tasks:
                    data.append({
                            "id": task["TaskId"],
                            "title": task["TaskName"],
                            'priority': task['Priority'],
                            'due_date': task['DueDate'],
                            'done': task['Completed'],
                            'note': task['EventDetails'],
                    })
                    # Compare the password
                return JsonResponse(data=data, safe=False)
        except ObjectDoesNotExist:
            # User not found
            return JsonResponse({'success': False, 'error': 'No students found'})
    else:
        # Return an error response for unsupported HTTP methods
        return JsonResponse({'success': False, 'error': 'Not available'})
    
    
def add_user_task(request: Request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            user_id = data['userID']
            user = User.objects.get(uuid=user_id)
            new_task = Task(
                    TaskName=data['title'],
                    Priority=data['priority'],
                    DueDate=data['due_date'],
                    Completed=data['done'],
                    EventDetails=data['note'],
                    UserId=user
                )
            new_task.save()
                # Compare the password
            return JsonResponse({'statusCode': 200})
        except ObjectDoesNotExist:
            # User not found
            return JsonResponse({'success': False, 'error': 'Server Error'})
    
    if request.method == 'PUT':
        try:
            data = json.loads(request.body)
            print(data)
            id = data['id']
            row = Task.objects.get(TaskId=id)
            row.TaskName = data['title']
            row.Completed = data['done']
            row.Priority = data['priority']
            row.EventDetails = data['note']
            row.DueDate = data['due_date']
            row.save()
                # Compare the password
            return JsonResponse({'statusCode': 200})
        except ObjectDoesNotExist:
            # User not found
            return JsonResponse({'success': False, 'error': 'Server Error'})
        
def delete_user_task(request: Request):
    if request.method == 'POST':
        try:
            task_id = json.loads(request.body)
            print(task_id)
            row = Task.objects.get(TaskId=task_id)
            row.delete()
                # Compare the password
            return JsonResponse({'statusCode': 200})
        except ObjectDoesNotExist:
            # User not found
            return JsonResponse({'success': False, 'error': 'Server Error'})