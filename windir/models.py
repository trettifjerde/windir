from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

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
    utc = models.CharField(default="", blank=True, max_length=50)
    hours = models.IntegerField()
    spec = models.ManyToManyField(Spec, blank=True)
    project = models.ManyToManyField(Project, blank=True)
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
        ordering = ['date']

    project = models.ForeignKey(Project, null=True, blank=True, on_delete=models.CASCADE)
    date = models.DateTimeField()
    first = models.ManyToManyField(WindirMember, blank=True, related_name="game_first")
    second = models.ManyToManyField(WindirMember, blank=True, related_name="game_second")

    def __str__(self):
        return f'{self.date.astimezone().strftime("%a, %H:%M")}: {self.project if self.project else "Отрядная"}'
        

