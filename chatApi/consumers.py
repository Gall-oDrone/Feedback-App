from django.contrib.auth import get_user_model
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
import json
from .models import Message, Chat, Contact, Callers, Callees
from .views2 import get_last_10_messages, get_user_contact, get_current_chat

User = get_user_model()


class ChatConsumer(WebsocketConsumer):

    def fetch_messages(self, data):
        if("chatId" not in data):
            try:
                print("fetch_messages TRY")
                from_user_contact = get_user_contact(data['username'])
                to_user_contact = get_user_contact(data['to'])
                checker = Chat.objects.filter(participants=from_user_contact.id).filter(participants=to_user_contact.id)
                messages = get_last_10_messages(checker.values("id")[0].get("id"))
                print(messages)
                content = {
                    'command': 'messages',
                    'messages': self.messages_to_json(messages),
                    'room_id': checker.values("id")[0].get("id")
                }
            except Exception as e:
                print("fetch_messages EXCEPT: ", e.message, type(e))
                content = {
                    'command': 'messages',
                    'messages': ""
                }
        else:
            messages = get_last_10_messages(data['chatId'])
            content = {
                'command': 'messages',
                'messages': self.messages_to_json(messages)
            }
        print("sending message back to client")
        self.send_message(content)
        

    def new_message(self, data):
        if("chatId" in data):
            user_contact = get_user_contact(data['from'])
            room_id = Chat.objects.get(id=data['chatId'])
            message = Message.objects.create(
                contact=user_contact,
                content=data['message'],
                room=room_id)
            current_chat = get_current_chat(data['chatId'])
        else: 
            contact, created = Contact.objects.get_or_create(user=User.objects.get(username=data['from']))
            print("ramiro 1", contact.friends.values())
            contact_friends_list = [x["user_id"] for x in (contact.friends.values())]
            print("ramiro 2", contact_friends_list)
            print("ramiro 4", contact.contacts)
            from_user = User.objects.get(username=data['from'])
            to_user = User.objects.get(username=data['to'])
            from_user_contact = get_user_contact(data['from'])
            to_user_contact = get_user_contact(data['to'])
            if(to_user.id not in contact_friends_list):
                user_contact, created = Contact.objects.get_or_create(user=User.objects.get(username=data['to']))
                contact.friends.add(user_contact)   
                current_chat = Chat()
                current_chat.save()
                current_chat.participants.add(contact)
                current_chat.participants.add(user_contact)
                current_chat.save()
            else:
                checker = Chat.objects.filter(participants=from_user_contact.id).filter(participants=to_user_contact.id)
                print(checker)
                print(checker.values(), checker.values("id"), checker.values("id")[0])
                if(len(checker) > 0):
                    current_chat = Chat.objects.get(id=checker.values("id")[0].get("id"))
            message = Message.objects.create(
                contact=from_user_contact,
                content=data['message'],
                room=current_chat)
        if(data['message'] not in self.message_to_json(message)):
            current_chat.messages.add(message)
            current_chat.save()
        content = {
            'command': 'new_message',
            'message': self.message_to_json(message)
        }
        return self.send_chat_message(content)

    def messages_to_json(self, messages):
        result = []
        for message in messages:
            result.append(self.message_to_json(message))
        return result

    def message_to_json(self, message):
        return {
            'id': message.id,
            'author': message.contact.user.username,
            'content': message.content,
            'timestamp': str(message.timestamp)
        }
    
    def offer_answer_to_json(self, message):
        print("msg: ", message["type"])
        return {
            'type': message["type"],
            'sdp': message["sdp"],
        }
    
    def candidates_to_json(self, candidates):
        cands = []
        for candidate in candidates:
            cands.append(self.candidate_to_json(candidate))
        return cands
    
    def candidate_to_json(self, candidate):
        for c in candidate:
            return {
                'type': candidate["type"],
                'label': candidate["label"],
                'id': candidate["id"],
                'candidate': candidate["candidate"]
            }
    
    def candidate_to_json2(self, candidate):
        return {
                'type': candidate["type"],
                'label': candidate["label"],
                'id': candidate["id"],
                'candidate': candidate["candidate"],
            }
    
    def set_video_room_status(self, vr, status):
        vr.video_disabled = status
        vr.save()

    def get_parts_to_json(self, parts):
        return {
            'participants': parts
            }
    
    def get_part(self, data):
        current_chat = get_current_chat(data['chatId'])
        participants = current_chat.participants.all()
        ps = []
        for p in participants:
            ps.append(p.user.username)
        content = {
            'command': 'new_message',
            'message': self.get_parts_to_json(ps)
        }
        return self.send_chat_message(content)
    
    def get_status(self, data):
        current_chat = get_current_chat(data['chatId'])
        self.set_video_room_status(current_chat, True)
        content = {
            'command': 'room_status',
            'status': data["message"]
        }
        return self.send_message(content)
    
    def fetch_status(self, data):
        current_chat = get_current_chat(data['chatId'])
        status = current_chat.video_disabled
        content = {
            'command': 'room_status',
            'status': status
        }
        return self.send_message(content)

    def add_caller(self, data):
        current_chat = get_current_chat(data['chatId'])
        # if(len(current_chat.callerCandidates.all()) > 5):
        #     print("5 callers already registered")
        # else:
        caller_candidate = Callers.objects.create(caller=data['message'])
        current_chat.callerCandidates.add(caller_candidate)
        current_chat.save()
        content = {
            'command': 'new_message',
            'to': data['to'],
            'message': self.candidate_to_json2(data["message"])
        }
        self.send_chat_message(content)
        # return candidates_to_json(current_chat.callerCandidates.all())

    def add_callee(self, data):
        callee_candidate = Callees.objects.create(
            callee=data['message'])
        current_chat = get_current_chat(data['chatId'])
        current_chat.calleeCandidates.add(callee_candidate)
        # if(len(current_chat.callerCandidates.all()) > 5):
        #     print("5 callees already registered")            
        # else:
        #     current_chat.calleeCandidates.add(callee_candidate)
        current_chat.save()
    
    def add_answer(self, data):
        current_chat = get_current_chat(data['chatId'])
        current_chat.answer = data['message']
        current_chat.save()
        content = {
            'command': 'new_message',
            'to': data['to'],
            'message': self.offer_answer_to_json(current_chat.answer)
        }
        return self.send_chat_message(content)
    
    def add_offer(self, data):
        current_chat = get_current_chat(data['chatId'])
        current_chat.offer = data['message']
        current_chat.save()
        content = {
            'command': 'new_message',
            'to': data['to'],
            'message': self.offer_answer_to_json(current_chat.offer)
        }
        return self.send_chat_message(content)
    
    def add_media(self, data):
        current_chat = get_current_chat(data['chatId'])
        content = {
            'command': 'new_message',
            'message': data
        }
        return self.send_chat_message(content)
    
    def end_call(self, data):
        current_chat = get_current_chat(data['chatId'])
        current_chat.sdp = ""
        current_chat.offer = ""
        current_chat.answer = ""
        set_video_room_status(current_chat, False)
        current_chat.save()
        current_chat.callerCandidates = None
        current_chat.calleeCandidates = None
        callers = Callers.objects.all()
        callers.delete()
        callees = Callees.objects.all()
        callees.delete()
        content = {
            'command': 'new_message',
            'message': data
        }
        return self.send_chat_message(content)
    
    def disconnect_room(self, data):
        current_chat = get_current_chat(data['chatId'])
        self.set_video_room_status(current_chat, False)
    
    commands = {
        'fetch_messages': fetch_messages,
        'new_message': new_message,
        "media": add_media,
        'offer': add_offer,
        'answer': add_answer,
        'get_participants': get_part,
        'room_status': get_status,
        'fetch_status': fetch_status,
        'disconnect': disconnect_room,
        'caller': add_caller,
        'callee': add_callee,
        'end': end_call
    }

    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        print("RAMIRO: ", self.room_name)
        self.room_group_name = 'chat_%s' % self.room_name
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.accept()

    def disconnect(self, close_code):
        ws, prefix, label = self.scope['path'].strip('/').split('/')
        data = {'chatId': label}
        self.disconnect_room(data)

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
