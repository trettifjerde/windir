# Generated by Django 4.1 on 2022-09-10 09:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('windir', '0002_remove_windirmember_days'),
    ]

    operations = [
        migrations.AddField(
            model_name='windirmember',
            name='arma_hours',
            field=models.IntegerField(blank=True, default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='windirmember',
            name='telegram_username',
            field=models.CharField(blank=True, max_length=30),
        ),
        migrations.AddField(
            model_name='windirmember',
            name='utc',
            field=models.IntegerField(blank=True, default=0),
            preserve_default=False,
        ),
    ]
