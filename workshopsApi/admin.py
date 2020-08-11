from django.contrib import admin

from .models import(
    Workshop, Tag, Category, 
    Comment, WorkshopView, Video, 
    Author, Like,
    Rating, Comment, CommentReply
) 

# class RatingAdmin(admin.ModelAdmin):
#     readonly_fields = ('upload_time')

admin.site.register(Workshop)
admin.site.register(Tag)
admin.site.register(Category)
admin.site.register(WorkshopView)
admin.site.register(Video)
admin.site.register(Author)
admin.site.register(Like)
admin.site.register(Rating)
admin.site.register(Comment)
admin.site.register(CommentReply)
# admin.site.register(RatingAdmin)