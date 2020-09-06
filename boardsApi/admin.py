from django.contrib import admin

from .models import(
    Board_types, Board, BoardDetail, 
    Cards, CardTag, CardFiles, 
    CardChecklist, CardComments,
    CardChecklistTask
) 

# class RatingAdmin(admin.ModelAdmin):
#     readonly_fields = ('upload_time')

admin.site.register(Board_types)
admin.site.register(Board)
admin.site.register(BoardDetail)
admin.site.register(Cards)
admin.site.register(CardTag)
admin.site.register(CardFiles)
admin.site.register(CardChecklist)
admin.site.register(CardComments)
admin.site.register(CardChecklistTask)