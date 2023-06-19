from django.db import models
from sqlalchemy import Column, Integer, String, LargeBinary
import uuid

class User(models.Model):
    uuid = models.CharField(max_length=255, primary_key=True, editable=False)
    email = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    role = models.CharField(max_length=50)
    display_image = models.BinaryField(blank=True, null=True, default= b'')
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    
    class Meta:
        db_table = "users"
        
class Task(models.Model):
    TaskId = models.AutoField(primary_key=True)
    TaskName = models.CharField(max_length=255)
    Priority = models.CharField(max_length=255)
    DueDate = models.CharField(max_length=255)
    Completed = models.BooleanField()
    EventDetails = models.CharField(max_length=255)
    UserId = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, db_column='UserId')
    
    class Meta:
        db_table = "task"