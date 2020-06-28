from django.contrib.auth import get_user_model
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
import json
from .models import Notification
from .views2 import get_last_5_messages, update_user_notifications, load_more, get_views

User = get_user_model()


class WalletConsumer(WebsocketConsumer):

    def fetch_messages(self, data):
        messages, hasMore = get_last_5_messages(data['username'])
        content = {
            'command': 'notifications',
            'messages': {'messages':self.messages_to_json(messages), 'hasMore': hasMore}
        }
        self.send_message(content)

    def update_messages(self, data):
        update_notify = update_user_notifications(data['username'])
    
    def message_views(self, data):
        unviews = get_views(data['username'])
        content = {
            'command': 'unviews',
            'unviews': {'unview': unviews}
        }
        self.send_message(content)

    
    def more_messages(self, data):
        ntfns, hasMore = load_more(data)
        print("FUCKNESS", ntfns, hasMore)
        content = {
            'command': 'notifications',
            'messages': {'messages':self.messages_to_json(messages), 'hasMore': hasMore}
        }
        self.send_message(content)


    def messages_to_json(self, messages):
        result = []
        for message in messages:
            result.append(self.message_to_json(message))
        return result

    def message_to_json(self, message):
        return {
            'id': message.id,
            'author': message.user.username,
            'content': message.description,
            'timestamp': str(message.timestamp)
        }

    commands = {
        'fetch_notifications': fetch_messages,
        'update_notifications': update_messages,
        'fetch_more_notifications': more_messages,
        'notification_views': message_views
    }

    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['username']
        self.room_group_name = 'chat_%s' % self.room_name
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.accept()

    def disconnect(self, close_code):
        ws, prefix, label = self.scope['path'].strip('/').split('/')
        data = {'chatId': label}

        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data):
        data = json.loads(text_data)
        print("data", data)
        self.commands[data['command']](self, data)

    def send_chat_message(self, message):
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                # 'username': self.scope["user"].username
            }
        )

    def send_message(self, message):
        self.send(text_data=json.dumps(message))

    def chat_message(self, event):
        message = event['message']
        self.send(text_data=json.dumps(message))
