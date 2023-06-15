from django.urls import path
from authentication.views import login_view

urlpatterns = [
    path('login/', login_view, name='login'),
]

