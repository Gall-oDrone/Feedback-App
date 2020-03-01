from django.contrib.auth import get_user_model
from django.conf import settings
from django.db import models
from users.models import User, ProfileInfo
from articlesApi.models import Article

class Sender(models.Model):
    sender = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return self.sender.username

class Recipient(models.Model):
    recipient = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return self.recipient.username

class Category(models.Model):
    PRODUCT_UI = 'product UI'
    VENTURE_CAPITAL = 'venture capital'
    PROYECT_INFORMATION = 'information'
    BUGS_AND_FIXES = 'bugs and fixes'
    OTHER = 'other'
    CATEGORIES = [
        (PRODUCT_UI, ('product UI')),
        (VENTURE_CAPITAL, ('venture capital')),
        (PROYECT_INFORMATION, ('information')),
        (BUGS_AND_FIXES, ('bugs and fixes')),
        (OTHER, ('other'))
    ]
    category=models.CharField(max_length=15, choices=CATEGORIES, blank=True)

    def __str__(self):
        return self.category

class Request(models.Model):
    date_to_appointment = models.DateTimeField(auto_now_add=False)
    created = models.DateTimeField(auto_now_add=True)
    notified = models.BooleanField(default=False)
    scheduled = models.BooleanField(default=False)
    canceled = models.BooleanField(default=False)
    discussion_topic = models.ManyToManyField(Category)
    sender = models.ForeignKey(User, related_name='is_sender', on_delete=models.CASCADE)
    recipient = models.ManyToManyField(User, related_name='is_recipient')
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    room_name = models.CharField(max_length=60, null=True, blank=True)
    #recipient's university
    #sender's university
    #recipient's information
    #article/proyect name
    #notification
    
class LCRoom(models.Model):
    room_id = models.CharField(max_length=60, null=True)
    room_name = models.CharField(max_length=60, null=True)
    api_created = models.BooleanField(default=False)
    privacy = models.CharField(max_length=60, null=True)
    url = models.CharField(max_length=60, null=True)
    created_at = models.DateTimeField(auto_now_add=False, null=True)
    date_to_appointment = models.DateTimeField(auto_now_add=False, null=True)
    participants = models.ManyToManyField(User, related_name='room_participants')
    article = models.ForeignKey(Article, on_delete=models.CASCADE)

    def __str__(self):
        return self.room_name

class MeetingReviewChoice(models.Model):
    USER = 'User'
    NETWORK_AND_CONNECTION = 'Network and Connection'
    OTHER = 'other'
    CATEGORIES = [
        (USER, ('User')),
        (NETWORK_AND_CONNECTION, ('Network and Connection')),
        (OTHER, ('Other'))
    ]
    issues=models.CharField(max_length=50, choices=CATEGORIES, blank=True)

    def __str__(self):
        return self.issues

class MeetingReviewQuestion(models.Model):
    question = models.CharField(max_length=200)
    choices = models.ManyToManyField(MeetingReviewChoice)
    answer = models.ForeignKey(MeetingReviewChoice, on_delete=models.CASCADE, related_name='answer')
    room = models.ForeignKey(LCRoom, on_delete=models.CASCADE, related_name='questions')
    order = models.SmallIntegerField()
    def __str__(self):
        return self.question

class MeetingRating(models.Model):
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    room = models.ForeignKey(LCRoom, null=True, on_delete=models.CASCADE, related_name='rating')
    rate = models.IntegerField(default=0)

class MeetingReview(models.Model):
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    room = models.ForeignKey(LCRoom, null=False, on_delete=models.CASCADE, related_name='roomName')
    meeting_rate = models.IntegerField(default=0)
    conversation_rate = models.IntegerField(default=0)
    attendace = models.BooleanField(default=False)
    attended = models.ManyToManyField(User, related_name="users_attended_meeting")
    not_attended = models.ManyToManyField(User, related_name="user_not_attended_meeting")
    accept_working_with = models.BooleanField(default=False)
    issues = models.BooleanField(default=False)
    issue_type = models.ForeignKey(MeetingReviewChoice, null=True, on_delete=models.CASCADE)
    # issue_type = models.CharField(choices=MeetingReviewChoice, null=True, max_length=50)
    # participants_attendace = models.ManyToManyRel()
    comment = models.TextField(blank=True, null=True)

# class Meeting(models.Model):
#     title = models.CharField(max_length=60)
#     sender = models.ForeignKey(Sender, on_delete=models.CASCADE)
#     recipient = models.ForeignKey(Recipient, on_delete=models.CASCADE)
#     article = models.ForeignKey(Article, on_delete=models.CASCADE)
#     description = models.TextField(max_length=30, blank=True)
#     rating_count = models.IntegerField(default=0)
#     avg_rating = models.IntegerField(default=0)
#     likes_count = models.IntegerField(default=0)
#     did_meet = models.BooleanField(default=False)
#     author = models.ForeignKey(Author, on_delete=models.CASCADE, related_name="article_author", null=True)
#     timestamp = models.DateTimeField(auto_now_add=True, null=True)
#     category = models.ManyToManyField(Category)

#     def __str__(self):
#         return self.title
    
# class ArticleView(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE) 
#     article_post = models.ForeignKey(Article, on_delete=models.CASCADE)

#     def __str__(self):
#         pass

# class Like(models.Model):
#     user = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, on_delete=models.CASCADE)
#     liked = models.BooleanField(default=False)
#     article = models.ForeignKey(Article, on_delete=models.CASCADE)
#     created = models.DateTimeField(auto_now_add=True)

# class Rating(models.Model):
#     user = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, on_delete=models.CASCADE)
#     article = models.ForeignKey(Article, on_delete=models.CASCADE)
#     rate = models.IntegerField(default=0)
#     created = models.DateTimeField(auto_now_add=True)