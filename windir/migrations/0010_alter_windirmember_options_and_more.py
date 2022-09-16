# Generated by Django 4.1 on 2022-09-16 16:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('windir', '0009_windirmember_dob_alter_windirmember_projects_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='windirmember',
            options={},
        ),
        migrations.AlterModelManagers(
            name='windirmember',
            managers=[
            ],
        ),
        migrations.RemoveField(
            model_name='windirmember',
            name='date_joined',
        ),
        migrations.RemoveField(
            model_name='windirmember',
            name='first_name',
        ),
        migrations.RemoveField(
            model_name='windirmember',
            name='groups',
        ),
        migrations.RemoveField(
            model_name='windirmember',
            name='is_active',
        ),
        migrations.RemoveField(
            model_name='windirmember',
            name='is_staff',
        ),
        migrations.RemoveField(
            model_name='windirmember',
            name='is_superuser',
        ),
        migrations.RemoveField(
            model_name='windirmember',
            name='last_name',
        ),
        migrations.RemoveField(
            model_name='windirmember',
            name='user_permissions',
        ),
        migrations.AlterField(
            model_name='windirmember',
            name='email',
            field=models.EmailField(blank=True, max_length=254, null=True),
        ),
        migrations.AlterField(
            model_name='windirmember',
            name='username',
            field=models.CharField(max_length=40, unique=True),
        ),
    ]
