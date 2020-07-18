from django.contrib import admin

from .models import(
    Project, Tag, Category, 
    Comment, Video, Like,
    FeedbackTypes, DevPhases, Upvote,
    Rating, Comment, CommentReply,
    DevPhases, CrowdfundingTypes
) 

# class RatingAdmin(admin.ModelAdmin):
#     readonly_fields = ('upload_time')

admin.site.register(Project)
admin.site.register(Tag)
admin.site.register(Category)
admin.site.register(Video)
admin.site.register(FeedbackTypes)
admin.site.register(DevPhases)
admin.site.register(CrowdfundingTypes)
admin.site.register(Like)
admin.site.register(Upvote)
admin.site.register(Rating)
admin.site.register(Comment)
admin.site.register(CommentReply)
# admin.site.register(RatingAdmin)