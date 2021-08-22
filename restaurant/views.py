from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotAllowed
from django.conf import settings

def index(request, *args, **kwargs):
    if request.META['REMOTE_ADDR'] not in settings.REST_ALLOWED_CLIENTS:
        return HttpResponseNotAllowed(['GET', 'POST'], "You're not allowed.")
    if 'terminal' not in request.session: request.session['terminal'] = request.META['HTTP_USER_AGENT']
    return render(request, 'index.html')
