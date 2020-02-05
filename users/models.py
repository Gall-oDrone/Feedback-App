from django.contrib.sites.models import Site
from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    is_student = models.BooleanField()
    is_teacher = models.BooleanField()
    university = models.CharField(max_length=50, blank=True)
    partners = models.CharField(max_length=30, blank=True, null=True)
    website = models.CharField(max_length=60, blank=True, null=True)

    def __str__(self):
        return self.username


class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username

class Partners(models.Model):
    partner_email = models.CharField(max_length=30, blank=True, null=True)
    def __str__(self):
        return self.partner_email

class School(models.Model):
    school = models.CharField(max_length=60, blank=True, null=True)
    def __str__(self):
        return self.school

class Website(models.Model):
    website = models.CharField(max_length=60, blank=True, null=True)
    def __str__(self):
        return self.website

class ChatGroup(models.Model):
    group_id = models.CharField(max_length=100)
    name = models.CharField(max_length=100, blank=True, null=True)
    group_admin = models.ForeignKey(User, on_delete=models.CASCADE, related_name="grpadmin")

    def __str__(self):
        return self.chatgroupid

class ChatGroupUser(models.Model):
    groupuser = models.ForeignKey(Student, on_delete=models.CASCADE)
    chat_group = models.ForeignKey(ChatGroup, on_delete=models.CASCADE)

    def __str__(self):
        return self.groupuser.username
