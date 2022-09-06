from django.contrib import admin
from .models import WindirMember
from django.contrib.auth.admin import UserAdmin

# Register your models here.

class MemberAdmin(admin.ModelAdmin):
    model = WindirMember

admin.site.register(WindirMember, MemberAdmin)
