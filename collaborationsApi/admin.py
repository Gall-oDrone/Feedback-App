from django.contrib import admin

from .models import(
    Collaboration_types, Request_status,
    Collaboration, CollaborationWorkFlow,
    CollaborationRequest
) 

# class RatingAdmin(admin.ModelAdmin):
#     readonly_fields = ('upload_time')

admin.site.register(Collaboration_types)
admin.site.register(Request_status)
admin.site.register(Collaboration)
admin.site.register(CollaborationWorkFlow)
admin.site.register(CollaborationRequest)