from django.contrib import admin

from .models import Contact, Chat, Message, Callers, Callees

class ChatAdmin(admin.ModelAdmin):
	filter_horizontal = ('participants',)

admin.site.register(Chat, ChatAdmin)
admin.site.register(Contact)
admin.site.register(Message)
admin.site.register(Callers)
admin.site.register(Callees)