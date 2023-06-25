from django.urls import path
from student.views import *

urlpatterns = [
    path('get_students/', get_all_students, name='get_students'),    
    path('add_student/', add_student, name='add_students'),
    path('update_student/', update_student, name='update_student'),
    path('get_student_creds/<int:user_id>', get_student_creds, name='get_student_creds'),
]
