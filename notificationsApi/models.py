from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.conf import settings
from django.db import models
from users.models import User

NOTIFICATION_TARGET = (
	('1', 'User'),
	('2', 'EMPLOYEE'),
	('3', 'BOSS')
)

NOTIFICATION_TYPE = (
	('1', 'Meeting Request'),
)

# Feedback Request
# 	Meeting Request
# 		Booked Meeting
# 		Canceled Meeting
# 		Call User

class Notification(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notification')
	actor = models.CharField(max_length=50)
	verb = models.CharField(max_length=50)
	action = models.CharField(max_length=50, blank=True)
	target = models.CharField(max_length=1, default='1', choices=NOTIFICATION_TARGET)
	description = models.TextField(blank=True)
	timestamp = models.DateTimeField(auto_now_add=True)
	read = models.BooleanField(default=False)
	view = models.BooleanField(default=False)
	def __str__(self):
		return f"{self.actor} {self.verb} {self.action} {self.target} at {self.timestamp}"