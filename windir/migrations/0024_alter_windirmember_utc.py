# Generated by Django 4.0.6 on 2022-09-26 19:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('windir', '0023_rename_projects_windirmember_project_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='windirmember',
            name='utc',
            field=models.CharField(blank=True, default='', max_length=50),
        ),
    ]
