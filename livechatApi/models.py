from django.contrib.auth import get_user_model
from django.conf import settings
from django.db import models
from users.models import User
from articlesApi.models import Article

class Sender(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username

class Recipient(models.Model):
    user = models.ManyToManyField("User", blank=True)

    def __str__(self):
        return self.user.username

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
    date_to_appointment = models.DateTimeField(auto_now_add=True)
    created = models.DateTimeField(auto_now_add=True)
    notified = models.BooleanField(default=False)
    scheduled = models.BooleanField(default=False)
    canceled = models.BooleanField(default=False)
    discussion_topic = models.ManyToManyField(Category)
    sender = models.ForeignKey(Sender, on_delete=models.CASCADE)
    recipient = models.ForeignKey(Recipient, on_delete=models.CASCADE)
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    #recipient's university
    #sender's university
    #recipient's information
    #sender's information
    #article/proyect name
    #notification

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