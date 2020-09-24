from django.db import models
from django.conf import settings
from users.models import Universities, Degree
from projectsApi.models import Project
from articlesApi.models import Article
from workshopsApi.models import Workshop
from boardsApi.models import Board, BoardDetail, Cards
from .constants import *

class CollaborationTypes(models.Model):
    PROJECT = 'project'
    WORKSHOP = 'workshop'
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
    collaboration_type=models.CharField(max_length=50, choices=CHOICES, blank=True)

    def __str__(self):
        return self.collaboration_type

# class JoinType(models.Model):
#     Academic = 'academic'
#     Industry = 'industry'
#     CHOICES = [
#         (Academic, ('Academic')),
#         (Industry, ('Industry')),
#     ]
#     collaboration_cateogry=models.CharField(max_length=10, choices=CHOICES, blank=True)

#     def __str__(self):
#         return self.collaboration_cateogry

class CollaborationCategory(models.Model):
    Academic = 'academic'
    Industry = 'industry'
    CHOICES = [
        (Academic, ('Academic')),
        (Industry, ('Industry')),
    ]
    collaboration_cateogry=models.CharField(max_length=10, choices=CHOICES, blank=True)

    def __str__(self):
        return self.collaboration_cateogry

class AcademicDisciplines(models.Model):
    ACADEMIC_DISCIPLINES_CHOICES
    a_d=models.CharField(max_length=100, choices=ACADEMIC_DISCIPLINES_CHOICES, blank=True)

    def __str__(self):
        return self.a_d

class IndustryFields(models.Model):
    INDUSTRY_FIELDS_CHOICES
    i_f=models.CharField(max_length=100, choices=INDUSTRY_FIELDS_CHOICES, blank=True)

    def __str__(self):
        return self.i_f

class RecruitmentForm(models.Model):
    RECRUITMENT_FORM_CHOCIES
    r_f=models.CharField(max_length=100, choices=RECRUITMENT_FORM_CHOCIES, blank=True)

    def __str__(self):
        return self.r_f

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
    
class RequestCollabPosition(models.Model):
    COLLABORATION_POSITIONS
    collab_pos=models.CharField(max_length=100, choices=COLLABORATION_POSITIONS, blank=True)

    def __str__(self):
        return self.collab_pos
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
        (REJECTED, ('Rejected')),
        (ACCEPTED, ('Accepted')),
        (EVALUATING, ('Evaluating')),
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
    collaboration_cat = models.ForeignKey(CollaborationCategory, on_delete=models.CASCADE, null=True, blank=True)
    collaboration_if = models.ForeignKey(IndustryFields, on_delete=models.CASCADE, null=True, blank=True)
    collaboration_ad = models.ForeignKey(AcademicDisciplines, on_delete=models.CASCADE, null=True, blank=True)
    collaboration_status = models.ForeignKey(ColaborationStatus, on_delete=models.CASCADE, null=True, blank=True)
    collaboration_pos = models.ForeignKey(RequestCollabPosition, on_delete=models.CASCADE, null=True, blank=True)
    collaboration_rf = models.ForeignKey(RecruitmentForm, on_delete=models.CASCADE, null=True, blank=True)

    collaborators = models.ManyToManyField(settings.AUTH_USER_MODEL)
    timestamp = models.DateTimeField(auto_now_add=True, null=True)
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
    collaboration = models.ForeignKey(Collaboration, related_name="req_collab", on_delete=models.CASCADE, null=True, blank=True)
    requester = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="req_requester", on_delete=models.CASCADE, null=True)
    recipient = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="req_recipient", on_delete=models.CASCADE, null=True)
    timestamp = models.DateTimeField(auto_now_add=True, null=True)
    status = models.ForeignKey(RequestStatus, on_delete=models.CASCADE, null=True, blank=True)
