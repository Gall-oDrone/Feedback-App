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
from livechatApi.models import Sender, Recipient, Category, Request, LCRoom, MeetingReview, MeetingReviewChoice
from users.models import User, MeetingRequest, Profile
from articlesApi.models import Article
from .serializers import LCRequestSerializer, LCRequestUserListSerializer, LCRequestListDetailSerializer, LCRoomSerializer, LCCreateRoomSerializer, LCRoomListDetailSerializer, LCRoomDetailSerializer, LCMeetingReviewSerializer
from analytics.models import View
from django.http import Http404, JsonResponse, HttpResponse
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
    DestroyAPIView,
    RetrieveUpdateDestroyAPIView
)
import requests


class LCRequestListView(ListAPIView):
    # model = Request
    queryset = Request.objects.all()
    print("queryset List view")
    print(queryset)
    serializer_class = LCRequestSerializer
    permission_classes = (permissions.AllowAny,)

    def category_count():
        queryset = Request \
            .objects \
            .values("category__category") \
            .annotate(Count("category__category"))
        return queryset

    def get_sender(user):
        qs = Author.objects.filter(user=user)
        if qs.exists():
            return qs[0]
        return None


class LCRequestUserListView(RetrieveAPIView):
    queryset = Request.objects.all()
    serializer_class = LCRequestUserListSerializer
    permission_classes = (permissions.AllowAny,)
    print(queryset.values())

    def get_object(self):
        try:
            print("LCRequestUserListView")
            username = self.kwargs.get('username')
            userId = User.objects.get(username=username)
            print(userId)
            print(userId.id)
            user = Request.objects.filter(sender=userId.id)
            return user
        except ObjectDoesNotExist:
            raise Http404("You do not have an active order")
            return Response({"message": "You do not have an active order"}, status=HTTP_400_BAD_REQUEST)


class LCRequestReceivedUserListView(RetrieveAPIView):
    queryset = Request.objects.all()
    serializer_class = LCRequestUserListSerializer
    permission_classes = (permissions.AllowAny,)
    print(queryset.values())

    def get_object(self):
        try:
            print("LCRequestReceivedUserListView")
            username = self.kwargs.get('username')
            userId = User.objects.get(username=username)
            print(userId)
            print(userId.id)
            user = Request.objects.filter(recipient=userId.id)
            return user
        except ObjectDoesNotExist:
            raise Http404("You do not have an active order")
            return Response({"message": "You do not have an active order"}, status=HTTP_400_BAD_REQUEST)


class LCRequestBookedUserListView(RetrieveAPIView):
    queryset = Request.objects.all()
    serializer_class = LCRequestUserListSerializer
    permission_classes = (permissions.AllowAny,)
    print(queryset.values())

    def get_object(self):
        try:
            print("LCRequestBookedUserListView")
            username = self.kwargs.get('username')
            userId = User.objects.get(username=username)
            print(userId)
            print(userId.id)
            booked = Request.objects.filter(Q(sender=userId.id) | Q(
                recipient=userId.id)).filter(scheduled=True).distinct()
            return booked
        except ObjectDoesNotExist:
            raise Http404("You do not have an active order")
            return Response({"message": "You do not have an active order"}, status=HTTP_400_BAD_REQUEST)


class LCRequestListDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Request.objects.all()
    serializer_class = LCRequestListDetailSerializer
    # lookup_url_kwarg = "article_id"
    # lookup_url_kwarg = "user_id"
    permission_classes = (permissions.IsAuthenticated,)
    print(queryset.values())

    def get_object(self, *args, **kwargs):
        try:
            print("LCRequestListDetailView")
            articleId = self.kwargs.get('article_id')
            userId = self.kwargs.get('user_id')
            user = User.objects.get(username=userId)
            # articleId = Article.objects.get(title=article).id
            print(articleId, userId, user, user.id)
            meetingList = Request.objects.filter(sender=user.id, article=articleId)
            LCRequestListDetailSerializer(meetingList)
            print(meetingList)
            print(len(meetingList))
            if len(meetingList) == 0:
                return None
            else:
                return meetingList[0]
        except ObjectDoesNotExist:
            raise Http404("You do not have an active order")
            return Response({"message": "You do not have an active order"}, status=HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        serializer = LCRequestListDetailSerializer(data=request.data)
        serializer.is_valid()
        print("On update method")
        print(self.request.data)
        print(self.request.data.get("article"))
        articleId = Article.objects.get(
            title=self.request.data.get("article")).id
        print(articleId)
        uId = []
        for i in self.request.data.get("recipient"):
            uId.append(User.objects.get(username=i).id)
        print(uId)
        print(Request.objects.filter(
            recipient=uId[0]).filter(article=articleId))
        room_participants = uId 
        room_participants.append(User.objects.get(username=self.request.data.get("sender")).id)
        target_request = Request.objects.filter(recipient=uId[0]).filter(article=articleId)
        date_to_appointment = self.request.data.get("date_to_appointment")
        if (self.request.data.get("scheduled") == True):
            Request.objects.filter(recipient=uId[0]).filter(article=articleId).update(
                scheduled=self.request.data.get("scheduled"))
            print("MMM")
            post_lc_room_view(self, request, room_participants, target_request)
        elif (self.request.data.get("canceled") == True):
            Request.objects.filter(recipient=uId[0]).filter(
                article=articleId).update(canceled=self.request.data.get("canceled"))
        else:
            print("M 5X")
            #delete_lc_room_view(self, request)
            post_lc_room_view(self, request, room_participants, target_request, date_to_appointment)
        # Request.objects.update_or_create(
        #     article=self.request.data.get("article"),
        #     defaults={"likes_count": Like.objects.filter(
        #     article_id=self.request.data.get("article")).filter(liked=True).count()}
        #     )
        return Response(serializer.data)


class LCRequestDetailView(RetrieveAPIView):
    queryset = Request.objects.all()
    serializer_class = LCRequestSerializer
    permission_classes = (permissions.AllowAny,)


class LCRequestCreateView(CreateAPIView):
    queryset = Request.objects.all()
    print("queryset Create view at LCRequest")
    print(queryset.values())
    serializer_class = LCRequestSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        print("request from LCRequestCreateView")
        print(request.data)
        serializer = LCRequestSerializer(data=request.data)
        serializer.is_valid()
        print(serializer.is_valid())
        create_lcrequest = serializer.create(request)
        if create_lcrequest:
            userId = User.objects.get(username=request.data["recipient"]).id
            print("userId after validation")
            print(userId)
            print(self.request.data.get(userId))
            notification_counter = Profile.objects.update_or_create(
                user_id=userId,
                defaults={"notification_counter": MeetingRequest.objects.filter(
                    to_user=userId)
                    .count(),
                }
            )
            return Response(status=HTTP_201_CREATED)
        return Response(status=HTTP_400_BAD_REQUEST)


class LCRequestDeleteView(DestroyAPIView):
    queryset = Request.objects.all()
    serializer_class = LCRequestSerializer
    permission_classes = (permissions.IsAuthenticated,)
    
class LCRoomListView(ListAPIView):
    queryset = LCRoom.objects.all()
    serializer_class = LCRoomSerializer
    permission_classes = (permissions.AllowAny,)

class LCRoomCreateView(CreateAPIView):
    queryset = LCRoom.objects.all()
    serializer_class = LCCreateRoomSerializer
    permission_classes = (permissions.IsAuthenticated,)
    def post(self, request):
        print("request from LCRoomCreateView")
        print(request)
        serializer = LCCreateRoomSerializer(data=request)
        serializer.is_valid()
        print(serializer.is_valid())
        create_lcroom = serializer.create(request)

class LCRoomListDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Request.objects.all()
    serializer_class = LCRequestListDetailSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self, *args, **kwargs):
        try:
            print("LCRoomListDetailView")
            articleId = self.kwargs.get('article')
            meetingList = LCRoom.objects.filter(article=articleId)
            LCRoomListDetailSerializer(meetingList)
            print(meetingList)
            print(len(meetingList))
            if len(meetingList) == 0:
                return None
            else:
                return meetingList
        except ObjectDoesNotExist:
            raise Http404("You do not have an active order")
            return Response({"message": "You do not have an active order"}, status=HTTP_400_BAD_REQUEST)

class LCRoomDetailView(RetrieveUpdateDestroyAPIView):
    queryset = LCRoom.objects.all()
    serializer_class = LCRoomDetailSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self, *args, **kwargs):
        try:
            print("LCRoomDetailView")
            roomName = self.kwargs.get('roomName')
            meetingDetail = LCRoom.objects.get(room_name=roomName)
            LCRoomListDetailSerializer(meetingDetail)
            print(meetingDetail)
            return meetingDetail
        except ObjectDoesNotExist:
            raise Http404("You do not have an active order")
            return Response({"message": "You do not have an active order"}, status=HTTP_400_BAD_REQUEST)

    def delete(self, *args, **kwargs):
        try:
            print("LCRoomListDetailView")
            roomName = self.kwargs.get('roomName')
            print(requestId, roomName)
            meetingList = LCRoom.objects.get(room_name=roomName).delete
            LCRoomListDetailSerializer(meetingList)
            print(meetingList)
            delete_lc_room_view(self, request, roomName)
            return meetingList
        except ObjectDoesNotExist:
            raise Http404("You do not have an active order")
            return Response({"message": "You do not have an active order"}, status=HTTP_400_BAD_REQUEST)

class LCMeetingReviewlistView(ListAPIView):
    queryset = MeetingReview.objects.all()
    print("queryset LCMeetingReviewlistView")
    # print(queryset.values())
    serializer_class = LCMeetingReviewSerializer
    permission_classes = (permissions.IsAuthenticated,)

class LCMeetingReviewCreateView(CreateAPIView):
    queryset = MeetingReview.objects.all()
    print("queryset Create view at LCRequest")
    # print(queryset.values())
    serializer_class = LCMeetingReviewSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        print("request from LCRequestCreateView")
        print(request.data)
        serializer = LCMeetingReviewSerializer(data=request.data)
        serializer.is_valid()
        print(serializer.is_valid())
        create_lcrequest = serializer.create(request)
        if create_lcrequest:
            # userId = User.objects.get(username=request.data["recipient"]).id
            # print("userId after validation")
            # print(userId)
            # print(self.request.data.get(userId))
            # notification_counter = Profile.objects.update_or_create(
            #     user_id=userId,
            #     defaults={"notification_counter": MeetingRequest.objects.filter(
            #         to_user=userId)
            #         .count(),
            #     }
            # )
            return Response(status=HTTP_201_CREATED)
        return Response(status=HTTP_400_BAD_REQUEST)

def post_lc_room_view(self, request, rp, tr, dta):
    url = "https://api.daily.co/v1/rooms"
    headers = {'content-type': "application/json",
               'authorization': "Bearer 73e7ad6ba64e004eceab7e54597f3f7a6081bfbaf74b09443d7dd84b282a6798"}
    r = requests.post(url, headers=headers)
    if r.status_code == 200:
        data = r.json()
        data["rp"] = rp
        data["d_t_a"] = dta
        tr.update(room_name=data["name"])
        return LCRoomCreateView.post(self, data)
    return HttpResponse('Could not save data')

def get_lc_room_view(self, request):
    url = "https://api.daily.co/v1/rooms",
    headers = {'authorization': 'Bearer 73e7ad6ba64e004eceab7e54597f3f7a6081bfbaf74b09443d7dd84b282a6798'}
    r = requests.get(url, headers=headers)
    if r.status_code == 200:
        return HttpResponse('Yay, it worked')
    return HttpResponse('Could not save data')

def delete_lc_room_view(self, request, rm):
    url = ("https://api.daily.co/v1/rooms/"+rm),
    headers = {'authorization': 'Bearer 73e7ad6ba64e004eceab7e54597f3f7a6081bfbaf74b09443d7dd84b282a6798'}
    r = requests.delete(url, headers=headers)
    if r.status_code == 200:
        return HttpResponse('Yay, it worked')
    return HttpResponse('Could not save data')