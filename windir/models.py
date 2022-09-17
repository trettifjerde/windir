from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

DAYNAMES = ['Пн', 'Вт', 'Ср', 'Чт' , 'Пт', 'Сб', 'Вс']

class Spec(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return f'{self.name}'

class Project(models.Model):
    name = models.CharField(max_length=50)
    image = models.ImageField(upload_to='project-imgs/', blank=True)

    def __str__(self):
        return f'{self.name}'

class WindirMember(AbstractBaseUser, PermissionsMixin):
    class Meta:
        ordering = ['username'] 
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

class Game(models.Model):
    class Meta:
        ordering = ['weekday']

    project = models.ForeignKey(Project, null=True, blank=True, on_delete=models.CASCADE)
    weekday = models.IntegerField(unique=True)
    time = models.CharField(max_length=5)
    first = models.ManyToManyField(WindirMember, blank=True, related_name="game_first")
    second = models.ManyToManyField(WindirMember, blank=True, related_name="game_second")

    def __str__(self):
        return f'{self.dayname()}: {self.project if self.project else "Отрядная"} в {self.time}'

    def dayname(self):
        return f'{DAYNAMES[self.weekday]}'

