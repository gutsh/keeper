from django.core import serializers
from django.core.exceptions import PermissionDenied
from django.http import HttpResponse
from django.views.decorators.http import require_GET
from django.conf import settings

from service.models import Folder, Item

@require_GET
def get_menu(request, *args, **kwargs):
    if request.META['REMOTE_ADDR'] not in settings.REST_ALLOWED_CLIENTS: raise PermissionDenied
    i = serializers.serialize('json', [*Folder.objects.all(), *Item.objects.all()])
    return HttpResponse(i, content_type='application/json', charset='utf-8', headers={
        'Access-Control-Allow-Origin': '*'
    })

@require_GET
def get_folders(request, *args, **kwargs):
    f = serializers.serialize('json', Folder.objects.all())
    return HttpResponse(f)

@require_GET
def get_items(request, *args, **kwargs):
    i = serializers.serialize(
        'json',
        Item.objects.all(),
        fields=('name', 'stopped', 'price', 'serving_time', 'folder')
    )
    return HttpResponse(i)