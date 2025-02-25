# chat/routing.py
from django.urls import re_path

from .consumers import NotificationConsumer

websocket_urlpatterns = re_path(r'^ws/notification/(?P<username>[^/]+)/$', NotificationConsumer)
# websocket_urlpatterns = [
#     re_path(r'^ws/notification/(?P<username>[^/]+)/$', NotificationConsumer),
# ]
