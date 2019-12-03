from django.contrib import admin

from .models import Choice, Question, Assignment, GradedAssignment, Survey, AssignmentChoices

admin.site.register(Choice)
admin.site.register(Question)
admin.site.register(Assignment)
admin.site.register(GradedAssignment)
admin.site.register(Survey)
admin.site.register(AssignmentChoices)