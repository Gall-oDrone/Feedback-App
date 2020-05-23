# chat/routing.py
from django.urls import re_path

from .consumers import ChatConsumer
from .consumers2 import ChatConsumer2
from notificationsApi.consumers import NotificationConsumer

# websocket_urlpatterns = re_path(r'^ws/chat/(?P<room_name>[^/]+)/$', ChatConsumer)

websocket_urlpatterns = [
    re_path(r'^ws/chat/(?P<room_name>[^/]+)/$', ChatConsumer),
    re_path(r'^ws/notification/(?P<username>[^/]+)/$', NotificationConsumer),
    re_path(r'^ws/chat/video_chat/(?P<room_name>[^/]+)/$', ChatConsumer2),
]
