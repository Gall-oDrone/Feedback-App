from django.contrib import admin

from .models import Article, Survey, Feedback

admin.site.register(Article)
admin.site.register(Survey)
admin.site.register(Feedback)