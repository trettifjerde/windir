# Generated by Django 4.1 on 2022-09-17 16:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('windir', '0018_alter_windirmember_options_alter_game_time_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='game',
            options={'ordering': ['id']},
        ),
        migrations.AlterField(
            model_name='game',
            name='weekday',
            field=models.IntegerField(),
        ),
    ]