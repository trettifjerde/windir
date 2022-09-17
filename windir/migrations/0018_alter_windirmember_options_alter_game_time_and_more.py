# Generated by Django 4.1 on 2022-09-17 10:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('windir', '0017_alter_game_project'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='windirmember',
            options={'ordering': ['username']},
        ),
        migrations.AlterField(
            model_name='game',
            name='time',
            field=models.CharField(max_length=5),
        ),
        migrations.AlterField(
            model_name='game',
            name='weekday',
            field=models.CharField(max_length=2),
        ),
    ]
