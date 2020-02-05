from django.contrib import admin

from .models import(
    Article, Tag, Tagging, Category, 
    Comment, ArticleView, Video, 
    FeedbackTypes, Author, Like,
    Rating, Comment
) 

# class RatingAdmin(admin.ModelAdmin):
#     readonly_fields = ('upload_time')

admin.site.register(Article)
admin.site.register(Tag)
admin.site.register(Tagging)
admin.site.register(Category)
admin.site.register(ArticleView)
admin.site.register(Video)
admin.site.register(FeedbackTypes)
admin.site.register(Author)
admin.site.register(Like)
admin.site.register(Rating)
admin.site.register(Comment)
# admin.site.register(RatingAdmin)