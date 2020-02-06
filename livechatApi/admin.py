from django.contrib import admin

from .models import(
    Sender, Recipient, Category, Request, LCRoom, MeetingReview,MeetingReviewChoice, MeetingRating
) 

# class RatingAdmin(admin.ModelAdmin):
#     readonly_fields = ('upload_time')

admin.site.register(Sender)
admin.site.register(Recipient)
admin.site.register(Category)
admin.site.register(Request)
admin.site.register(LCRoom)
admin.site.register(MeetingReview)
admin.site.register(MeetingReviewChoice)
admin.site.register(MeetingRating)