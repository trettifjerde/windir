from django.contrib import admin
from .models import WindirMember, Spec, Project, Game

# Register your models here.

class MemberAdmin(admin.ModelAdmin):
    model = WindirMember

class SpecAdmin(admin.ModelAdmin):
    model = Spec

class ProjectAdmin(admin.ModelAdmin):
    model = Project

admin.site.register(WindirMember, MemberAdmin)
admin.site.register(Spec, SpecAdmin)
admin.site.register(Project, ProjectAdmin)
admin.site.register(Game)
