from django.db import models
from django.conf import settings
from users.models import Universities, Degree
from projectsApi.models import Project
from articlesApi.models import Article
from workshopsApi.models import Workshop
from boardsApi.models import Board, BoardDetail, Cards

class CollaborationTypes(models.Model):
    PROJECT = 'project'
    WORKSHOP = 'worokshop'
    ARTICLE = 'article'
    RESEARCH = 'research'
    VOLUNTEERING = 'volunteering'
    CHOICES = [
        (PROJECT, ('project')),
        (WORKSHOP, ('workshop')),
        (ARTICLE, ('article')),
        (RESEARCH, ('research')),
        (VOLUNTEERING, ('volunteering')),
    ]
    collaboration_type=models.CharField(max_length=15, choices=CHOICES, blank=True)

    def __str__(self):
        return self.collaboration_type

# class CollaborationTopic(models.Model):
#     TECHNICAL = 'Machine Learning'
#     CONSULTING = 'Arts'
#     WRITING = 'AI'
#     BUSINESS = 'Economics'
#     CHOICES = [
#         (TECHNICAL, ('technical')),
#         (CONSULTING, ('consulting')),
#         (WRITING, ('writting')),
#         (BUSINESS, ('business')),
#     ]
#     collaboration_topic=models.CharField(max_length=20, choices=CHOICES, blank=True)

#     def __str__(self):
#         return self.collaboration_topic

# class Collaboration_langaugue_topic(models.Model):
#     PRACTICE_LANGUAGE = 'practice language'
    
# class RequestTechinalPosition(models.Model):
#     PROGRAMMER = 'Programmer'
#     PROJECT_MANAGER = 'Project Manager'
#     DATA_ANALYST = 'Data Analyst'
#     Business_ANALYST = 'Economics'
#     CHOICES = [
#         (TECHNICAL, ('technical')),
#         (CONSULTING, ('consulting')),
#         (WRITING, ('writting')),
#         (BUSINESS, ('business')),
#     ]
#     collaboration_type=models.CharField(max_length=15, choices=CHOICES, blank=True)

#     def __str__(self):
#         return self.collaboration_type
# Developer
#     DevelopersSkills
# Designer
#     UX
#     UI
#     ProductDesigner
# FinanceExpert
#     Financial Modeling Consultants
#     Venture Capital Consultants
#     Market Research Analyst
# ProjectManager
#     Web Project Managers
#     Mobile Project
#     Agile Conslutants
# ProductManager
#     Ideation & Validation
#     MVP & Go-To-MarketStrategy
#     Product Framework and Transformation

# class RequestConsultingPosition(models.Model):

# class RequestBusinessPosition(models.Model):

# class RequestWrittingPosition(models.Model):

# class RequestAcademicPosition(models.Model):

# class RequestLanguagePosition(models.Model):

class RequestStatus(models.Model):
    REJECTED = 'rejected'
    ACCEPTED = 'accepted'
    EVALUATING = 'evaluating'
    CHOICES = [
        (REJECTED, ('rejected')),
        (ACCEPTED, ('accepted')),
        (EVALUATING, ('evaluating')),
    ]
    req_status=models.CharField(max_length=15, choices=CHOICES, blank=True)

    def __str__(self):
        return self.req_status

class ColaborationStatus(models.Model):
    OPEN = 'open'
    CLOSE = 'close'
    CHOICES = [
        (OPEN, ('open')),
        (CLOSE, ('close')),
    ]
    collaboration_status=models.CharField(max_length=10, choices=CHOICES, blank=True)

    def __str__(self):
        return self.collaboration_status

# class Collaboration_Skills(models.Model):


# Sessions
# Purpose:
#     Practice Skills
#         Writting
#         Reading
#         Video Editting
#         Coding
#         Social Arts
#     Academic
#         Freshmen
#         Admissions
#         College Selection
#         Carrer Selection
#     Meet_New_People
#     Collaboration
#         Projects:
#             On the Run:
#                 Dual Teams:
#                     Universities
#                     Companies
#                 More than 2 members
#                     Universities
#             New projects
#                 Universities
#                 Companies
#         Writting Articles
#                 Topic
#         Posting Workshops
#                 Topic
#         Research
#                 Topic

class Collaboration(models.Model):
    collaboration_type = models.ForeignKey(CollaborationTypes, on_delete=models.CASCADE, null=True, blank=True)
    collaborators = models.ManyToManyField(settings.AUTH_USER_MODEL)
    # desired_skills = models.ManyToManyField(CollabSkills)
    prefered_universities = models.ForeignKey(Universities, on_delete=models.CASCADE, null=True, blank=True)
    prefered_degree = models.ForeignKey(Degree, on_delete=models.CASCADE, null=True, blank=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, null=True, blank=True)
    article = models.ForeignKey(Article, on_delete=models.CASCADE, null=True, blank=True)
    workshop = models.ForeignKey(Workshop, on_delete=models.CASCADE, null=True, blank=True)
    workflow = models.ForeignKey("CollaborationWorkFlow", on_delete=models.CASCADE, null=True, blank=True)

class CollaborationWorkFlow(models.Model):
    board = models.ForeignKey(Board, on_delete=models.CASCADE, null=True, blank=True)
    boardList = models.ForeignKey(BoardDetail, on_delete=models.CASCADE, null=True, blank=True)
    Card = models.ForeignKey(Cards, on_delete=models.CASCADE, null=True, blank=True)

class CollaborationRequest(models.Model):
    requester = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="req_requester", on_delete=models.CASCADE, null=True)
    recipient = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="req_recipient", on_delete=models.CASCADE, null=True)
    timestamp = models.DateTimeField(auto_now_add=False, null=True)
    status = models.ForeignKey(RequestStatus, on_delete=models.CASCADE, null=True, blank=True)
