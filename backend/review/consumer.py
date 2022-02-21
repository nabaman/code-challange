import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer

class ReviewConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = 'review'
        self.room_group_name = self.room_name+"_product"
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.accept()

    def disconnect(self, code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    # def receive(self, text_data=None, bytes_data=None):
    #     data = json.loads(text_data)
    #     message = data['message']
    #     async_to_sync(self.channel_layer.group_send)(
    #         self.room_group_name,{
    #             "type": 'send_update_review',
    #             "message": message
    #         }
    #     )

    def send_update_review(self,event):
        new_rating = event['new_rating']
        new_review = event['new_review']
        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'new_rating': new_rating,
            'new_review': new_review
        }))