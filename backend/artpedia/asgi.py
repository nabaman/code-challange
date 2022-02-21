"""
ASGI config for artpedia project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.0/howto/deployment/asgi/
"""

import os
from channels.routing import ProtocolTypeRouter,URLRouter
from django.core.asgi import get_asgi_application
from channels.auth import AuthMiddlewareStack
import review.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'artpedia.settings')
# channel_layer = get_channel_layer()
application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            review.routing.websocket_urlpatterns
        )
    ),
})

# TINGGAL INI CHANNEL GA BISA RUNNING DI PURE DAPHNE. MASIH SUKA PAKE LOCAL DEV SERVER
