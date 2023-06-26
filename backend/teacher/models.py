from django.db import models    

from authentication.models import User
class Teacher(models.Model):
    TeacherID = models.AutoField(primary_key=True)
    FirstName = models.CharField(max_length=255)
    LastName = models.CharField(max_length=255)
    Email = models.EmailField()
    Phone = models.CharField(max_length=255)
    about_me = models.TextField(db_column='aboutMe')
    image_file = models.CharField(max_length=255, db_column='image_file')
    cv_file = models.CharField(max_length=255, db_column='cv_file')
    joining_date = models.DateField(db_column='joiningDate')
    address = models.TextField()
    title=models.CharField(max_length=255,db_column='title' )
    user_uuid= models.ForeignKey(User, on_delete=models.CASCADE, db_column='user_uuid')
    class Meta:
        db_table = 'teachers'
    
class School(models.Model):
    SchoolID = models.AutoField(primary_key=True)
    schoolName = models.CharField(max_length=255,db_column='Name' )
    hod = models.CharField(max_length=255,db_column='ContactPerson')
    phone = models.CharField(max_length=255, blank=True,db_column='ContactPhone')
    email = models.EmailField(db_column='ContactEmail')
    address = models.CharField(max_length=255, blank=True,db_column='Address')
    city = models.CharField(max_length=255, blank=True,db_column='City')
    state = models.CharField(max_length=255, blank=True,db_column='State')
    country = models.CharField(max_length=255, blank=True,db_column='Country')
    class Meta:
        db_table = 'schools'
        
# class Course(models.Model):
#     CourseID = models.AutoField(primary_key=True ,)
#     CourseName = models.CharField(max_length=255)
#     Subject = models.CharField(max_length=255)
#     Duration = models.IntegerField()
#     School = models.ForeignKey(School, on_delete=models.CASCADE, db_column='SchoolID')
#     ListUpdatedDate = models.DateField()
#     Teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, db_column='TeacherID')
#     SchoolYear = models.IntegerField()
#     Class = models.CharField(max_length=255)
#     LEVEL_CHOICES = (
#         ('Value1', 'Value1'),
#         ('Value2', 'Value2'),
#         ('Value3', 'Value3'),
#     )
#     #Level = models.CharField(max_length=255, choices=LEVEL_CHOICES)
#     InternalCourseCode = models.CharField(max_length=255)
    
#     class Meta:
#         db_table = 'courses'


# class ContactInfo(models.Model):
#     ContactInfoID = models.AutoField(primary_key=True)
#     Course = models.ForeignKey(Course, on_delete=models.CASCADE, db_column='CourseID')
#     Trainer = models.CharField(max_length=255)
#     PedagogicalSupervisorName = models.CharField(max_length=255)
#     PedagogicalSupervisorContact = models.CharField(max_length=255)
#     ClassInChargeName = models.CharField(max_length=255)
#     ClassInChargeContact = models.CharField(max_length=255)
#     PlanningCoordinatorName = models.CharField(max_length=255)
#     PlanningCoordinatorContact = models.CharField(max_length=255)
    
#     class Meta:
#         db_table = 'contactinfo'
    
# class Checklist(models.Model):
#     ChecklistID = models.AutoField(primary_key=True)
#     Course = models.ForeignKey(Course, on_delete=models.CASCADE, db_column='CourseID')
#     ListOfStudents = models.BooleanField()
#     SyllabusContent = models.BooleanField()
#     CoursePreparation = models.BooleanField()
#     ExercisesPracticalWorkCaseStudies = models.BooleanField()
#     QuestionnaireForAssessment = models.BooleanField()
#     EndOfModule = models.BooleanField()
#     FinalAssignmentSubject = models.BooleanField()
#     CatchUpTopic = models.BooleanField()
#     Notes = models.BooleanField()
    
#     class Meta:
#         db_table = 'checklist'
    
# class TrainingAssessment(models.Model):
#     TrainingAssessmentID = models.AutoField(primary_key=True)
#     Course = models.ForeignKey(Course, on_delete=models.CASCADE, db_column='CourseID')
#     LearnerFeedback = models.CharField(max_length=255)
#     SchoolFeedback = models.CharField(max_length=255)
    
#     class Meta:
#         db_table = 'trainingassessment'

class PedagogicalSynopsis(models.Model):
    PedagogicalSynopsisID = models.AutoField(primary_key=True)
    TitleOfTraining = models.CharField(max_length=255)
    DurationOfTraining = models.CharField(max_length=255)
    ObjectiveOfTraining = models.CharField(max_length=255)
    NumberOfSegments = models.CharField(max_length=255)
    
class Fees(models.Model):
    id = models.AutoField(primary_key=True)
    SchoolName = models.CharField(max_length=255)
    FeesType = models.CharField(max_length=255)
    Date = models.CharField(max_length=255)
    PaymentType = models.CharField(max_length=255)
    Status = models.CharField(max_length=255)
    Amount = models.CharField(max_length=255)
    teacher_uuid = models.CharField(max_length=255)
    
    
    class Meta:
        db_table = 'fee_collection'
# class PriorToTrainingInfo(models.Model):
#     PriorToTrainingInfoID = models.AutoField(primary_key=True)
#     Course = models.ForeignKey(Course, on_delete=models.CASCADE, db_column='CourseID')
#     Duration = models.CharField(max_length=255)
#     SegmentNumber = models.IntegerField()
#     SequenceEvaluationMethod = models.CharField(max_length=255)
#     ChangeInEvaluationMethod = models.CharField(max_length=255)
#     ObjectiveOfCourse = models.CharField(max_length=255)
#     ContentOfCourse = models.CharField(max_length=255)
#     TeachingMethodUsed = models.CharField(max_length=255)
#     TeachingMaterial = models.CharField(max_length=255)
    
    # class Meta:
    #     db_table = 'priortotraininginfo'
        
        
class CoursesList(models.Model):
    courseName = models.CharField(max_length=255)
    courseDetails = models.TextField()
    nameofProf = models.ForeignKey(Teacher, on_delete=models.CASCADE,db_column='nameofProf' )
    courseCode = models.CharField(max_length=50)
    courseFile = models.BinaryField()
    school = models.ForeignKey(School, on_delete=models.CASCADE, db_column='nameOfSchool')
    
    class Meta:
        db_table = 'courses_list'
        

        
        
class TeacherSchool(models.Model):
    id = models.AutoField(primary_key=True)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, db_column='teacher_id')
    school = models.ForeignKey(School, on_delete=models.CASCADE, db_column='school_id')
    joining_date = models.DateField()    
    class Meta:
        db_table = 'teacher_school'
        unique_together = ('teacher', 'school')
        
class TeacherCourses(models.Model):
    id = models.AutoField(primary_key=True)
    courseID = models.CharField(max_length=255)
    courseName = models.CharField(max_length=255)
    courseDetails = models.CharField(max_length=255)
    school = models.ForeignKey(School, on_delete=models.CASCADE, db_column='school_id')
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, db_column='teacher_id')

    def __str__(self):
        return self.courseName

    class Meta:
        db_table = 'teachercourses'
        unique_together = ('courseID', 'school')

class Section(models.Model):
    id = models.AutoField(primary_key=True)
    sectionID = models.CharField(max_length=255)
    course = models.ForeignKey(TeacherCourses, on_delete=models.CASCADE,  db_column='courseID')
    num_of_students = models.IntegerField( db_column='numOfStudents')
    
    class Meta:
        db_table = 'teachersections'
        
class TeacherLecture(models.Model):
    id = models.AutoField(primary_key=True)
    schoolName = models.CharField(max_length=255)
    courseName = models.CharField(max_length=255)
    sectionID = models.CharField(max_length=255)
    lectureDate = models.CharField(max_length=255)
    lectureTime = models.CharField(max_length=255)
    teacher_id = models.CharField(max_length=255)

    def __str__(self):
        return self.courseName
    
    class Meta:
        db_table = 'teacher_lectures'