# from rest_framework import viewsets
from django.conf import settings
from django.dispatch import Signal, receiver
from django.db.models import Count, Q, Sum
from django.shortcuts import get_object_or_404, redirect, reverse
from django.core import serializers
from django.core.exceptions import ObjectDoesNotExist
from django.utils.dateparse import parse_datetime
from datetime import datetime, date
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FileUploadParser, FormParser
from rest_framework.status import(
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST
)
from rest_framework import permissions
from sessionsApi.models import Session, SessionMeeting, Topic, Experience, Months, Weekdays, Dates
from users.models import User, Profile, ProfileInfo
from notificationsApi.models import Notification
from .serializers import SessionSerializer, SessionUserListSerializer, SessionListDetailSerializer, SessionTest3Serializer, SessionMeetingRoomSerializer
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
import json


class SessionListView(ListAPIView):
    # model = Session
    queryset = Session.objects.order_by('-created').all()
    print("queryset List view")
    serializer_class = SessionSerializer
    permission_classes = (permissions.AllowAny,)

    def category_count():
        queryset = Session \
            .objects \
            .values("category__category") \
            .annotate(Count("category__category"))
        return queryset

    def get_sender(user):
        qs = Author.objects.filter(user=user)
        if qs.exists():
            return qs[0]
        return None


class SessionUserListView(ListAPIView):
    # queryset = SessionMeeting.objects.all()
    serializer_class = SessionUserListSerializer
    permission_classes = (permissions.AllowAny,)
    # print(queryset.values())

    def get_queryset(self):
        try:
            print("SessionUserListView")
            username = self.kwargs.get('username')
            userId = User.objects.get(username=username)
            print(userId)
            print(userId.id)
            sessionId = Session.objects.filter(user=userId.id).order_by('-pk')[0]
            sm = SessionMeeting.objects.filter(session=sessionId).order_by('date_to_appointment')
            # print("CORSO: ", ", hour: ", d3.hour, ", min: ", d3.minute, ", hour: ", d4.hour, d4.minute)
            return sm
        except ObjectDoesNotExist:
            raise Http404("You do not have an active order")
            return Response({"message": "You do not have an active order"}, status=HTTP_400_BAD_REQUEST)

class SessionListDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Session.objects.all()
    serializer_class = SessionListDetailSerializer
    permission_classes = (permissions.IsAuthenticated,)
    # print(queryset.values())

    def get_object(self, *args, **kwargs):
        try:
            print("SessionListDetailView")
            articleId = self.kwargs.get('articleID')
            # userId = self.kwargs.get('user_id')
            user = User.objects.get(username=userId)
            # articleId = Article.objects.get(title=article).id
            print(articleId, userId, user, user.id)
            meetingList = Session.objects.filter(user=user.id, session=articleId)
            SessionListDetailSerializer(meetingList)
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
        serializer = SessionListDetailSerializer(data=request.data)
        serializer.is_valid()
        print("On update method")
        # print(self.request.data)
        articleId = Article.objects.get(
            title=self.request.data.get("article")).id
        uId = []
        for i in self.request.data.get("recipient"):
            uId.append(User.objects.get(username=i).id)
        print(uId)
        room_participants = uId 
        room_participants.append(User.objects.get(username=self.request.data.get("sender")).id)
        target_request = Session.objects.filter(recipient=uId[0]).filter(article=articleId)
        date_to_appointment = self.request.data.get("date_to_appointment")
        if (self.request.data.get("scheduled") == True):
            Session.objects.filter(recipient=uId[0]).filter(article=articleId).update(
                scheduled=self.request.data.get("scheduled"))
            print("MMM")
            post_lc_room_view(self, request, room_participants, target_request, date_to_appointment, articleId)
            
            #NOTIFICATION
            userId = User.objects.get(username=request.data["sender"]).id
            print("userId after validation")
            print(userId)
            print(self.request.data.get("sender"))
            notify = Notification()
            notify.user = User.objects.get(id=userId)
            notify.actor = self.request.data.get("recipient")[0]
            notify.verb = "Sent"
            notify.action = "Scheduled Meeting"
            notify.target = "1"
            print("WHERE")
            notify.description = "Scheduled Meeting Accepted NTFN"
            notify.save()
            print("WHERE II")
            notification_counter = Profile.objects.update_or_create(
                user_id=userId,
                defaults={"notification_counter": MeetingSession.objects.filter(
                    to_user=userId)
                    .count(),
                }
            )

        elif (self.request.data.get("canceled") == True):
            Session.objects.filter(recipient=uId[0]).filter(
                article=articleId).update(canceled=self.request.data.get("canceled"))
            # delete_lc_room_view(self, request, self.request.data.get("room_name"))
            print("NOCHE DE RUBÍ")
            
            #NOTIFICATION
            userId = User.objects.get(username=request.data["sender"]).id
            print("userId after validation")
            print(userId)
            print(self.request.data.get("sender"))
            notify = Notification()
            notify.user = User.objects.get(id=userId)
            notify.actor = self.request.data.get("recipient")[0]
            notify.verb = "Sent"
            notify.action = "Scheduled Meeting"
            notify.target = "1"
            print("WHERE")
            notify.description = "Scheduled Meeting Canceled NTFN"
            notify.save()
            print("WHERE II")
            notification_counter = Profile.objects.update_or_create(
                user_id=userId,
                defaults={"notification_counter": MeetingSession.objects.filter(
                    to_user=userId)
                    .count(),
                }
            )

        else:
            print("M 5X")
            post_lc_room_view(self, request, room_participants, target_request, date_to_appointment)
        return Response(serializer.data)


class SessionDetailView(RetrieveAPIView):
    queryset = Session.objects.all()
    serializer_class = SessionSerializer
    permission_classes = (permissions.AllowAny,)

    def get_object(self, *args, **kwargs):
        try:
            articleId = self.kwargs.get('session_id')
            meetingList = Session.objects.get(id=articleId)
            # SessionSerializer(meetingList)
            return meetingList
        except ObjectDoesNotExist:
            raise Http404("You do not have an active order")
            return Response({"message": "You do not have an active order"}, status=HTTP_400_BAD_REQUEST)

class SessionCreateView(CreateAPIView):
    parser_classes = (MultiPartParser, FormParser)
    queryset = Session.objects.all()
    print("queryset Create view at Session")
    # Months.objects.get(id="13").delete()
    # Weekdays.objects.get(id="14").delete()
    serializer_class = SessionSerializer
    permission_classes = (permissions.IsAuthenticated,)
    if(len(Months.objects.all()) == 0):
        for m in Months.MONTHS:
            month = Months.objects.create(month=m[0])
    if(len(Weekdays.objects.all()) == 0):
        for w in Weekdays.WEEKDAYS:
            weekday = Weekdays.objects.create(weekday=w[0])

    def post(self, request, *args, **kwargs):
        print("request from SessionCreateView")
        print(request.data)
        request_data = json.loads((self.request.data["data"]))
        request_files = (self.request.FILES)
        serializer = SessionSerializer(data=request_data)
        serializer.is_valid()
        print(serializer.is_valid())
        create_session = serializer.create(request_data, request_files)
        if create_session:
            return Response(status=HTTP_201_CREATED)
        return Response(status=HTTP_400_BAD_REQUEST)


class SessionDeleteView(DestroyAPIView):
    queryset = Session.objects.all()
    serializer_class = SessionSerializer
    permission_classes = (permissions.IsAuthenticated,)

def post_lc_room_view(self, request, ts):
    url = "https://api.daily.co/v1/rooms"
    headers = {'content-type': "application/json",
               'authorization': "Bearer 73e7ad6ba64e004eceab7e54597f3f7a6081bfbaf74b09443d7dd84b282a6798"}
    r = requests.post(url, headers=headers)
    if r.status_code == 200:
        data = r.json()
        ts.update(room_name=data["name"])
    return HttpResponse('Could not save data')

class SessionMeetingRoomView(RetrieveUpdateDestroyAPIView):
    queryset = SessionMeeting.objects.all()
    serializer_class = SessionMeetingRoomSerializer
    permission_classes = (permissions.AllowAny,)

    def get_object(self, *args, **kwargs):
        try:
            print("SessionListDetailView")
            room_name = self.kwargs.get('session_id')
            userId = self.kwargs.get('user_id')
            user = User.objects.get(username=userId)
            session_m = SessionMeeting.objects.get(room_name=room_name)
            serializer = SessionMeetingRoomSerializer(data=session_m)
            print("TURE", serializer)
            return session_m
            if serializer.is_valid():
                return session_m
            else:
                return Response({"message": "There was an error with the validating session room serializer"}, status=HTTP_400_BAD_REQUEST)
        except ObjectDoesNotExist:
            raise Http404("You do not have an active order")
            return Response({"message": "You do not have an active order"}, status=HTTP_400_BAD_REQUEST)