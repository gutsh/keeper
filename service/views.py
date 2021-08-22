from django.shortcuts import render
from django.core import serializers
from django.http import HttpResponse

from .models import Folder, Item

#service/menu/folders
def get_folders(request, *args, **kwargs):
    f = serializers.serialize('json', Folder.objects.all())
    return HttpResponse(f)

#service/menu/items
def get_items(request, *args, **kwargs):
    i = serializers.serialize(
        'json',
        Item.objects.all(),
        fields=('name', 'stopped', 'price', 'serving_time', 'folder')
    )
    return HttpResponse(i)
