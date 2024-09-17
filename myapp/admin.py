# admin.py
from django.contrib import admin
from .models import Member

class MemberAdmin(admin.ModelAdmin):
    list_display = ('name',)  # This will display the 'name' field in the list view
    search_fields = ('name',)  # This will allow searching by 'name'

admin.site.register(Member, MemberAdmin)
