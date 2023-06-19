from django.db import models
#from ..teacher.models import Teacher
from teacher.models import School, Teacher, Course
class Student(models.Model):
    StudentID = models.AutoField(primary_key=True, db_column='studentId')
    FirstName = models.CharField(max_length=255, null=True, db_column='firstName')
    LastName = models.CharField(max_length=255, null=True, db_column='lastName')
    Title = models.CharField(max_length=255, null=True, db_column='Title')
    Matricule = models.CharField(max_length=255, null=True, db_column='GSM')
    GroupMajor = models.CharField(max_length=255, null=True, db_column='groupMajor')
    StudentStatus = models.CharField(
        max_length=255,
        null=True,
        db_column='statusOfStudent'
    )
    SpecialArrangement = models.CharField(max_length=255, null=True, db_column='specialRequirements')
    PersonalEmail = models.CharField(max_length=255, null=True, db_column='personalEmail')
    SchoolEmail = models.CharField(max_length=255, null=True, db_column='schoolEmail')
    School = models.IntegerField(null=True, db_column='schoolId')
    registrationNumber = models.CharField(max_length=255, null=True, db_column='registrationNumber')

    def __str__(self):
        return f"{self.FirstName} {self.LastName}"

    class Meta:
        db_table = "students"
        

class Lesson(models.Model):
    LessonID = models.AutoField(primary_key=True)
    Course = models.ForeignKey(Course, on_delete=models.CASCADE, db_column='CourseID')
    NumberOfLecture = models.IntegerField()
    StartingTime = models.TimeField()
    EndingTime = models.TimeField()
    Duration = models.IntegerField()
    ObjectiveOfLesson = models.CharField(max_length=255)
    ContentOfLesson = models.CharField(max_length=255)
    TeachingMethodUsed = models.CharField(max_length=255)
    EvaluationMethodUsed = models.CharField(max_length=255)
    TeachingResources = models.CharField(max_length=255)
    ReferenceStart = models.CharField(max_length=255)
    ReferenceEnd = models.CharField(max_length=255)
    NextReferenceStart = models.CharField(max_length=255)
    Date = models.DateField()
    AssessmentTools = models.CharField(max_length=255)
    ChangesInScenario = models.CharField(max_length=255)
    SpecialRemarksOnLesson = models.CharField(max_length=255)
    WorkForNextLesson = models.CharField(max_length=255)
    TotalTeachingHoursPerformed = models.CharField(max_length=255)
    CLASS_TYPE_CHOICES = (
        ('In-Person', 'In-Person'),
        ('Hybrid', 'Hybrid'),
        ('Remote', 'Remote'),
    )
    ClassType = models.CharField(max_length=255, choices=CLASS_TYPE_CHOICES)
    
    class Meta:
        db_table = 'lessons'
    
    
    
class Attendance(models.Model):
    AttendanceID = models.AutoField(primary_key=True)
    Student = models.ForeignKey(Student, on_delete=models.CASCADE)
    Lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    STATUS_CHOICES = (
        ('Present', 'Present'),
        ('Late', 'Late'),
        ('Absent', 'Absent'),
    )
    Status = models.CharField(max_length=255, choices=STATUS_CHOICES)
    
class Assessment(models.Model):
    AssessmentID = models.AutoField(primary_key=True)
    Student = models.ForeignKey(Student, on_delete=models.CASCADE)
    Lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    AssessmentList = models.CharField(max_length=255)
    Score = models.FloatField()
    
class Grades(models.Model):
    GradeID = models.AutoField(primary_key=True)
    Student = models.ForeignKey(Student, on_delete=models.CASCADE)
    Lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    ContinuousAssessmentAverage = models.FloatField()
    FinalModuleScore = models.FloatField()
    OverallModuleScore = models.FloatField()
    Comments = models.CharField(max_length=255)
    


