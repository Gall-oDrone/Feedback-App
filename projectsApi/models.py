from django.contrib.auth import get_user_model
from django.conf import settings
from django.db import models
from users.models import User, ProfileInfo

class Category(models.Model):
    title = models.CharField(max_length=20)

    def __str__(self):
        return self.title

class Tag(models.Model):
    tag = models.CharField(max_length=10)

    def __str__(self):
        return self.tag

class Video(models.Model):
    videofile = models.FileField(upload_to="projectMedia/videos/", null=True, verbose_name="")

    def __str__(self):
        return str(self.videofile)

class Image(models.Model):
    image = models.ImageField(upload_to="images/", blank=True)

    def __str__(self):
        return str(self.image)

class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="project_comment_user")
    reply_to = models.ForeignKey("self", null=True, blank=True, on_delete=models.CASCADE)
    # reply_to_counter = models.IntegerField(default=0)
    replies = models.ManyToManyField("self", blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    content = models.TextField()
    liked = models.BooleanField(default=False)
    like_counter = models.IntegerField(default=0)
    disliked = models.BooleanField(default=False)
    dislike_counter = models.IntegerField(default=0)
    project = models.ForeignKey("Project", on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username

class CommentReply(models.Model):
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, related_name='project_comment_reply_id')
    reply = models.ManyToManyField(Comment, related_name="project_comment_reply")
    

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

class DevPhases(models.Model):
    IDEA = 'idea'
    MVP = 'mvp'
    PROTOTYPE = 'prototype'
    BETA = 'beta'
    LAUNCH = 'launch'
    VENTURE_CAPITAL = 'venture capital'
    CHOICES = [
        (IDEA, ('Validating Idea')),
        (MVP, ('Minimum Viable Product')),
        (PROTOTYPE, ('Prototype')),
        (BETA, ('Beta')),
        (LAUNCH, ('Launch')),
        (VENTURE_CAPITAL, ('Venture Capital')),
    ]
    dev_phase=models.CharField(max_length=15, choices=CHOICES, blank=True)

    def __str__(self):
        return self.dev_phase

class CrowdfundingTypes(models.Model):
    DONATION = 'donation-based'
    REWARD = 'reward-based'
    EQUITY = 'equity'
    DEBT = 'debt'
    REAL_ESTATE = 'real estate'
    CHOICES = [
        (DONATION, ('Donation-Based')),
        (REWARD, ('Reward-Based')),
        (EQUITY, ('Equity')),
        (DEBT, ('Debt')),
        (REAL_ESTATE, ('Real estate')),
    ]
    crowdfunding_type=models.CharField(max_length=15, choices=CHOICES, blank=True)

    def __str__(self):
        return self.crowdfunding_type

class Project(models.Model):
    title = models.CharField(max_length=60)
    content = models.TextField()
    overview = models.TextField()
    website = models.TextField(max_length=30, blank=True)

    comment_count = models.IntegerField(default=0)
    view_count = models.IntegerField(default=0)
    rating_count = models.IntegerField(default=0)
    avg_rating = models.IntegerField(default=0)
    upvotes_count = models.IntegerField(default=0)
    likes_count = models.IntegerField(default=0)

    tag = models.ManyToManyField(Tag, related_name="project_tags")
    project_feedback = models.ManyToManyField(FeedbackTypes)
    project_phase = models.OneToOneField(DevPhases, null=True, blank=True, on_delete=models.CASCADE)
    project_crowdfunding_type = models.OneToOneField(CrowdfundingTypes, null=True, blank=True, on_delete=models.CASCADE)

    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="project_author", null=True)
    members = models.ManyToManyField(User, default=author)

    timestamp = models.DateTimeField(auto_now_add=True, null=True)
    project_image = models.ImageField(upload_to="projectMedia/images/", blank=True)
    project_video = models.ForeignKey(Video, related_name='project_video',on_delete=models.SET_NULL,blank=True, null=True)
    category = models.ManyToManyField(Category)

    # previous_project = models.ForeignKey("self", related_name='previous',on_delete=models.SET_NULL,blank=True, null=True)
    # next_project = models.ForeignKey("self", related_name='next', on_delete=models.SET_NULL,blank=True, null=True)
    def get_author_details(self):
        return ProfileInfo.objects.get(profile_username=self.author)

    def __str__(self):
        return self.title

class DonationBasedCrowdfunding(models.Model):
    project = models.ForeignKey(Project, related_name='project_donation_based_crowdfunding',on_delete=models.SET_NULL,blank=True, null=True)
    donor = models.ForeignKey(User, on_delete=models.CASCADE, related_name="project_donor", null=True)
    timestamp = models.DateTimeField(auto_now_add=True, null=True)
    amount = models.FloatField(default=0)

    def __str__(self):
        return "{} donated ${} to {} project on {}".format(self.donor, self.ammount, self.project, self.timestamp)
# class Tagging(models.Model):
#     projects = models.ForeignKey(Project, on_delete=models.CASCADE)
#     taggings = models.ForeignKey(Tag, on_delete=models.CASCADE)
    
# class ProjectView(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE) 
#     project_post = models.ForeignKey(Project, on_delete=models.CASCADE)

#     def __str__(self):
#         pass

class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True, related_name="project_user_like")
    like = models.BooleanField(default=False)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "User {} liked project {} on {}: {}".format(self.user ,self.project, self.created, self.like)

class Upvote(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    upvote = models.BooleanField(default=False)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "{}'s upvoted project {} on {}: {}".format(self.user,self.project, self.created, self.upvote)

class Views(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    viewed = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "{} viewed project {} on {}".format(self.user, self.project, self.created)

class Rating(models.Model):
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE, related_name="project_rating_user")
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    rate = models.IntegerField(default=0)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "{}'s rated project {} on {}: {}".format(self.user,self.project, self.created, self.rate)

 # @property
    # def get_comments(self):
    #     return selfreply_to = models.ForeignKey("self", null=True, blank=True, on_delete=models.CASCADE, related_name='replies').comments.all().order_by("-timestamp")

    # @property
    # def comment_count(self):
    #     return Comment.objects.filter(project_post=self.count())
    
    # @property
    # def likes_count(self):
    #     return ProjectView.objects.filter(project_post=self.count())

    # @property
    # def ratings_count(self):
    #     return ProjectView.objects.filter(project_post=self.count())

    # @property
    # def view_count(self):
    #     return ProjectView.objects.filter(project_post=self.count())
