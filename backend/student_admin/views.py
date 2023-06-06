from django.shortcuts import render
from .models import Student
from django.http import HttpResponse

def student_list(request):
    cell_number = Student.objects.filter(FirstName='Izaan').values_list('CellphoneNumber', flat=True).first()    
    return HttpResponse(cell_number)
