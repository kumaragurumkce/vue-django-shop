from django.db import models
from django.conf import settings
# Create your models here.


class Student(models.Model):
    name = models.CharField(max_length=100)
    course = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    gender = models.CharField(max_length=100)
