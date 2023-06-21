from django.urls import path
from teacher.views import *

urlpatterns = [
    path('get_teachers/', get_all_teachers, name='get_teachers'),
    path('remove_teacher/<int:teacher_id>', remove_teacher, name='remove_teachers'),
    path('add_teacher_school/', create_school, name='create_school'),
    path('add_teacher/', add_teacher, name='add_teacher'),
    path('get_all_schools/<str:user_id>', get_all_schools, name='get_all_schools'),
]

