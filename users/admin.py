from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import Group

from .models import User, Student, Profile, Degree, FriendRequest, MeetingRequest, ProfileInfo, Universities, Bachelor, Master, Doctorate, Course


class UserAdmin(BaseUserAdmin):
    add_fieldsets = (
        (None, {
            'fields': ('email', 'university', 'username', 'is_student', 'is_teacher', 'password1', 'password2',"partners","website")
        }),
        ('Permissions', {
            'fields': ('is_superuser', 'is_staff')
        })
    )
    fieldsets = (
        (None, {
            'fields': ('email', 'university', 'username', 'is_student', 'is_teacher', 'password',"partners","website")
        }),
        ('Permissions', {
            'fields': ('is_superuser', 'is_staff')
        })
    )
    list_display = ['email', 'university', 'username', 'is_student', 'is_teacher']
    search_fields = ('email', 'username')
    ordering = ('email',)


admin.site.register(User, UserAdmin)
admin.site.register(Student)
admin.site.unregister(Group)
admin.site.register(Profile)
admin.site.register(FriendRequest)
admin.site.register(MeetingRequest)
admin.site.register(ProfileInfo)
admin.site.register(Universities)
admin.site.register(Degree)
admin.site.register(Bachelor)
admin.site.register(Master)
admin.site.register(Doctorate)
admin.site.register(Course)