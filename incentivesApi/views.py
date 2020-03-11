# from rest_framework import viewsets
from django.db.models import Count, Q, Sum
from django.shortcuts import get_object_or_404, redirect, reverse
from django.core import serializers
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FileUploadParser, FormParser
from rest_framework.status import(
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST
)
from rest_framework import permissions
from livechatApi.models import Sender, Recipient, Category, LCRoom
from users.models import User, MeetingRequest, Profile
from articlesApi.models import Article
from incentivesApi.models import Incentive
from notificationsApi.models import Notification
from .serializers import IncentiveListSerializer, IncentiveUserListSerializer, IncentiveListDetailSerializer
from django.http import Http404, JsonResponse, HttpResponse
from rest_framework.views import APIView
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
    DestroyAPIView,
    RetrieveUpdateDestroyAPIView
)
import requests
import json

class IncentiveCreateView(CreateAPIView):
    # model = Incentive
    queryset = Incentive.objects.all().order_by('-created')
    print("queryset IncentiveCreateView")
    print(queryset)
    serializer_class = IncentiveListSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        print("request from IncentiveCreateView")
        print(request.data)
        serializer = IncentiveListSerializer(data=request.data)
        serializer.is_valid()
        print(serializer.is_valid())
        create_lcrequest = serializer.create(request)
        print(type(request.data))
        post_data = request.data
        post_data["iid"] = create_lcrequest.id
        if create_lcrequest:
            post_incentive(self, request.data)

            #NOTIFICATION
            if "recipient" in request.data:
                userId = User.objects.get(username=request.data["recipient"]).id
                print(self.request.data.get(recipient))
            else:
                userId = User.objects.get(username=request.data["buyer"]).id
            print("userId after validation")
            print(userId)
            notify = Notification()
            notify.user = User.objects.get(id=userId)
            notify.actor = self.request.data.get("buyer")[0]
            notify.verb = "Sent"
            notify.action = "Incentive Offered"
            notify.target = "1"
            print("WHERE")
            notify.description = "Incentive Offered NTFN"
            notify.save()
            print("WHERE II")
            notification_counter = Profile.objects.update_or_create(
                user_id=userId,
                defaults={"notification_counter": MeetingRequest.objects.filter(
                    to_user=userId)
                    .count(),
                }
            )

            return Response(status=HTTP_201_CREATED)
        return Response(status=HTTP_400_BAD_REQUEST)

class IncentiveListView(ListAPIView):
    # model = Incentive
    queryset = Incentive.objects.all()
    print("queryset List view")
    print(queryset)
    serializer_class = IncentiveListSerializer
    permission_classes = (permissions.AllowAny,)


class IncentiveUserListView(RetrieveAPIView):
    queryset = Incentive.objects.all()
    serializer_class = IncentiveUserListSerializer
    permission_classes = (permissions.AllowAny,)
    print(queryset.values())

    def get_object(self):
        try:
            print("LCIncentiveUserListView")
            username = self.kwargs.get('username')
            userId = User.objects.get(username=username)
            incentiveList = Incentive.objects.filter(buyer=userId.id)
            print(incentiveList)
            return incentiveList
        except ObjectDoesNotExist:
            raise Http404("You do not have an active order")
            return Response({"message": "You do not have an active order"}, status=HTTP_400_BAD_REQUEST)

class IncentiveDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Incentive.objects.all()
    serializer_class = IncentiveListDetailSerializer
    permission_classes = (permissions.AllowAny,)

    def get_object(self, *args, **kwargs):
        try:
            print("IncentiveListDetailView")
            userId = self.kwargs.get('user_id')
            requestID = self.kwargs.get('request_id')
            user = User.objects.get(username=userId)
            incentiveDetail = Incentive.objects.get(buyer=user.id, requestId=requestID)
            IncentiveListDetailSerializer(incentiveDetail)
            print(incentiveDetail)
            print(len(incentiveDetail))
            return incentiveDetail
        except ObjectDoesNotExist:
            raise Http404("You do not have an active order")
            return Response({"message": "You do not have an active order"}, status=HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        serializer = IncentiveListDetailSerializer(data=request.data)
        serializer.is_valid()
        print("On update method")
        print(self.request.data)
        print("M 5X")
        Incentive.objects.filter(id=self.request.data.get("iid"), ).update(
            cardClaimCode=self.request.data.get("gcClaimCode"),
            requestId=self.request.data.get("creationRequestId"))
        # if (self.request.data.get("scheduled") == True):
        #     Incentive.objects.filter(recipient=uId[0]).filter(article=articleId).update(
        #         scheduled=self.request.data.get("scheduled"))
        #     print("MMM")
        #     post_lc_room_view(self, request, room_participants, target_request)
        # elif (self.request.data.get("canceled") == True):
        #     Incentive.objects.filter(recipient=uId[0]).filter(
        #         article=articleId).update(canceled=self.request.data.get("canceled"))
        # else:
        #     print("M 5X")
        #     #delete_lc_room_view(self, request)
        #     Incentive.objects.filter(id=self.request.data.get("'id'"), )
        #     .update(cardClaimCode=self.request.data.get("cardClaimCode"),
        #             requestId=self.request.data.get("requestId"))
        # Incentive.objects.update_or_create(
        #     article=self.request.data.get("article"),
        #     defaults={"likes_count": Like.objects.filter(
        #     article_id=self.request.data.get("article")).filter(liked=True).count()}
        #     )
        return Response(serializer.data)

class IncentiveDeleteView(DestroyAPIView):
    queryset = Incentive.objects.all()
    serializer_class = IncentiveListSerializer
    permission_classes = (permissions.IsAuthenticated,)

# class AMIncentiveCreateView(CreateAPIView):
#     # model = Incentive
#     queryset = CreateAWGiftCard.objects.all().order_by('-created')
#     print("queryset IncentiveCreateView")
#     print(queryset)
#     serializer_class = AMIncentiveCreateView
#     permission_classes = (permissions.AllowAny,)

#     def post(self, request):
#         print("request from IncentiveCreateView")
#         print(request.data)
#         serializer = AMIncentiveCreateView(data=request.data)
#         serializer.is_valid()
#         print(serializer.is_valid())
#         create_lcrequest = serializer.create(request)
#         print(type(request.data))
#         if create_lcrequest:
#             return Response(status=HTTP_201_CREATED)
#         return Response(status=HTTP_400_BAD_REQUEST)

def post_incentive(self, data):
    local_url = "http://127.0.0.1:7000/incentives/data/create/"
    heroku_url = "https://py2-incentives.herokuapp.com/incentives/data/create/"
    headers = {'content-type': "application/json"}
    url = heroku_url
    r = requests.post(url, data=json.dumps(data), headers=headers)
    print(r.status_code)
    if r.status_code == 200:
        return Response(status=HTTP_201_CREATED)
    return HttpResponse('Could not save data', HTTP_400_BAD_REQUEST)