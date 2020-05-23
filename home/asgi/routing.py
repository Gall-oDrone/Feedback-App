from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
import chatApi.routing
import notificationsApi.routing

application = ProtocolTypeRouter({
    'websocket': AuthMiddlewareStack(
        URLRouter(
            chatApi.routing.websocket_urlpatterns,
            # notificationsApi.routing.websocket_urlpatterns
        )
    ),
})

# application = ProtocolTypeRouter({
#     'websocket': AuthMiddlewareStack(
#         URLRouter([
#             chatApi.routing.websocket_urlpatterns,
#             notificationsApi.routing.websocket_urlpatterns
#         ])
#     ),
# })