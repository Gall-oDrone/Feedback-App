from django.contrib.auth import get_user_model
from django.conf import settings
from django.db import models
from users.models import User

class InquiryType(models.Model):
    HR = 'homework review'
    A = 'admissions'
    CI = 'college information'
    S = 'scholarships'
    CR = 'class review'
    OTHER = 'other'
    CHOICES = [
        (HR, ('homework review')),
        (A, ('admissions')),
        (CI, ('college information')),
        (S, ('scholarships')),
        (CR, ('class review')),
        (OTHER, ('other')),
    ]
    inquiry_type=models.CharField(max_length=25, choices=CHOICES, blank=True)

    def __str__(self):
        return self.inquiry_type

class TargetAudience(models.Model):
    G = 'graduates'
    U = 'undergraduates'
    PHD = 'pHD'
    MBA = 'MBA'
    MS = 'MS'
    OTHER = 'other'
    CHOICES = [
        (G, ('graduates')),
        (U, ('undergraduates')),
        (PHD, ('pHD')),
        (MBA, ('MBA')),
        (MS, ('MS')),
        (OTHER, ('other')),
    ]
    target_audience=models.CharField(max_length=25, choices=CHOICES, blank=True)

    def __str__(self):
        return self.target_audience

class Tag(models.Model):
    tag = models.CharField(max_length=10)

    def __str__(self):
        return self.tag

class Image(models.Model):
    image = models.ImageField(upload_to="images/", blank=True)

    def __str__(self):
        return str(self.image)

class Comment(models.Model):
    user = models.ForeignKey(User, related_name="inquiry_comment", on_delete=models.CASCADE)
    reply_to = models.ForeignKey("self", null=True, blank=True, on_delete=models.CASCADE)
    # reply_to_counter = models.IntegerField(default=0)
    replies = models.ManyToManyField("self", blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    content = models.TextField()
    liked = models.BooleanField(default=False)
    like_counter = models.IntegerField(default=0)
    disliked = models.BooleanField(default=False)
    dislike_counter = models.IntegerField(default=0)
    inquiry = models.ForeignKey("Inquiry", on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username

class CommentReply(models.Model):
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, related_name='comment_reply_id')
    reply = models.ManyToManyField(Comment, related_name="comment_reply")
    

class FeedbackTypes(models.Model):
    LIVE_CHAT_SESSION = 'live chat'
    CHAT_SESSION = 'chat'
    PHONE_CALL = 'phone call'
    SEND_EMAIL = 'email'
    SURVEY = 'survey'
    CHOICES = [
        (LIVE_CHAT_SESSION, ('live chat')),
        (CHAT_SESSION, ('chat')),
        (PHONE_CALL, ('phone call')),
        (SEND_EMAIL, ('email')),
        (SURVEY, ('survey')),
    ]
    feedback_type=models.CharField(max_length=15, choices=CHOICES, blank=True)

    def __str__(self):
        return self.feedback_type

class Inquiry(models.Model):
    title = models.CharField(max_length=60)
    content = models.TextField()
    overview = models.TextField()
    description = models.TextField(max_length=30, blank=True)
    comment_count = models.IntegerField(default=0)
    view_count = models.IntegerField(default=0)
    rating_count = models.IntegerField(default=0)
    avg_rating = models.IntegerField(default=0)
    likes_count = models.IntegerField(default=0)
    tag = models.ManyToManyField(Tag, related_name="inquiry_tags")
    engagement = models.ManyToManyField(FeedbackTypes)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="inquiry_author", null=True)
    timestamp = models.DateTimeField(auto_now_add=True, null=True)
    thumbnail = models.ImageField(upload_to="images/", blank=True)
    inquiry_type = models.ManyToManyField(InquiryType)
    inquiry_audience = models.ManyToManyField(TargetAudience)
    previous_inquiry = models.ForeignKey("self", related_name='previous',on_delete=models.SET_NULL,blank=True, null=True)
    next_inquiry = models.ForeignKey("self", related_name='next', on_delete=models.SET_NULL,blank=True, null=True)

    def __str__(self):
        return self.title

class Tagging(models.Model):
    inquiries = models.ForeignKey(Inquiry, on_delete=models.CASCADE)
    taggings = models.ForeignKey(Tag, on_delete=models.CASCADE)
    
class InquiryView(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE) 
    inquiry_post = models.ForeignKey(Inquiry, on_delete=models.CASCADE)

    def __str__(self):
        pass

class Like(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="inquiry_like", null=True, on_delete=models.CASCADE)
    liked = models.BooleanField(default=False)
    inquiry = models.ForeignKey(Inquiry, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)

class Rating(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="inquiry_rating", null=True, on_delete=models.CASCADE)
    inquiry = models.ForeignKey(Inquiry, on_delete=models.CASCADE)
    rate = models.IntegerField(default=0)
    created = models.DateTimeField(auto_now_add=True)