from django.contrib.auth import get_user_model
from django.conf import settings
from django.db import models
from users.models import User

class Author(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, related_name="workshop_username_author", on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username

class Category(models.Model):
    title = models.CharField(max_length=200)

    def __str__(self):
        return self.title

# class Tag(models.Model):
#     tag = models.CharField(max_length=200)

#     def __str__(self):
#         return self.tag

# class Topic(models.Model):
#     topic = models.CharField(max_length=200)
#     def __str__(self):
#         return self.topic

# class Video(models.Model):
#     videofile = models.FileField(upload_to="workshops/videos/", null=True, verbose_name="")

#     def __str__(self):
#         return str(self.videofile)

# class Image(models.Model):
#     image = models.ImageField(upload_to="workshops/images/", blank=True)

#     def __str__(self):
#         return str(self.image)

class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="workshop_comment_user")
    reply_to = models.ForeignKey("self", null=True, blank=True, on_delete=models.CASCADE)
    # reply_to_counter = models.IntegerField(default=0)
    replies = models.ManyToManyField("self", blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    content = models.TextField()
    liked = models.BooleanField(default=False)
    like_counter = models.IntegerField(default=0)
    disliked = models.BooleanField(default=False)
    dislike_counter = models.IntegerField(default=0)
    workshop = models.ForeignKey("Workshop", on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username

class CommentReply(models.Model):
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, related_name='workshop_comment_reply_id')
    reply = models.ManyToManyField(Comment, related_name="comment_reply")

class Workshop(models.Model):
    title = models.CharField(max_length=60)
    # content = models.TextField()
    overview = models.TextField()
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="workshop_author", null=True)

    comment_count = models.IntegerField(default=0)
    view_count = models.IntegerField(default=0)
    rating_count = models.IntegerField(default=0)
    avg_rating = models.IntegerField(default=0)
    likes_count = models.IntegerField(default=0)

    timestamp = models.DateTimeField(auto_now_add=True, null=True)
    startdate = models.DateTimeField(auto_now_add=False, null=True)
    enddate = models.DateTimeField(auto_now_add=False, null=True)

    image = models.ImageField(upload_to="workshops/images/", blank=True)
    # video = models.ForeignKey(Video, related_name='workshop_video',on_delete=models.SET_NULL,blank=True, null=True)
    # tag = models.ManyToManyField(Tag, related_name="workshop_tags")
    categories = models.ManyToManyField(Category)

    def __str__(self):
        return self.title

class Participants(models.Model):
    workshop = models.ForeignKey(Workshop, related_name='workshop_inscribed',on_delete=models.CASCADE,blank=True, null=True)
    inscribed = models.ManyToManyField(settings.AUTH_USER_MODEL)
    
class WorkshopView(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE) 
    workshop_post = models.ForeignKey(Workshop, on_delete=models.CASCADE)

    def __str__(self):
        pass

class Like(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="workshop_like_user", null=True, on_delete=models.CASCADE)
    liked = models.BooleanField(default=False)
    workshop = models.ForeignKey(Workshop, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)

class Rating(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="workshop_rating_user", null=True, on_delete=models.CASCADE)
    workshop = models.ForeignKey(Workshop, on_delete=models.CASCADE)
    rate = models.IntegerField(default=0)
    created = models.DateTimeField(auto_now_add=True)

class Lesson(models.Model):
    workshop = models.ForeignKey(Workshop, on_delete=models.CASCADE)
    title = models.CharField(max_length=120)
    practice_file = models.ManyToManyField("PracticeFile", null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)

class LessonTopic(models.Model):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    title = models.CharField(max_length=120)
    lesson_video = models.ForeignKey("LessonVideo", on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)

class LessonVideo(models.Model):
    # lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    videofile = models.FileField(upload_to="workshops/lessons/videos/", null=True, verbose_name="")

class PracticeFile(models.Model):
    # lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    pfile = models.FileField(upload_to="workshops/lessons/files/", blank=True)
    created = models.DateTimeField(auto_now_add=True)
 # @property
    # def get_comments(self):
    #     return selfreply_to = models.ForeignKey("self", null=True, blank=True, on_delete=models.CASCADE, related_name='replies').comments.all().order_by("-timestamp")

    # @property
    # def comment_count(self):
    #     return Comment.objects.filter(workshop_post=self.count())
    
    # @property
    # def likes_count(self):
    #     return WorkshopView.objects.filter(workshop_post=self.count())

    # @property
    # def ratings_count(self):
    #     return WorkshopView.objects.filter(workshop_post=self.count())

    # @property
    # def view_count(self):
    #     return WorkshopView.objects.filter(workshop_post=self.count())
