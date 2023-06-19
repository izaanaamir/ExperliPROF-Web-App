from django.urls import path
from student.views import *

urlpatterns = [
    path('get_students/', get_all_students, name='get_students'),    
    path('add_student/', add_student, name='add_students'),
]
