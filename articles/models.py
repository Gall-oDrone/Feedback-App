from django.db import models


class Article(models.Model):
    title = models.CharField(max_length=120)
    content = models.TextField()

    def __str__(self):
        return self.title

class URL(models.Model):
    webpage = models.URLField(max_length=100)
    def __str__(self):
        return self.webpage

class Survey(models.Model):
    pass
    
class Feedback(models.Model):
    pass


# class User(models.Model):
#     user_name = models.CharField(max_length=10)
#     user_content = models.TextField()
#     def __str__(self):
#         return self.user_name

# class Startup(models.Model):
#     startup_name = models.CharField(max_length=10)
#     startup_content = models.TextField()
#     def __str__(self):
#         return self.startup_name