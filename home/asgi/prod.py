import os
import django
from channels.routing import get_default_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "home.settings.prod")
channel_layer = channels.asgi.get_channel_layer()
