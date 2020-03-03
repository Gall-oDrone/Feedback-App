from django.contrib import admin

from .models import(
    Inquiry, Tag, Tagging, InquiryType, 
    Comment, InquiryView,
    ContactOption, Like,
    Rating, Comment, CommentReply
) 

# class RatingAdmin(admin.ModelAdmin):
#     readonly_fields = ('upload_time')

admin.site.register(Inquiry)
admin.site.register(Tag)
admin.site.register(Tagging)
admin.site.register(InquiryType)
admin.site.register(InquiryView)
admin.site.register(ContactOption)
admin.site.register(Like)
admin.site.register(Rating)
admin.site.register(Comment)
admin.site.register(CommentReply)
# admin.site.register(RatingAdmin)