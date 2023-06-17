from django.urls import path
from teacher.views import *

urlpatterns = [
    path('get_teachers/', get_all_teachers, name='get_teachers'),
    path('remove_teacher/<int:teacher_id>', remove_teacher, name='remove_teachers')
]

