from django.contrib import admin
from .models import(
    Brand,
Incentive
) 

# class RatingAdmin(admin.ModelAdmin):
#     readonly_fields = ('upload_time')

admin.site.register(Brand
)
admin.site.register(Incentive)
