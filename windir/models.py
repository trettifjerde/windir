from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

# Create your models here.

class Spec(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return f'{self.name}'

class Project(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return f'{self.name}'

class WindirMember(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=40, unique=True)
    email = models.EmailField(null=True, blank=True)
    telegram = models.BooleanField(default=False)
    contact = models.CharField(max_length=50)
    dob = models.DateField()
    utc = models.IntegerField(null=True, blank=True)
    hours = models.IntegerField()
    specs = models.ManyToManyField(Spec, blank=True)
    projects = models.ManyToManyField(Project, blank=True)
    other = models.CharField(max_length=100, null=True, blank=True)
    teams = models.CharField(max_length=100, null=True, blank=True)

    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'username'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['contact', 'dob', 'hours']
    objects = BaseUserManager()

    def __str__(self):
        return f'{self.username}'

