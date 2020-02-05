from django.db import models
from users.models import User

class Assignment(models.Model):
    title = models.CharField(max_length=50)
    teacher = models.ForeignKey(User, on_delete=models.CASCADE)
    def __str__(self):
        return self.title
    
class GradedAssignment(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    assignment = models.ForeignKey(
        Assignment, on_delete=models.SET_NULL, blank=True, null=True)
    grade = models.FloatField()
    assignmentcompleted = models.BooleanField(default=False)

    def __str__(self):
        return self.student.username

class Choice(models.Model):
    title = models.CharField(max_length=50)

    def __str__(self):
        return self.title

class Question(models.Model):
    question = models.CharField(max_length=200)
    choices = models.ManyToManyField(Choice)
    answer = models.ForeignKey(Choice, on_delete=models.CASCADE, related_name='answer')
    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE, related_name='questions')
    order = models.SmallIntegerField()
    def __str__(self):
        return self.question

class AssignmentChoices(models.Model):
    LIVE_CHAT_SESSION = 'live chat'
    CHAT_SESSION = 'chat'
    PHONE_CALL = 'phone call'
    SEND_EMAIL = 'email'
    SURVEY = 'survey'
    CHOICES = [
        (LIVE_CHAT_SESSION, ('live chat')),
        (CHAT_SESSION, ('chat')),
        (PHONE_CALL, ('phone call')),
        (SEND_EMAIL, ('email')),
        (SURVEY, ('survey')),
    ]
    # choiceList=AssignmentsChoiceList.objects.all()
    feedback_types=models.CharField(max_length=15, choices=CHOICES, blank=True)
    print("assignment_choices: ", feedback_types)
    to_assignment=models.ForeignKey(Assignment, on_delete=models.CASCADE, related_name="choices", null=True)

    def __str__(self):
        return self.feedback_types

class Survey(models.Model):
    survey = models.ForeignKey(Assignment, on_delete=models.CASCADE, related_name="survey", null=True)
    assignment_type = models.ForeignKey(AssignmentChoices, on_delete=models.CASCADE, related_name="type", null=True)
    surveyId = models.IntegerField()

    def __int__(self):
        return self.surveyId