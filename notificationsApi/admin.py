from django.contrib import admin

from .models import(
    Notification
) 

# class RatingAdmin(admin.ModelAdmin):
#     readonly_fields = ('upload_time')

admin.site.register(Notification)