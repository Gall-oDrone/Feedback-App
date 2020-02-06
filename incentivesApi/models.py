from django.db import models
from django.contrib.auth import get_user_model
from django.conf import settings
from django.db import models
from users.models import User, ProfileInfo
from articlesApi.models import Article
from django_countries.fields import CountryField

class Brand(models.Model):
    AMAZON = 'Amazon.com Gift Card'
    UBER = 'Uber Gift Card'
    CINEPOLIS = 'CineCash'
    SPOTIFY = 'Spotify Gift Card'
    NETFLIX = "Spotify Gift Card"
    WALMART = "Walmart Gift Card"
    DOMINOSPIZZA = "Domino's Gift Card"
    BURGERKING = "Burger King Gift Card"
    BESTBUY = "Best Buy Gift Card"
    OTHER = 'other'
    BRANDS = [
        (AMAZON, ('Amazon.com Gift Card')),
        (UBER, ('Uber Gift Card')),
        (CINEPOLIS, ('CineCash')),
        (SPOTIFY, ('Spotify Gift Card')),
        (NETFLIX, ("Spotify Gift Card")),
        (WALMART, ("Walmart Gift Card")),
        (DOMINOSPIZZA, ("Domino's Gift Card")),
        (BURGERKING, ("Burger King Gift Card")),
        (BESTBUY, ("Best Buy Gift Card")),
        (OTHER, ('other'))
    ]
    brand=models.CharField(max_length=100, choices=BRANDS, blank=True)

    def __str__(self):
        return self.brand

class Incentive(models.Model):
    buyer = models.ForeignKey(User, on_delete=models.CASCADE, related_name="incentive_buyer")
    # gifter
    recipient = models.ForeignKey(User, on_delete=models.CASCADE, related_name="incentive_recipient")
    created = models.DateTimeField(auto_now_add=False)
    activated = models.BooleanField(default=False)
    claimed = models.BooleanField(default=False)
    # type of incentive
    incentive_brand = models.ManyToManyField(Brand)
    amount = models.IntegerField(blank=True, null=True)
    # date bought
    # date gifted
    country = CountryField(blank_label='(select country)')
    currency = models.CharField(max_length=5, blank=True, null=True)
    # claim_code = models.CharField(max_length=30, blank=True)
    # cardStatus = models.CharField(max_length=30, blank=True)
    cardClaimCode = models.CharField(max_length=30, blank=True, null=True)
    requestId = models.CharField(max_length=30, blank=True, null=True)
    # cardId = models.CharField(max_length=30, blank=True)
    # status = models.CharField(max_length=30, blank=True)
    # requestId = models.ForeignKey("CreateAWGiftCard", on_delete=models.CASCADE)


# list of incentives
# count incentives
# used
# unused
# recevied
# sent
# list of received
# list of recipients
# total spent

# class CreateAWGiftCard(models.Model):
#     user = models.CharField(max_length=50, blank=True, null=True)
#     date_created = models.CharField(max_length=15) 
#     cardStatus = models.CharField(max_length=15)
#     cardAmount = models.CharField(max_length=20)
#     cardcurrencyCode = models.CharField(max_length=20)
#     cardClaimCode = models.CharField(max_length=50)
#     cardExpDare = models.CharField(max_length=50)
#     cardId = models.CharField(max_length=50)
#     status = models.CharField(max_length=15)
#     requestId = models.CharField(max_length=50)

#     def __str__(self):
#         return self.requestId

# class ActivateAWGiftCard(models.Model):
#     currencyCode =  "USD"
#     amount =  150
#     activationRequestId = "Awssb0327141418PM"
#     cardNumber": "6215366885893081"

# class CancelAWGiftCard(models.Model):
#     creationRequestId = "AwssbTSpecTest001"
#     partnerId= "Awssb" 
#     gcId= "A2GCN9BRX5QS76"
