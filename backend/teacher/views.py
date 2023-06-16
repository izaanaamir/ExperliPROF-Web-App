from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from requests import Request
from .models import Teacher
from django.core.exceptions import ObjectDoesNotExist
import json
import base64

def get_all_teachers(request: Request):
    if request.method == 'GET':
        # Authenticate the user
        try:
            all_teachers = Teacher.objects.values()
            serialized_data = json.dumps(list(all_teachers))
                # Compare the password
            return JsonResponse({'success': True, 'data': serialized_data})
        except ObjectDoesNotExist:
            # User not found
            return JsonResponse({'success': False, 'error': 'Server Error'})
    else:
        # Return an error response for unsupported HTTP methods
        return JsonResponse({'success': False, 'error': 'Server Error'})

