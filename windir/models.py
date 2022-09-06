from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class WindirMember(AbstractUser):
    approved = models.BooleanField(default=False)
    telegram = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.username}'

