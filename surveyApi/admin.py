from django.contrib import admin

from .models import Choice, Question, Survey, GradedSurvey

admin.site.register(Choice)
admin.site.register(Question)
admin.site.register(Survey)
admin.site.register(GradedSurvey)