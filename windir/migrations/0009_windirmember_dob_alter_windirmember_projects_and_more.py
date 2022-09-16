# Generated by Django 4.1 on 2022-09-16 15:19

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('windir', '0008_alter_windirmember_projects_alter_windirmember_specs'),
    ]

    operations = [
        migrations.AddField(
            model_name='windirmember',
            name='dob',
            field=models.DateField(default=datetime.datetime(2022, 9, 16, 15, 19, 11, 438500, tzinfo=datetime.timezone.utc)),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='windirmember',
            name='projects',
            field=models.ManyToManyField(blank=True, to='windir.project'),
        ),
        migrations.AlterField(
            model_name='windirmember',
            name='specs',
            field=models.ManyToManyField(blank=True, to='windir.spec'),
        ),
    ]