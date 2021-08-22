from django.contrib import admin

from .models import Folder, Item

class ItemInline(admin.TabularInline):
    model = Item
    extra = 0

class FolderAdmin(admin.ModelAdmin):
    inlines = [ItemInline]

admin.site.register(Folder, FolderAdmin)
admin.site.register(Item)
