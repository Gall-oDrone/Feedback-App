from rest_framework import serializers

from chatApi.models import Chat, Contact, Callers, Callees
from chatApi.views2 import get_user_contact


class ContactSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value


class ChatSerializer(serializers.ModelSerializer):
    participants = ContactSerializer(many=True)

    class Meta:
        model = Chat
        fields = ('id', 'messages', 'participants', 'video_disabled')
        read_only = ('id')

    def create(self, validated_data):
        print(validated_data)
        participants = validated_data.pop('participants')
        chat = Chat()
        chat.save()
        for username in participants:
            contact = get_user_contact(username)
            chat.participants.add(contact)
        chat.save()
        return chat

class ChatStatusSerializer(serializers.ModelSerializer):

    class Meta:
        model = Chat
        fields = ('id', 'video_disabled')
        read_only = ('id')

class Participants(serializers.ModelSerializer):
    user = ContactSerializer(many=False)
    class Meta:
        model = Contact
        fields = ('id', 'user')
        read_only = ('id')


class CallerCandidatesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Callers
        fields = ('id', 'callers')
        read_only = ('id')

    def create(self, validated_data):
        print(validated_data)
        callers = validated_data.pop('callers')
        caller = Callers()
        for c in callers:
            caller.callers = c
        caller.save()
        return caller

class CalleeCandidatesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Callees
        fields = ('id', 'callees')
        read_only = ('id')

    def create(self, validated_data):
        print(validated_data)
        callers = validated_data.pop('callees')
        caller = Callees()
        for c in callers:
            caller.callers = c
        caller.save()
        return caller
# do in python shell to see how to serialize data

# from chat.models import Chat
# from chat.api.serializers import ChatSerializer
# chat = Chat.objects.get(id=1)
# s = ChatSerializer(instance=chat)
# s
# s.data
