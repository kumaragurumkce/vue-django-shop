from django.contrib import admin
from .models import Student, Category, Item, Product

class StudentAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'course', 'email', 'gender')
    search_fields = ('name', 'email', 'course')
    list_filter = ('gender',)

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')  # Adjust fields as necessary
    search_fields = ('name',)

class ItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'category')  # Adjust fields as necessary
    list_filter = ('category',)
    search_fields = ('name',)

class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'item')  
    list_filter = ('item',)
    search_fields = ('name',)

admin.site.register(Student, StudentAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Item, ItemAdmin)
admin.site.register(Product, ProductAdmin)
