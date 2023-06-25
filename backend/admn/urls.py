from django.urls import path
from admn.views import *


urlpatterns = [
    path('get_all_schools/', get_all_schools, name='get_all_schools'),
    path('create_school/', create_school, name='create_school'),
    path('update_school/<int:school_id>', update_school, name='update_school'),
    path('delete_school/<int:school_id>', delete_school, name='delete_school'),
]
