# chat/routing.py
from django.urls import re_path

from .consumers import WalletConsumer

websocket_urlpatterns = re_path(r'^ws/wallet/(?P<username>[^/]+)/$', WalletConsumer)
# websocket_urlpatterns = [
#     re_path(r'^ws/notification/(?P<username>[^/]+)/$', NotificationConsumer),
# ]
