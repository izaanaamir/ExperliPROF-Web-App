from django.urls import path
from teacher.views import get_all_teachers

urlpatterns = [
    path('get_teachers/', get_all_teachers, name='get_teachers'),
]

