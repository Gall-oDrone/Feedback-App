from django.db import models
from users.models import User

class Survey(models.Model):
    title = models.CharField(max_length=50)
    teacher = models.ForeignKey(User, on_delete=models.CASCADE)
    def __str__(self):
        return self.title
    
class GradedSurvey(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    survey = models.ForeignKey(
        Survey, on_delete=models.SET_NULL, blank=True, null=True)
    grade = models.FloatField()
    surveycompleted = models.BooleanField(default=False)

    def __str__(self):
        return self.student.username

class Choice(models.Model):
    title = models.CharField(max_length=50)

    def __str__(self):
        return self.title

class Question(models.Model):
    question = models.CharField(max_length=200)
    choices = models.ManyToManyField(Choice)
    answer = models.ForeignKey(Choice, on_delete=models.CASCADE, related_name='survey_answer')
    survey = models.ForeignKey(Survey, on_delete=models.CASCADE, related_name='survey_questions')
    order = models.SmallIntegerField()
    def __str__(self):
        return self.question

class SurveyData(models.Model):
    survey_data = models.ForeignKey(Survey, on_delete=models.CASCADE, related_name="survey", null=True)

    def __int__(self):
        return self.survey