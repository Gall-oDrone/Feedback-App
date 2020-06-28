import os
import django
from channels.routing import get_default_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "home.settings.dev")
channel_layer = channels.asgi.get_channel_layer()