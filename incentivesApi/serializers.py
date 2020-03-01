from rest_framework import serializers
from django.utils.dateparse import parse_datetime
from datetime import datetime
from livechatApi.models import Sender, Recipient, Category, Request, LCRoom
from incentivesApi.models import Incentive, Brand 
from users.models import User, MeetingRequest

class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value

class IncentiveListSerializer(serializers.ModelSerializer):
    id = StringSerializer(many=False)
    buyer = StringSerializer(many=False)
    recipient = StringSerializer(many=False)
    created = StringSerializer(many=False)
    incentive_brand = StringSerializer(many=True)
    amount = StringSerializer(many=False)
    country = StringSerializer(many=False)
    currency = StringSerializer(many=False)
    cardClaimCode = StringSerializer(many=False)
    requestId = StringSerializer(many=False)

    class Meta:
        model = Incentive
        fields = ("__all__")
        # fields = ("id", "buyer", "created", "incentive_brand", "amount", "country")

    def create(self, request):
        data = request.data
        print("DATA")
        print(data)
        # print(parse_datetime(data["created"]))
        # parsed_date = parse_datetime(data["created"])
        # print(datetime.strptime(data["created"], "%Y-%m-%dT%H:%M:%S.%fZ").date())
        incentive = Incentive()
        incentive.created = data["created"]
        incentive.currency = data["currency"]
        # incentive.currency = "1111"
        incentive.amount = data["amount"]
        incentive.country = data["country"]
        print("MR CORSO")
        print(User.objects.get(username=data["buyer"]).id)
        incentive.buyer_id = User.objects.get(username=data["buyer"]).id
        if "recipient" not in data:
            incentive.recipient_id = User.objects.get(username=data["buyer"]).id
        else:
            # incentive.recipient_id = "2"
            incentive.recipient_id = User.objects.get(username=data["recipient"]).id
        
        incentive.save()
        for b in data['incentive_brand']:
            print(b)
            newB = Brand()
            newB.brand = b
            print(newB.brand)
            incentive.incentive_brand.set(newB.brand)

        incentive.save()
        
        # userNotification = MeetingRequest()
        # userNotification.from_user = User.objects.get(username=data["user"])
        # userNotification.to_user = User.objects.get(username=data["recipient"])
        # userNotification.save()

        return incentive

class IncentiveUserListSerializer(serializers.ListSerializer):
    child = IncentiveListSerializer()
    allow_null = True
    many = True

class IncentiveListDetailSerializer(serializers.ModelSerializer):
    buyer = StringSerializer(many=False)
    created = StringSerializer(many=False)
    incentive_brand = StringSerializer(many=True)
    amount = StringSerializer(many=False)
    country = StringSerializer(many=False)
    currency = StringSerializer(many=False)

    class Meta:
        model = Incentive
        fields = ("buyer", "created", "incentive_brand", 
                "amount", "country", "currency", "activated")

# class AMIncentiveCreateSerializer(serializers.ModelSerializer):
#     user = StringSerializer(many=False)
#     date_created = StringSerializer(many=False)
#     cardStatus = StringSerializer(many=False)
#     cardAmount = StringSerializer(many=False)
#     cardcurrencyCode = StringSerializer(many=False)
#     cardClaimCode = StringSerializer(many=False)
#     cardExpDare = StringSerializer(many=False)
#     cardId = StringSerializer(many=False)
#     status = StringSerializer(many=False)
#     requestId = StringSerializer(many=False)
    
#     class Meta:
#         model = CreateAWGiftCard
#         fields = ("__all__")
    
#     def create(self, request):
#             data = request
#             print("DATA")
#             print(data)
#             awincentive = CreateAWGiftCard()
#             awincentive.user = data["buyer"]
#             awincentive.date_created = data["date_created"]
#             awincentive.cardStatus = data["cardInfo"]["cardStatus"]
#             awincentive.cardAmount = data["cardInfo"]["value"]["amount"]
#             awincentive.cardcurrencyCode = data["cardInfo"]["value"]["currencyCode"]
#             awincentive.cardClaimCode = data["gcClaimCode"]
#             # incentive.cardExpDate = data["gcExpirationDate"]
#             awincentive.cardId = data["gcId"]
#             awincentive.status = data["status"]
#             awincentive.requestId = data["creationRequestId"]
#             print("MR CORSO")
#             awincentive.save()

#             return awincentive