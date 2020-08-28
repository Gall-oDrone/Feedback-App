from django.contrib import admin

from .models import(
    Workshop, Category, 
    Comment, WorkshopView, 
    Author, Like,
    Rating, Comment, CommentReply, Lesson, 
    LessonTopic, LessonVideo, PracticeFile
) 

# class RatingAdmin(admin.ModelAdmin):
#     readonly_fields = ('upload_time')

admin.site.register(Workshop)
# admin.site.register(Tag)
admin.site.register(Category)
admin.site.register(WorkshopView)
admin.site.register(Lesson)
admin.site.register(LessonTopic)
admin.site.register(LessonVideo)
admin.site.register(PracticeFile)
# admin.site.register(Video)
admin.site.register(Author)
admin.site.register(Like)
admin.site.register(Rating)
admin.site.register(Comment)
admin.site.register(CommentReply)
# admin.site.register(RatingAdmin)