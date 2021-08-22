from django.contrib import admin
from django import forms

from .models import CommodityUnit, CommodityCategory, Commodity, IngredientUnit, ElementaryIngredient, CompoundIngredient, Recipe

class ElementaryIngredientInline(admin.TabularInline):
    model = ElementaryIngredient
    extra = 0

class CompoundIngredientInline(admin.TabularInline):
    model = CompoundIngredient
    extra = 0
    fk_name = 'from_recipe'

class RecipeAdmin(admin.ModelAdmin):
    inlines = [ElementaryIngredientInline, CompoundIngredientInline]
    exclude = ('elementary_ingredient','compound_ingredients')

admin.site.register(CommodityUnit)
admin.site.register(CommodityCategory)
admin.site.register(Commodity)
admin.site.register(IngredientUnit)
admin.site.register(Recipe, RecipeAdmin)