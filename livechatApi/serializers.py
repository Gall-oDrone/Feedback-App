from rest_framework import serializers
from livechatApi.models import Sender, Recipient, Category, Request
from users.models import User


class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value


class LCRequestSerializer(serializers.ModelSerializer):
    discussion_topic = StringSerializer(many=False)
    sender = StringSerializer(many=False)
    recipient = StringSerializer(many=False)
    article = StringSerializer(many=False)

    class Meta:
        model = Request
        fields = ("date_to_appointment", "created", "notified", 
                "scheduled", "canceled", "discussion_topic", "sender", 
                "recipient", "article")

    def create(self, request):
        data = request.data
        print("DATA")
        print(data)
        request = Request()
        request.save()
        request.sender.username = data["sender"]
        request.recipient.username = data["recipient"]
        request.article.title = data["article"]
        request.date_to_appointment = data["date_to_appointment"]
        request.notified = data["notified"]
        request.scheduled = data["scheduled"]
        # request.author = data["user"]

        for e in data['discussion_topic']:
            # "2" phone call
            # "3" email 
            # "4" survey

            request.discussion_topic.add(e)
        print("live her alo")
        for c in data['discussion_topic']:
            print(c)
            newC = Category()
            newC.category = c
            request.discussion_topic.add(newC.category)

        request.save()
        return request