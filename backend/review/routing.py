# chat/routing.py
from django.urls import re_path
from . import consumer

websocket_urlpatterns = [
    re_path(r'post/rating/', consumer.ReviewConsumer.as_asgi()),
]