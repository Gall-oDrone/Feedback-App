
from django.conf import settings
from django.contrib.auth import get_user_model
from django.http import HttpResponseRedirect, Http404, JsonResponse, HttpResponse
from django.shortcuts import render, get_object_or_404
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.response import Response
from rest_framework import viewsets, permissions, generics
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_201_CREATED, HTTP_400_BAD_REQUEST
from rest_framework.parsers import MultiPartParser, FileUploadParser, FormParser, JSONParser
import json
from .models import User, Profile, Universities, FriendRequest, MeetingRequest, ProfileInfo, Degree, Bachelor, Master, Doctorate, Course
from .serializers import (
    UserSerializer, 
    UserProfileLCRequestSerializer, 
    ProfileSerializer, 
    ProfileInfoSerializer, 
    ProfilePageSerializer,
    ProfileInfoListSerializer,
    FetchDataSerializer,
    testSerializer,
    testSerializer2,
    degreeSerializer,
    UniSerializer
)

from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
    DestroyAPIView,
    RetrieveUpdateDestroyAPIView
)
import requests
import json


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    print("USER QS")
    print(queryset)

    def get(self, request, *args, **kwargs):
        print("current_user QS")
        print(current_user.id)
        return Response({'userID': request.user.id}, status=HTTP_200_OK)
    # current_user = request.user

class UserFriendRequestsView(viewsets.ModelViewSet):
    User = get_user_model()

    def users_list(request):
        users = Profile.objects.exclude(user=request.user)
        return request

    def send_friend_request(request, id):
        if request.user.is_authenticated():
            user = get_object_or_404(User, id=id)
            frequest, created = FriendRequest.objects.get_or_create(
                from_user=request.user,
                to_user=user)
            return HttpResponseRedirect('/users')

    def cancel_friend_request(request, id):
        if request.user.is_authenticated():
            user = get_object_or_404(User, id=id)
            frequest = FriendRequest.objects.filter(
                from_user=request.user,
                to_user=user).first()
            frequest.delete()
            return HttpResponseRedirect('/users')

    def accept_friend_request(request, id):
        from_user = get_object_or_404(User, id=id)
        frequest = FriendRequest.objects.filter(from_user=from_user, to_user=request.user).first()
        user1 = frequest.to_user
        user2 = from_user
        user1.profile.friends.add(user2.profile)
        user2.profile.friends.add(user1.profile)
        frequest.delete()
        return HttpResponseRedirect('/users/{}'.format(request.user.profile.slug))

    def delete_friend_request(request, id):
        from_user = get_object_or_404(User, id=id)
        frequest = FriendRequest.objects.filter(from_user=from_user, to_user=request.user).first()
        frequest.delete()
        return HttpResponseRedirect('/users/{}'.format(request.user.profile.slug))

class UserLCRequestsView(ListAPIView):
    queryset = MeetingRequest.objects.all()
    serializer_class = UserProfileLCRequestSerializer
    permission_classes = (permissions.IsAuthenticated,)
    # lookup_field = 'slug'
    def users_list(request):
        users = Profile.objects.exclude(user=request.user)
        return request

    def get_request_meeting_list(self, request):
        try:
            print("UserLCRequestsView")
            user = self.kwargs.get('pk')
            username = User.objects.get(username=user)
            print("username")
            print(username)
            meeting_list = MeetingRequest.objects.filter(to_user=username)
            print("meeting_list")
            print(meeting_list)
            return meeting_list
        except ObjectDoesNotExist:
            raise Http404("You do not have an active order")
            return Response({"message": "You do not have an active order"}, status=HTTP_400_BAD_REQUEST)

    def send_live_chat_request(request, id):
        if request.user.is_authenticated():
            user = get_object_or_404(User, id=id)
            frequest, created = LiveChatRequest.objects.get_or_create(
                from_user=request.user,
                to_user=user)
            return HttpResponseRedirect('/users')

    def cancel_live_chat_request(request, id):
        if request.user.is_authenticated():
            user = get_object_or_404(User, id=id)
            frequest = LiveChatRequest.objects.filter(
                from_user=request.user,
                to_user=user).first()
            frequest.delete()
            return HttpResponseRedirect('/users')

    def accept_live_chat_request(request, id):
        from_user = get_object_or_404(User, id=id)
        frequest = LiveChatRequest.objects.filter(from_user=from_user, to_user=request.user).first()
        user1 = frequest.to_user
        user2 = from_user
        user1.profile.friends.add(user2.profile)
        user2.profile.friends.add(user1.profile)
        frequest.delete()
        return HttpResponseRedirect('/users/{}'.format(request.user.profile.slug))

    def delete_live_chat_request(request, id):
        from_user = get_object_or_404(User, id=id)
        frequest = LiveChatRequest.objects.filter(from_user=from_user, to_user=request.user).first()
        frequest.delete()
        return HttpResponseRedirect('/users/{}'.format(request.user.profile.slug))

class UserProfileView(RetrieveUpdateDestroyAPIView):
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = ProfileSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self, *args, **kwargs):
        try:
            print("UserProfileView")
            uid = self.kwargs.get('userid')
            print("AHAHAHA 1", uid)
            userid = User.objects.get(id=uid)
            print("AHAHAHA 2", userid)
            user_profile = Profile.objects.get(user=userid)
            print("AHAHAHA 3", user_profile)
            # ProfileSerializer(user_profile)
            return user_profile
        except ObjectDoesNotExist:
            raise Http404("You do not have an active order")
            return Response({"message": "You do not have an active order"}, status=HTTP_400_BAD_REQUEST)
    
    def update(self, request, *args, **kwargs):
        request_data = json.loads((self.request.data["data"]))
        request_files = (self.request.FILES)
        print(request_data)
        print(request_files)
        serializer = ProfileSerializer(data=request_data)
        serializer.is_valid()
        print("On update method UserProfileView")
        update_profile_info = serializer.update_profile_info(request_data, request_files)
        if update_profile_info:
            return Response(status=HTTP_201_CREATED)
        return Response(status=HTTP_400_BAD_REQUEST)

    def profile_view(self, request, slug):
        serializer = ProfileSerializer(data=request.data)
        serializer.is_valid()
        p = Profile.objects.filter(slug=slug).first()
        u = p.user
        sent_friend_requests = FriendRequest.objects.filter(from_user=p.user)
        rec_friend_requests = FriendRequest.objects.filter(to_user=p.user)

        friends = p.friends.all()

        # is this user our friend
        button_status = 'none'
        if p not in request.user.profile.friends.all():
            button_status = 'not_friend'

            # if we have sent him a friend request
            if len(FriendRequest.objects.filter(
                from_user=request.user).filter(to_user=p.user)) == 1:
                    button_status = 'friend_request_sent'

        return request
class UserMeetingInfoView(RetrieveAPIView):
    queryset = ProfileInfo.objects.all()
    serializer_class = ProfileInfoSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self, *args, **kwargs):
        try:
            print("UserProfileInfoView")
            username = self.kwargs.get('username')
            user = User.objects.get(username=username)
            # articleId = Article.objects.get(title=article).id
            userInfo = ProfileInfo.objects.get(profile_username=user.id)
            ProfileInfoSerializer(userInfo)
            return userInfo
        except ObjectDoesNotExist:
            raise Http404("You do not have an active order")
            return Response({"message": "You do not have an active order"}, status=HTTP_400_BAD_REQUEST)

class ProfilePageView(RetrieveAPIView):
    queryset = ProfileInfo.objects.all()
    serializer_class = ProfileInfoSerializer
    permission_classes = (permissions.AllowAny,)

    def get_object(self, *args, **kwargs):
        try:
            print("UserProfileInfoView")
            username = self.kwargs.get('username')
            user = User.objects.get(username=username)
            userInfo = ProfileInfo.objects.get(profile_username=user.id)
            ProfileInfoSerializer(userInfo)
            return userInfo
        except ObjectDoesNotExist:
            raise Http404("You do not have an active order")
            return Response({"message": "You do not have an active order"}, status=HTTP_400_BAD_REQUEST)
                
class UserProfileInfoView(RetrieveUpdateDestroyAPIView):
    queryset = ProfileInfo.objects.all()
    serializer_class = ProfileInfoSerializer
    permission_classes = (permissions.IsAuthenticated,)
    if(len(Degree.objects.all()) == 0):
        for d in Degree.DEGREES:
            degree = Degree.objects.create(degree=d[0])

    def get_object(self, *args, **kwargs):
        try:
            print("UserProfileInfoView")
            username = self.kwargs.get('username')
            user = User.objects.get(username=username)
            # articleId = Article.objects.get(title=article).id
            userInfo = ProfileInfo.objects.get(profile_username=user.id)
            ProfileInfoSerializer(userInfo)
            return userInfo
        except ObjectDoesNotExist:
            raise Http404("You do not have an active order")
            return Response({"message": "You do not have an active order"}, status=HTTP_400_BAD_REQUEST)
    
    def udpate(self, request, *args, **kwargs):
        serializer = ProfileInfoSerializer(data=request.data)
        serializer.is_valid()
        print("On update method")
        print(self.request.data)
        update_account_info = serializer.update_account_info(request)
        if update_account_info:
            return Response(status=HTTP_201_CREATED)
        return Response(status=HTTP_400_BAD_REQUEST)

class Degrees_and_CoursesView(generics.ListAPIView):
    # queryset = ProfileInfo.objects.all()
    serializer_class = (testSerializer)
    permission_classes = (permissions.AllowAny,)
    if(len(Bachelor.objects.all()) == 0):
        for b in Bachelor.BACHELOR_DEGREES:
            bachelor = Bachelor.objects.create(bachelor_degree=b[0])
    if(len(Master.objects.all()) == 0):
        for m in Master.MASTER_DEGREES:
            master = Master.objects.create(master_degree=m[0])
    if(len(Doctorate.objects.all()) == 0):
        for p in Doctorate.PHD_DEGREES:
            pHD = Doctorate.objects.create(pHd_degree=p[0])
    if(len(Course.objects.all()) == 0):
        for c in Course.COURSES:
            course = Course.objects.create(course=c[0])

    def get_queryset(self):
        print("Lacking")
        # qs1 = article_filter(self.request)
        qs = {"data"}
        # qs = {"degree": Degree.DEGREES}
        # qs = {"degree": Degree.DEGREES, "bachelor": Bachelor.BACHELOR_DEGREES, "master": Master.MASTER_DEGREES,
        #     "pHD": Doctorate.PHD_DEGREES, "course": Course.COURSES}
        # qs = {{"degree": Degree.DEGREES}, {"bachelor": Bachelor.BACHELOR_DEGREES}, {"master": Master.MASTER_DEGREES},
        #     {"pHD": Doctorate.PHD_DEGREES}, {"course": Course.COURSES}}
        # qs = [Degree.DEGREES,  Bachelor.BACHELOR_DEGREES, Master.MASTER_DEGREES,
        #      Doctorate.PHD_DEGREES, Course.COURSES]
        print(qs)
        return qs

    # def get_object(self, *args, **kwargs):
    #     try:
    #         obj = {Degree.DEGREES}
    #         return obj
    #     except ObjectDoesNotExist:
    #         raise Http404("You do not have an active order")
    #         return Response({"message": "You do not have an active order"}, status=HTTP_400_BAD_REQUEST)

# BachelorView,
# MasterView,
# DoctorateView,
# CourseView



# class UserProfileInfoHeaderView(RetrieveAPIView):
#     queryset = ProfileInfo.objects.all()
#     serializer_class = ProfileInfoSerializer
#     permission_classes = (permissions.IsAuthenticated,)

#     def get_object(self, *args, **kwargs):
#         try:
#             print("UserProfileInfoHeaderView")
#             username = self.kwargs.get('username')
#             user = User.objects.get(username=username)
#             # articleId = Article.objects.get(title=article).id
#             userInfo = ProfileInfo.objects.get(profile_username=user.id)
#             ProfileInfoSerializer(userInfo)
#             return userInfo.profile_avatar
#         except ObjectDoesNotExist:
#             raise Http404("You do not have an active order")
#             return Response({"message": "You do not have an active order"}, status=HTTP_400_BAD_REQUEST)

class UniView(generics.ListAPIView):
    serializer_class = UniSerializer
    permission_classes = (permissions.AllowAny,)
    queryset = Universities.objects.all()
    print("Universities QS")
    print(queryset)

class DegView(generics.ListAPIView):
    serializer_class = UniSerializer
    permission_classes = (permissions.AllowAny,)
    queryset = Universities.objects.all()
    print("Universities QS")
    print(queryset)

    # def get(self, request, *args, **kwargs):
    #     uni = Universities()
    #     obj = Universities.objects.get(id= "1")
    #     print("OBJ", obj)
    #     return Response({"university": obj}, status=HTTP_200_OK)