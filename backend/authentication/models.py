from django.db import models

class User(models.Model):
    STATUS_CHOICES = [
        ('Student', 'Student'),
        ('Teacher', 'Teacher'),
        ('Admin', 'Admin'),
    ]
    
    username = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    email = models.EmailField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)

    def __str__(self):
        return self.username

    class Meta:
        db_table = "users"