from django.urls import path
from teacher.views import *

urlpatterns = [
    path('get_teachers/', get_all_teachers, name='get_teachers'),
    path('remove_teacher/<int:teacher_id>', remove_teacher, name='remove_teachers'),
    path('add_teacher_school/', create_school, name='create_school'),
    path('add_teacher/', add_teacher, name='add_teacher'),
    path('get_all_schools/<str:user_id>', get_all_schools, name='get_all_schools'),
    path('add_course/', add_course, name='add_course'),
    path('get_courses/<str:user_id>', get_courses, name='get_courses'),
    path('add_section/', add_section, name='add_section'),
    path('get_all_sections/<int:courseID>', get_sections, name='get_sections'),
    path('remove_school/<int:school_id>', delete_school, name='delete_school'),
    path('update_school/<int:school_id>', update_school, name='update_school'),
]

