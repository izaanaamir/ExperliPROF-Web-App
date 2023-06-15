from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from .models import User
from django.core.exceptions import ObjectDoesNotExist

def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        print(username, password)
        # Authenticate the user
        try:
            user = User.objects.get(username=username)    
                # Compare the password
            if user.password == password:
                # Valid username and password
                return JsonResponse({'success': True})
            else:
                # Invalid username or password
                return JsonResponse({'success': False, 'error': 'Invalid username or password.'})
        except ObjectDoesNotExist:
            # User not found
            return JsonResponse({'success': False, 'error': 'Invalid username or password.'})
    else:
        # Return an error response for unsupported HTTP methods
        return JsonResponse({'success': False, 'error': 'Method not allowed.'})

