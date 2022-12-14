# Generated by Django 4.1 on 2022-09-16 22:22

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('windir', '0014_project_image_alter_windirmember_is_staff_game'),
    ]

    operations = [
        migrations.AddField(
            model_name='game',
            name='weekday',
            field=models.IntegerField(default=0, unique=True),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='game',
            name='first',
            field=models.ManyToManyField(blank=True, related_name='game_first', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='game',
            name='second',
            field=models.ManyToManyField(blank=True, related_name='game_second', to=settings.AUTH_USER_MODEL),
        ),
    ]
