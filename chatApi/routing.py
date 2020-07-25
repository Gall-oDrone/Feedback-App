# chat/routing.py
from django.urls import re_path

from .consumers import ChatConsumer
from .consumers2 import ChatConsumer2
from .consumers3 import ChatConsumer3
from notificationsApi.consumers import NotificationConsumer

# websocket_urlpatterns = re_path(r'^ws/chat/(?P<room_name>[^/]+)/$', ChatConsumer)

websocket_urlpatterns = [
    re_path(r'^ws/chat/(?P<room_name>[^/]+)/$', ChatConsumer),
    re_path(r'^ws/notification/(?P<username>[^/]+)/$', NotificationConsumer),
    re_path(r'^ws/chat/video_chat/(?P<room_name>[^/]+)/$', ChatConsumer2),
    # re_path(r'^ws/messages/(?P<username>[^/]+)/$', ChatConsumer3),
]
