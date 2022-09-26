from django import forms
from django.core.validators import validate_email, ValidationError
from django.contrib.auth.forms import UserCreationForm
from django.utils.translation import gettext_lazy as _
from windir.models import WindirMember, Spec, Project

class MemberForm(UserCreationForm):
    class Meta:
        model = WindirMember
        fields = ['username', 'dob', 'telegram', 'contact', 'utc', 'hours', 'spec', 'project', 'teams', 'other']
        error_messages = {
            'username': {
                'invalid': 'Допустимые сиволы: A-Z a-z 0-9 _ -',
                'unique': 'Позывной уже занят'
            },
        }

    def clean(self):
        data = super().clean()
        username = data.get('username')
        telegram = data.get('telegram')
        contact = data.get('contact')

        if not telegram and contact:
            try:
                validate_email(contact)
            except ValidationError:
                self.add_error('contact', self._meta.error_messages['contact']['invalid'])