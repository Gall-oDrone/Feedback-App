from django.db import models
from users.models import User
from articlesApi.models import Article
from projectsApi.models import Project

class Survey(models.Model):
    title = models.CharField(max_length=50)
    teacher = models.ForeignKey(User, on_delete=models.CASCADE)
    article = models.ForeignKey(Article, on_delete=models.CASCADE, null=True, blank=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return self.title
    
class GradedSurvey(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    survey = models.ForeignKey(
        Survey, on_delete=models.SET_NULL, blank=True, null=True, related_name='gsurvey_questions')
    grade = models.FloatField()
    survey_completed = models.BooleanField(default=False)
    respondent = models.ForeignKey(User, on_delete=models.CASCADE, related_name="survey_respondent")
    respondent_answers = models.ManyToManyField("Choice", related_name='survey_responses')

    def __str__(self):
        return self.student.username

class Choice(models.Model):
    title = models.CharField(max_length=50)

    def __str__(self):
        return self.title

class Question(models.Model):
    question = models.CharField(max_length=200)
    choices = models.ManyToManyField(Choice)
    survey = models.ForeignKey(Survey, on_delete=models.CASCADE, related_name='survey_questions')
    order = models.SmallIntegerField()
    def __str__(self):
        return self.question

class SurveyData(models.Model):
    survey_data = models.ForeignKey(Survey, on_delete=models.CASCADE, related_name="survey", null=True)

    def __int__(self):
        return self.survey

class SurveyCounter(models.Model):
    survey_counter = models.SmallIntegerField(default=0)

    def __int__(self):
        return self.survey_counter