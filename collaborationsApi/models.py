from django.db import models
from django.conf import settings
from users.models import Universities, Degree
from projectsApi.models import Project
from articlesApi.models import Article
from workshopsApi.models import Workshop
from boardsApi.models import Board, Cards

class Collaboration_types(models.Model):
    TECHNICAL = 'technical'
    CONSULTING = 'consulting'
    WRITING = 'writting'
    BUSINESS = 'business'
    CHOICES = [
        (TECHNICAL, ('technical')),
        (CONSULTING, ('consulting')),
        (WRITING, ('writting')),
        (BUSINESS, ('business')),
    ]
    collaboration_type=models.CharField(max_length=15, choices=CHOICES, blank=True)

    def __str__(self):
        return self.collaboration_type

class Request_status(models.Model):
    REJECTED = 'rejected'
    ACCEPTED = 'accepted'
    CHOICES = [
        (REJECTED, ('rejected')),
        (ACCEPTED, ('accepted')),
    ]
    req_status=models.CharField(max_length=15, choices=CHOICES, blank=True)

    def __str__(self):
        return self.req_status

# class Collaboration_Skills(models.Model):

class Collaboration(models.Model):
    collab_type = models.ForeignKey(Collaboration_types, on_delete=models.CASCADE, null=True, blank=True)
    collaborator = models.ManyToManyField(settings.AUTH_USER_MODEL)
    # desired_skills = models.ManyToManyField(CollabSkills)
    prefered_universities = models.ForeignKey(Universities, on_delete=models.CASCADE, null=True, blank=True)
    prefered_degree = models.ForeignKey(Degree, on_delete=models.CASCADE, null=True, blank=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, null=True, blank=True)
    article = models.ForeignKey(Article, on_delete=models.CASCADE, null=True, blank=True)
    workshop = models.ForeignKey(Workshop, on_delete=models.CASCADE, null=True, blank=True)
    workflow = models.ForeignKey("CollaborationWorkFlow", on_delete=models.CASCADE, null=True, blank=True)

class CollaborationWorkFlow(models.Model):
    board = models.ForeignKey(Board, on_delete=models.CASCADE, null=True, blank=True)
    Card = models.ForeignKey(Cards, on_delete=models.CASCADE, null=True, blank=True)

class CollaborationRequest(models.Model):
    requester = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="req_requester", on_delete=models.CASCADE, null=True)
    recipient = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="req_recipient", on_delete=models.CASCADE, null=True)
    timestamp = models.DateTimeField(auto_now_add=False, null=True)
    status = models.CharField(max_length=60)
