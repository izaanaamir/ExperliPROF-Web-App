from django.db import models

from django.db import models

class Student(models.Model):
    StudentID = models.AutoField(primary_key=True)
    FirstName = models.CharField(max_length=255, null=True)
    LastName = models.CharField(max_length=255, null=True)
    Title = models.CharField(max_length=255, null=True)
    Matricule = models.CharField(max_length=255, null=True)
    GroupMajor = models.CharField(max_length=255, null=True)
    CellphoneNumber = models.CharField(max_length=255, null=True)
    StudentStatus = models.CharField(
        max_length=255,
        choices=(
            ('Value1', 'Value1'),
            ('Value2', 'Value2'),
            ('Value3', 'Value3'),
        ),
        null=True
    )
    SpecialArrangement = models.CharField(max_length=255, null=True)
    PersonalEmail = models.CharField(max_length=255, null=True)
    SchoolEmail = models.CharField(max_length=255, null=True)
    SchoolID = models.IntegerField(null=True)

    def __str__(self):
        return f"{self.FirstName} {self.LastName}"

    class Meta:
        db_table = 'students'

