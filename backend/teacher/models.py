from django.db import models
class School(models.Model):
    SchoolID = models.AutoField(primary_key=True)
    Name = models.CharField(max_length=255)
    Address = models.CharField(max_length=255)
    City = models.CharField(max_length=255)
    State = models.CharField(max_length=255)
    Country = models.CharField(max_length=255)
    ContactPerson = models.CharField(max_length=255)
    ContactEmail = models.EmailField()
    ContactPhone = models.CharField(max_length=255)

class Teacher(models.Model):
    TeacherID = models.AutoField(primary_key=True)
    FirstName = models.CharField(max_length=255)
    LastName = models.CharField(max_length=255)
    Email = models.EmailField()
    Phone = models.CharField(max_length=255)
    Qualifications = models.CharField(max_length=255)
    School = models.ForeignKey(School, on_delete=models.CASCADE, db_column='SchoolID')
    image_data = models.BinaryField(blank=True, null=True, default= b'')
    
    class Meta:
        db_table = 'teachers'
    

class Course(models.Model):
    CourseID = models.AutoField(primary_key=True)
    CourseName = models.CharField(max_length=255)
    Subject = models.CharField(max_length=255)
    Duration = models.IntegerField()
    School = models.ForeignKey(School, on_delete=models.CASCADE)
    ListUpdatedDate = models.DateField()
    Teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, db_column='TeacherID')
    SchoolYear = models.IntegerField()
    Class = models.CharField(max_length=255)
    LEVEL_CHOICES = (
        ('Value1', 'Value1'),
        ('Value2', 'Value2'),
        ('Value3', 'Value3'),
    )
    Level = models.CharField(max_length=255, choices=LEVEL_CHOICES)
    InternalCourseCode = models.CharField(max_length=255)
    
    class Meta:
        db_table = 'courses'


class ContactInfo(models.Model):
    ContactInfoID = models.AutoField(primary_key=True)
    Course = models.ForeignKey(Course, on_delete=models.CASCADE)
    Trainer = models.CharField(max_length=255)
    PedagogicalSupervisorName = models.CharField(max_length=255)
    PedagogicalSupervisorContact = models.CharField(max_length=255)
    ClassInChargeName = models.CharField(max_length=255)
    ClassInChargeContact = models.CharField(max_length=255)
    PlanningCoordinatorName = models.CharField(max_length=255)
    PlanningCoordinatorContact = models.CharField(max_length=255)
    
class Checklist(models.Model):
    ChecklistID = models.AutoField(primary_key=True)
    Course = models.ForeignKey(Course, on_delete=models.CASCADE)
    ListOfStudents = models.BooleanField()
    SyllabusContent = models.BooleanField()
    CoursePreparation = models.BooleanField()
    ExercisesPracticalWorkCaseStudies = models.BooleanField()
    QuestionnaireForAssessment = models.BooleanField()
    EndOfModule = models.BooleanField()
    FinalAssignmentSubject = models.BooleanField()
    CatchUpTopic = models.BooleanField()
    Notes = models.BooleanField()
    
class TrainingAssessment(models.Model):
    TrainingAssessmentID = models.AutoField(primary_key=True)
    Course = models.ForeignKey(Course, on_delete=models.CASCADE)
    LearnerFeedback = models.CharField(max_length=255)
    SchoolFeedback = models.CharField(max_length=255)

class PedagogicalSynopsis(models.Model):
    PedagogicalSynopsisID = models.AutoField(primary_key=True)
    TitleOfTraining = models.CharField(max_length=255)
    DurationOfTraining = models.CharField(max_length=255)
    ObjectiveOfTraining = models.CharField(max_length=255)
    NumberOfSegments = models.CharField(max_length=255)

class PriorToTrainingInfo(models.Model):
    PriorToTrainingInfoID = models.AutoField(primary_key=True)
    Course = models.ForeignKey(Course, on_delete=models.CASCADE)
    Duration = models.CharField(max_length=255)
    SegmentNumber = models.IntegerField()
    SequenceEvaluationMethod = models.CharField(max_length=255)
    ChangeInEvaluationMethod = models.CharField(max_length=255)
    ObjectiveOfCourse = models.CharField(max_length=255)
    ContentOfCourse = models.CharField(max_length=255)
    TeachingMethodUsed = models.CharField(max_length=255)
    TeachingMaterial = models.CharField(max_length=255)


