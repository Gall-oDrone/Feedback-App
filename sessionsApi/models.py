from django.contrib.auth import get_user_model
from django.conf import settings
from datetime import datetime, date
from django.db import models
from users.models import User, ProfileInfo, Profile
from articlesApi.models import Article

# class Sender(models.Model):
#     sender = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

#     def __str__(self):
#         return self.sender.username

# class Recipient(models.Model):
#     recipient = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

#     def __str__(self):
#         return self.recipient.username

# class Category(models.Model):
#     PRODUCT_UI = 'product UI'
#     VENTURE_CAPITAL = 'venture capital'
#     PROYECT_INFORMATION = 'information'
#     BUGS_AND_FIXES = 'bugs and fixes'
#     OTHER = 'other'
#     CATEGORIES = [
#         (PRODUCT_UI, ('product UI')),
#         (VENTURE_CAPITAL, ('venture capital')),
#         (PROYECT_INFORMATION, ('information')),
#         (BUGS_AND_FIXES, ('bugs and fixes')),
#         (OTHER, ('other'))
#     ]
#     category=models.CharField(max_length=15, choices=CATEGORIES, blank=True)

#     def __str__(self):
#         return self.category
class Weekdays(models.Model):
    WEEKDAYS = [
        ("Monday", ("1")),
        ("Tuesday", ("2")),
        ("Wednesday", ("3")),
        ("Thursday", ("4")),
        ("Friday", ("5")),
        ("Saturday", ("6")),
        ("Sunday", ("0"))
    ]
    weekday=models.CharField(max_length=50, choices=WEEKDAYS, blank=True, null=False)
    def __str__(self):
        return self.weekday

class Months(models.Model):
    MONTHS = [
        ("January", ("0")),
        ("February", ("1")),
        ("March", ("2")),
        ("April", ("3")),
        ("May", ("4")),
        ("June", ("5")),
        ("July", ("6")),
        ("August", ("7")),
        ("September", ("8")),
        ("October", ("9")),
        ("November", ("10")),
        ("December", ("11")),
    ]
    month=models.CharField(max_length=50, choices=MONTHS, blank=False, null=False)
    def __str__(self):
        return self.month

class Dates(models.Model):
    date= models.DateTimeField(auto_now_add=False, blank=False, null=True)
    def __str__(self):
        return str(self.date)

class Topic(models.Model):
    TOPICS = [
        ("OTHER", ('other'))
    ]
    topic=models.CharField(max_length=50, choices=TOPICS, blank=True, null=True)
    def __str__(self):
        return self.topic

class Experience(models.Model):
    EXPERIENCES = [
        ("OTHER", ('other'))
    ]
    experience=models.CharField(max_length=50, choices=EXPERIENCES, blank=True, null=True)
    def __str__(self):
        return self.experience

class Session(models.Model):
    user = models.ForeignKey(User, related_name='session_user', on_delete=models.CASCADE)
    # requester = models.ForeignKey(User, related_name='session_requester', on_delete=models.CASCADE, null=True, blank=True)
    user_name = models.ForeignKey(ProfileInfo, related_name='session_user_name', on_delete=models.CASCADE)
    user_photo = models.ForeignKey(Profile, related_name='session_user_photo', on_delete=models.CASCADE)
    session_photo = models.ImageField(upload_to="sessionPhotos/", blank=True)

    price_per_hour = models.IntegerField(default=60)
    max_hrs_per_session = models.SmallIntegerField(default=1)
    title = models.CharField(max_length=60, null=True, blank=True)
    content = models.TextField()
    created = models.DateTimeField(auto_now_add=True)

    start_time = models.DateTimeField(auto_now_add=False, null=True)
    end_time = models.DateTimeField(auto_now_add=False, null=True)
    weekdays = models.ManyToManyField(Weekdays, blank=True)
    months = models.ManyToManyField(Months, blank=True)
    dates = models.ManyToManyField(Dates, blank=True)

    topic = models.ManyToManyField(Topic)
    experience = models.ManyToManyField(Experience)

    # date_to_appointment = models.DateTimeField(auto_now_add=False, null=True)
    # dta_end = models.DateTimeField(auto_now_add=False, null=True)
    # notified = models.BooleanField(default=False)
    # scheduled = models.BooleanField(default=False)
    # canceled = models.BooleanField(default=False)

class SessionMeeting(models.Model):
    requester = models.ForeignKey(User, related_name='session_requester', on_delete=models.CASCADE, null=True, blank=True)
    session = models.ForeignKey(Session, related_name='session_id', on_delete=models.CASCADE)
    date_to_appointment = models.DateTimeField(auto_now_add=False, null=True)
    dta_start_time = models.DateTimeField(auto_now_add=False, null=True)
    sta_end_time = models.DateTimeField(auto_now_add=False, null=True)
    session_hrs = models.SmallIntegerField(default=1)
    notified = models.BooleanField(default=False)
    scheduled = models.BooleanField(default=False)
    canceled = models.BooleanField(default=False)
    room_name = models.CharField(max_length=50, blank=True, null=False)

    def get_participants(self):
        par = []
        par.append(self.requester.username)
        par.append(self.session.user.username)
        print("SS: ", par)
        return par

    def open_meeting_room(self):
        today = date.today()
        d1 = self.date_to_appointment
        d2 = self.dta_start_time
        d3 = self.sta_end_time
        try:
            if(d2.year == today.year and d2.month == today.month and d2.day == today.day):
                if(d3.hour == today.hour and d3.minute == today.minute):
                    return True
            else:
                return False
        except:
            return False
# class Request(models.Model):
#     date_to_appointment = models.DateTimeField(auto_now_add=False)
#     created = models.DateTimeField(auto_now_add=True)
#     notified = models.BooleanField(default=False)
#     scheduled = models.BooleanField(default=False)
#     canceled = models.BooleanField(default=False)
#     discussion_topic = models.ManyToManyField(Category)
#     sender = models.ForeignKey(User, related_name='is_sender', on_delete=models.CASCADE)
#     recipient = models.ManyToManyField(User, related_name='is_recipient')
#     article = models.ForeignKey(Article, on_delete=models.CASCADE)
#     room_name = models.CharField(max_length=60, null=True, blank=True)
    
# class LCRoom(models.Model):
#     room_id = models.CharField(max_length=60, null=True)
#     room_name = models.CharField(max_length=60, null=True)
#     api_created = models.BooleanField(default=False)
#     privacy = models.CharField(max_length=60, null=True)

#     user_called = models.ManyToManyField(User, related_name="user_called")
#     called_time = models.DateTimeField(auto_now_add=False, null=True)

#     url = models.CharField(max_length=60, null=True)
#     created_at = models.DateTimeField(auto_now_add=False, null=True)
#     date_to_appointment = models.DateTimeField(auto_now_add=False, null=True)
#     participants = models.ManyToManyField(User, related_name='room_participants')
#     article = models.ForeignKey(Article, on_delete=models.CASCADE)

#     def __str__(self):
#         return self.room_name

# class MeetingReviewChoice(models.Model):
#     USER = 'User'
#     NETWORK_AND_CONNECTION = 'Network and Connection'
#     OTHER = 'Other'
#     CATEGORIES = [
#         (USER, ('User')),
#         (NETWORK_AND_CONNECTION, ('Network and Connection')),
#         (OTHER, ('Other'))
#     ]
#     issues=models.CharField(max_length=50, choices=CATEGORIES, blank=True)

#     def __str__(self):
#         return self.issues

# class MeetingReviewQuestion(models.Model):
#     question = models.CharField(max_length=200)
#     choices = models.ManyToManyField(MeetingReviewChoice)
#     answer = models.ForeignKey(MeetingReviewChoice, on_delete=models.CASCADE, related_name='answer')
#     room = models.ForeignKey(LCRoom, on_delete=models.CASCADE, related_name='questions')
#     order = models.SmallIntegerField()
#     def __str__(self):
#         return self.question

# class MeetingRating(models.Model):
#     user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
#     room = models.ForeignKey(LCRoom, null=True, on_delete=models.CASCADE, related_name='rating')
#     rate = models.IntegerField(default=0)

# class MeetingReview(models.Model):
#     user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
#     room = models.ForeignKey(LCRoom, null=False, on_delete=models.CASCADE, related_name='roomName')
#     meeting_rate = models.IntegerField(default=0)
#     conversation_rate = models.IntegerField(default=0)
#     attendace = models.BooleanField(default=False)
#     attended = models.ManyToManyField(User, related_name="users_attended_meeting")
#     not_attended = models.ManyToManyField(User, related_name="user_not_attended_meeting")
#     accept_working_with = models.BooleanField(default=False)
#     issues = models.BooleanField(default=False)
#     issue_type = models.ForeignKey(MeetingReviewChoice, null=True, on_delete=models.CASCADE)
#     comment = models.TextField(blank=True, null=True)