# Generated by Django 4.1 on 2022-09-17 09:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('windir', '0016_remove_game_project_game_project'),
    ]

    operations = [
        migrations.AlterField(
            model_name='game',
            name='project',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='windir.project'),
        ),
    ]