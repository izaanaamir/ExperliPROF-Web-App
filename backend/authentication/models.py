from django.db import models
from sqlalchemy import Column, Integer, String, LargeBinary
import uuid

class User(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    role = models.CharField(max_length=50)
    display_image = models.BinaryField(blank=True, null=True, default= b'')
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    
    class Meta:
        db_table = "users"