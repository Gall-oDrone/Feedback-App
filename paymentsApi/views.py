from django.views.decorators.csrf import csrf_exempt
from django_countries import countries
from django.db.models import Q
from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist
from django.http import Http404, HttpResponse
from django.shortcuts import render, get_object_or_404
from django.utils import timezone
from datetime import datetime, date
from django.views.generic import View
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from paymentsApi.models import Item, OrderItem, Order
from notificationsApi.models import Notification
from users.models import User, Profile
from .serializers import (ItemSerializer, 
                            OrderSerializer, 
                            ItemDetailSerializer, 
                            AddressSerializer, 
                            PaymentSerializer,
                            SessionOrderItemSerializer,
                            SessionOrderSerializer)
from paymentsApi.models import  (Item, 
                                OrderItem, 
                                Order, 
                                Address, 
                                Payment, 
                                Coupon, 
                                Refund, 
                                UserProfile, #Variation, ItemVariation
                                SessionOrderItem,
                                SessionOrder)
from sessionsApi.models import Session, SessionMeeting
from sessionsApi.views import post_lc_room_view
from incentivesApi.views import IncentiveCreateView

import requests
import json
import stripe

stripe.api_key = settings.STRIPE_SECRET_KEY


class UserIDView(APIView):
    def get(self, request, *args, **kwargs):
        return Response({'userID': request.user.id}, status=HTTP_200_OK)


class ItemListView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ItemSerializer
    queryset = Item.objects.all()


class ItemDetailView(RetrieveAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ItemDetailSerializer
    queryset = Item.objects.all()

class OrderQuantityUpdateView(APIView):
    def post(self, request, *args, **kwargs):
        slug = request.data.get('slug', None)
        if slug is None:
            return Response({"message": "Invalid data"}, status=HTTP_400_BAD_REQUEST)
        item = get_object_or_404(Item, slug=slug)
        order_qs = Order.objects.filter(
            user=request.user,
            ordered=False
        )
        if order_qs.exists():
            order = order_qs[0]
            # check if the order item is in the order
            if order.items.filter(item__slug=item.slug).exists():
                order_item = OrderItem.objects.filter(
                    item=item,
                    user=request.user,
                    ordered=False
                )[0]
                if order_item.quantity > 1:
                    order_item.quantity -= 1
                    order_item.save()
                else:
                    order.items.remove(order_item)
                return Response(status=HTTP_200_OK)
            else:
                return Response({"message": "This item was not in your cart"}, status=HTTP_400_BAD_REQUEST)
        else:
            return Response({"message": "You do not have an active order"}, status=HTTP_400_BAD_REQUEST)

class OrderItemDeleteView(DestroyAPIView):
    permissions_classes = (IsAuthenticated, )
    queryset = OrderItem.objects.all()

class DirectBuyView(APIView):
    def post(self, request, *args, **kwargs):
        user = User.objects.get(username=self.request.user)
        print(user)
        item=Item.objects.get(title=request.data.get("brand"), pk=1)
        item.pk=None
        item.price=request.data.get("amount")
        item.discount_price = item.price
        item.save()
        print(item.pk)
        print(request.data.get("amount"))
        print(item.price)
        order_item = OrderItem.objects.create(user=user, ordered=False, item=item)
        print(order_item.item.price)
        order_item.save()
        order = Order.objects.create(user=user, ordered_date=timezone.now())
        order.items.add(order_item)
        print(order.id)
        return Response({"order_id": order.id, "order_type": "gift card"}, status=HTTP_200_OK)

class SessionBuyView(APIView):
    def post(self, request, *args, **kwargs):
        user = User.objects.get(username=self.request.user)
        print(user)
        print("WUÉ", request.data, request.data.get("date"), request.data.get("start_time"))
        # session=Session.objects.get(pk=request.data.get("sessionId"))
        session=Session.objects.get(pk=request.data.get("session_id"))
        order_session = SessionOrderItem.objects.create(
            user=user, 
            ordered=False, 
            session = session,
            hrs = (datetime.strptime(request.data.get("end_time"), "%Y-%m-%dT%H:%M:%S.%f%z")).hour - (datetime.strptime(request.data.get("start_time"), "%Y-%m-%dT%H:%M:%S.%f%z")).hour,
            date =  request.data.get("date"),
            start_time =  request.data.get("start_time"),
            end_time =  request.data.get("end_time"))
        order_session.save()
        order = SessionOrder.objects.create(user=user, ordered_date=timezone.now())
        order.session.add(order_session)
        print("WUE 2: ", order.id, order.session)
        return Response({"order_id": order.id, "order_key":order_session.pk, "order_type": "session"}, status=HTTP_200_OK)

class AddToCartView(APIView):
    def post(self, request, *args, **kwargs):
        slug = request.data.get('slug', None)
        # variations = request.data.get('variations', [])
        if slug is None:
            return Response({"message": "Invalid request"}, status=HTTP_400_BAD_REQUEST)

        item = get_object_or_404(Item, slug=slug)

        # minimum_variation_count = Variation.objects.filter(item=item).count()
        # if len(variations) < minimum_variation_count:
        #     return Response({"message": "Please specify the required variation types"}, status=HTTP_400_BAD_REQUEST)

        order_item_qs = OrderItem.objects.filter(
            item=item,
            user=request.user,
            ordered=False
        )
        # for v in variations:
        #     order_item_qs = order_item_qs.filter(
        #         Q(item_variations__exact=v)
        #     )

        if order_item_qs.exists():
            order_item = order_item_qs.first()
            order_item.quantity += 1
            order_item.save()
        else:
            order_item = OrderItem.objects.create(
                item=item,
                user=request.user,
                ordered=False
            )
            # order_item.item_variations.add(*variations)
            order_item.save()

        order_qs = Order.objects.filter(user=request.user, ordered=False)
        if order_qs.exists():
            order = order_qs[0]
            if not order.items.filter(item__id=order_item.id).exists():
                order.items.add(order_item)
                return Response(status=HTTP_200_OK)

        else:
            ordered_date = timezone.now()
            order = Order.objects.create(
                user=request.user, ordered_date=ordered_date)
            order.items.add(order_item)
            return Response(status=HTTP_200_OK)


class OrderDetailView(RetrieveAPIView):
    serializer_class = OrderSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        print("order")
        print(self.request.GET.get("orderID"))
        try:
            if(self.request.GET.get("orderID") != None):
                orderId=self.request.GET.get("orderID")
                order = Order.objects.get(user=self.request.user, ordered=False, pk=orderId)
                print(order.items)
            else:
                order = Order.objects.get(user=self.request.user, ordered=False)
            print("order", order)
            return order
        except ObjectDoesNotExist:
            raise Http404("You do not have an active order")
            # return Response({"message": "You do not have an active order"}, status=HTTP_400_BAD_REQUEST)

class SessionOrderDetailView(RetrieveAPIView):
    serializer_class = SessionOrderSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        print("order")
        print(self.request.GET.get("orderID"))
        try:
            if(self.request.GET.get("orderID") != None):
                orderId=self.request.GET.get("orderID")
                order = SessionOrder.objects.get(user=self.request.user, ordered=False, pk=orderId)
                print(order)
            else:
                order = Order.objects.get(user=self.request.user, ordered=False)
            print("order", order)
            return order
        except ObjectDoesNotExist:
            raise Http404("You do not have an active order")

class PaymentView(APIView):

    def post(self, request, *args, **kwargs):
        user = User.objects.get(username=self.request.user)
        userID = user.id
        print("CORSO: ", request.data, request.data.get("order_id"))
        if(request.data.get("isDirectBuying") == True):
            order = Order.objects.get(user=userID, ordered=False, pk=request.data.get('order_id'))
        else:
            if(request.data.get("order_type") == "session"):
                order = SessionOrder.objects.get(user=userID, ordered=False, pk=request.data.get('order_id'))
            else:
                order = Order.objects.get(user=userID, ordered=False)
        userprofile = Profile.objects.get(user=userID)
        token = request.data.get('stripeToken')
        billing_address_id = request.data.get('selectedBillingAddress')
        shipping_address_id = request.data.get('selectedShippingAddress')
        print("shipping_address_id: ", type(shipping_address_id))

        billing_address = Address.objects.get(id=billing_address_id)
        if shipping_address_id != '':
            shipping_address = Address.objects.get(id=shipping_address_id)
        else:
            shipping_address = billing_address

        print(token)
        if userprofile.stripe_customer_id != '' and userprofile.stripe_customer_id is not None:
            print("13")
            customer = stripe.Customer.retrieve(
                userprofile.stripe_customer_id)

            # stripe.Customer.create_source(userprofile.stripe_customer_id, source=token)
            # customer.sources.create(source=token)

        else:
            print("14")
            customer = stripe.Customer.create(
                email=self.request.user.email,
            )
            print(customer)
            # customer.sources.create(source=token)
            # stripe.Customer.create_source(customer['id'], source=token)
            userprofile.stripe_customer_id = customer['id']
            # stripe.PaymentMethod.attach(
            #   token,
            #   customer=customer['id'],
            # )
            userprofile.one_click_purchasing = True
            userprofile.save()
        
        if(request.data.get("isDirectBuying") == True):
            amount = request.data.get("params")["amount"]
            brand = request.data.get("params")["brand"]
            country = request.data.get("params")["country"]
            currency = request.data.get("params")["currency"]
        else:
            if(request.data.get("order_type") == "session"):
                amount = int(order.get_total(request.data.get('order_id')) * 100)
            else:
                amount = int(order.get_total() * 100)
        create_payment = stripe.PaymentIntent.create(
            amount=amount,
            currency='usd',
            customer=userprofile.stripe_customer_id,
            payment_method_types=['card'],
            statement_descriptor='Custom descriptor',
            metadata={'integration_check': 'accept_a_payment'},
          )

        try:

                # charge the customer because we cannot charge the token more than once
            # charge = stripe.Charge.create(
            #     amount=amount,  # cents
            #     currency="usd",
            #     customer=userprofile.stripe_customer_id,
            # )
            # charge once off on the token
            # charge = stripe.Charge.create(
            #     amount=amount,  # cents
            #     currency="usd",
            #     source=token
            # )

            # create the payment
            payment = Payment()
            payment.stripe_charge_id = create_payment.client_secret
            payment.user = self.request.user
            if(request.data.get("isDirectBuying") == True):
                payment.amount = float(amount)
            else:
                if(request.data.get("order_type") == "session"):
                    payment.amount = order.get_total(request.data.get('order_id'))
                else:
                    payment.amount = order.get_total()
            print(payment.user, payment.amount, payment)
            payment.save()
            if(request.data.get("order_type") == "session"):
                order.ordered = True
                order.payment = payment
                order.billing_address = billing_address

                s_order_item = SessionOrderItem.objects.get(pk=request.data["order_key"])
                session_m = SessionMeeting.objects.create(
                    requester = user,
                    session = order.get_session2(pk=request.data["order_key"]),
                    date_to_appointment = s_order_item.date,
                    dta_start_time = s_order_item.start_time,
                    sta_end_time = s_order_item.end_time,
                    session_hrs = s_order_item.hrs,
                    notified = True,
                    scheduled = True
                )
                s_m = SessionMeeting.objects.filter(pk = session_m.pk)
                post_lc_room_view(self, request, s_m)

                buyerID = user
                user = order.get_session_user2(request.data.get('order_id'))
                print("COÑO 2: ", user)
                notify = Notification()
                notify.user = user
                notify.actor = buyerID
                notify.verb = "Sent"
                notify.action = "Session Booked"
                notify.target = "1"
                print("WHERE")
                notify.description = f"{buyerID} booked a session with you"
                notify.save()
                print("WHERE II")
            else:
            # assign the payment to the order
                if(hasattr(order, "items")):
                    order_items = order.items.all()
                    order_items.update(ordered=True)
                    for item in order_items:
                        item.save()
                order.ordered = True
                order.payment = payment
                if(hasattr(order, "billing_address")):
                    order.billing_address = billing_address
                if(hasattr(order, "shipping_address")):
                    order.shipping_address = shipping_address
                # order.ref_code = create_ref_code()
                # session=SessionOrderItem.objects.get(pk="1")
                # order.session.add(session)
            print("duo 2:")
            order.save()

            # data = {
            #     buyer: self.request.user,
            #     amount: amount,
            #     country: 
            #     currency:
            #     incentive_brand:
            #     created:
            # }

            if("params" in request.data):
                if(request.data.get("params") != None):
                    data = request.data.get("params")
                    data["buyer"] = user
                    print(data)
                    IncentiveCreateView.post(self, request=data)
            return Response({"client_secret": payment.stripe_charge_id}, status=HTTP_200_OK)

        except stripe.error.CardError as e:
            body = e.json_body
            err = body.get('error', {})
            return Response({"message": f"{err.get('message')}"}, status=HTTP_400_BAD_REQUEST)

        except stripe.error.RateLimitError as e:
            # Too many requests made to the API too quickly
            messages.warning(self.request, "Rate limit error")
            return Response({"message": "Rate limit error"}, status=HTTP_400_BAD_REQUEST)

        except stripe.error.InvalidRequestError as e:
            print(e)
            # Invalid parameters were supplied to Stripe's API
            return Response({"message": "Invalid parameters"}, status=HTTP_400_BAD_REQUEST)

        except stripe.error.AuthenticationError as e:
            # Authentication with Stripe's API failed
            # (maybe you changed API keys recently)
            return Response({"message": "Not authenticated"}, status=HTTP_400_BAD_REQUEST)

        except stripe.error.APIConnectionError as e:
            # Network communication with Stripe failed
            return Response({"message": "Network error"}, status=HTTP_400_BAD_REQUEST)

        except stripe.error.StripeError as e:
            # Display a very generic error to the user, and maybe send
            # yourself an email
            return Response({"message": "Something went wrong. You were not charged. Please try again."}, status=HTTP_400_BAD_REQUEST)

        except Exception as e:
            # send an email to ourselves
            print(e)
            return Response({"message": "A serious error occurred. We have been notifed."}, status=HTTP_400_BAD_REQUEST)

        return Response({"message": "Invalid data received"}, status=HTTP_400_BAD_REQUEST)

# @csrf_exempt
class PaymentSView(View):
    # def post2(self, request, *args, **kwargs):
    #     user = User.objects.get(username=self.request.user)
    #     if(request.data.get("order_type") == "session"):
    #         order = SessionOrder.objects.get(user=userID, pk=request.data.get('order_id'))
    #     else:
    #         order = Order.objects.get(user=userID, pk=request.data.get('order_id'))
    #     order.payment_successful = True
    #     order.save()
    #     return Response(status=HTTP_200_OK)
    # @csrf_exempt 
    def post(self, request, *args, **kwargs):
        print("CACA", (json.loads(request.body))["data"]["object"], (json.loads(request.body))["data"]["object"]["id"], (json.loads(request.body))["data"]["object"]["status"])
        payload = request.body
        event = None

        try:
            event = stripe.Event.construct_from(
            json.loads(payload), stripe.api_key
            )
        except ValueError as e:
            # Invalid payload
            return HttpResponse(status=400)

        # Handle the event Your webhook signing secret is "whsec_WTz90VUhHUgwE5BuL4ZQ6ATc3OaJkUeZ"
        if event.type == 'payment_intent.succeeded':
            payment_intent = event.data.object # contains a stripe.PaymentIntent
            # Then define and call a method to handle the successful payment intent.
            # handle_payment_intent_succeeded(payment_intent)
        elif event.type == 'payment_method.attached':
            payment_method = event.data.object # contains a stripe.PaymentMethod
            # Then define and call a method to handle the successful attachment of a PaymentMethod.
            # handle_payment_method_attached(payment_method)
        # ... handle other event types
        else:
            # Unexpected event type
            return HttpResponse(status=400)

        return HttpResponse(status=200)




class AddCouponView(APIView):
    def post(self, request, *args, **kwargs):
        code = request.data.get('code', None)
        if code is None:
            return Response({"message": "Invalid data received"}, status=HTTP_400_BAD_REQUEST)
        order = Order.objects.get(
            user=self.request.user, ordered=False)
        coupon = get_object_or_404(Coupon, code=code)
        order.coupon = coupon
        order.save()
        return Response(status=HTTP_200_OK)


class CountryListView(APIView):
    def get(self, request, *args, **kwargs):
        return Response(countries, status=HTTP_200_OK)


class AddressListView(ListAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = AddressSerializer

    def get_queryset(self):
        address_type = self.request.query_params.get('address_type', None)
        qs = Address.objects.all()
        if address_type is None:
            return qs
        return qs.filter(user=self.request.user, address_type=address_type)


class AddressCreateView(CreateAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = AddressSerializer
    queryset = Address.objects.all()

class AddressUpdateView(UpdateAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = AddressSerializer
    queryset = Address.objects.all()

class AddressDeleteView(DestroyAPIView):
    permission_classes = (IsAuthenticated, )
    queryset = Address.objects.all()

class PaymentListView(ListAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = PaymentSerializer
        
    def get_queryset(self):
        print(self.request.user)
        return Payment.objects.filter(user=self.request.user).order_by('-timestamp')