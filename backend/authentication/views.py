from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from requests import Request
from .models import User
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

