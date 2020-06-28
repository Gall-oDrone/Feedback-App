from rest_framework import serializers
from django.utils.dateparse import parse_datetime
from datetime import datetime
from .models import Wallet, Transaction, Balance
from users.models import User, MeetingRequest

class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value

class WalletSerializer(serializers.ModelSerializer):
    id = StringSerializer(many=False)
    user = StringSerializer(many=False)
    current_balance = StringSerializer(many=False)
    created_at = StringSerializer(many=False)

    class Meta:
        model = Wallet
        fields = ("__all__")
        # fields = ("id", "buyer", "created", "wallet_brand", "amount", "country")

    def create(self, request):
        data = request.data
        print("DATA")
        print(data)
        wallet = Wallet()
        wallet.created_at = data["created"]
        wallet.currency = data["currency"]
        # wallet.currency = "1111"
        wallet.amount = data["amount"]
        wallet.country = data["country"]
        print("MR CORSO")
        print(User.objects.get(username=data["buyer"]).id)
        wallet.buyer_id = User.objects.get(username=data["buyer"]).id
        if "recipient" not in data:
            wallet.recipient_id = User.objects.get(username=data["buyer"]).id
        else:
            # wallet.recipient_id = "2"
            wallet.recipient_id = User.objects.get(username=data["recipient"]).id
        
        wallet.save()
        return wallet

class WalletTransactionListSerializer(serializers.ListSerializer):
    wallet = StringSerializer(many=False),
    user = StringSerializer(many=False),
    value = StringSerializer(many=False),
    running_balance = StringSerializer(many=False),
    created_at = StringSerializer(many=False)

    class Meta:
        model = Transaction
        fields = ("__all__")
    

class WalletListDetailSerializer(serializers.ModelSerializer):
    user = StringSerializer(many=False)
    current_balance = StringSerializer(many=False)
    created_at = StringSerializer(many=False)

    class Meta:
        model = Wallet
        fields = ("__all__")
