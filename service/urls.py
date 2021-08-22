from django.urls import include, path

from .views import get_folders, get_items

urlpatterns = [
    path('menu/', include([
            path('folders/', get_folders),
            path('items/', get_items)
        ])
    ),
]