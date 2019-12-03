from django.db import models
from django.conf import settings
# from articlesApi.models import Article

class View(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    # articles = models.OneToOneField(Article, on_delete=models.CASCADE)
    views_count = models.IntegerField(default=0)

    def __str__(self):
        return "{}-{}".format(self.articles, self.views_count)
