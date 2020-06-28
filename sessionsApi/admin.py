from django.contrib import admin

from .models import(
    Session, SessionMeeting, Topic, Experience, Months, Weekdays, Dates
) 

# class RatingAdmin(admin.ModelAdmin):
#     readonly_fields = ('upload_time')

admin.site.register(Session)
admin.site.register(SessionMeeting)
admin.site.register(Topic)
admin.site.register(Experience)
admin.site.register(Months)
admin.site.register(Weekdays)
admin.site.register(Dates)
