from django.contrib import admin

from .models import(
    CollaborationTypes, RequestStatus,
    Collaboration, CollaborationWorkFlow,
    CollaborationRequest,
    AcademicDisciplines
) 

# class RatingAdmin(admin.ModelAdmin):
#     readonly_fields = ('upload_time')

admin.site.register(CollaborationTypes)
admin.site.register(RequestStatus)
admin.site.register(Collaboration)
admin.site.register(CollaborationWorkFlow)
admin.site.register(CollaborationRequest)
admin.site.register(AcademicDisciplines)