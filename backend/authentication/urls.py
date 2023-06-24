from django.urls import path
from authentication.views import *

urlpatterns = [
    path('login/', login_view, name='login'),
    path('add_user_task/', add_user_task, name='add_user_task'),
    path("get_user_tasks/<str:user_id>", get_user_tasks, name='get_user_tasks'),
    path("delete_user_task/", delete_user_task, name='delete_user_task'),
    path("get_user_info/<str:user_id>", get_user_data, name='get_user_data'),
    path("create_user/", create_user, name='create_user'),
]

