from rest_framework.routers import DefaultRouter
from django.conf.urls import url, include
from django.urls import path, re_path
from livechatApi.views import (
    LCRequestListView,
    LCRequestListDetailView,
    LCRequestUserListView,
    LCRequestReceivedUserListView,
    LCRequestBookedUserListView,
    LCRequestDetailView, 
    LCRequestCreateView,
    LCRequestDeleteView,
    LCRoomCreateView,
    LCRoomListView,
    LCRoomListDetailView,
    LCRoomDetailView,
    LCMeetingReviewCreateView,
    LCMeetingReviewlistView,
)

router = DefaultRouter()
urlpatterns = [
    path('lcrequest', LCRequestListView.as_view()),
    path('lcrequest/listdetail/<article_id>/<user_id>', LCRequestListDetailView.as_view()),
    path('lcrequest/userlist/<username>', LCRequestUserListView.as_view()),
    path('lcrequest/received/userlist/<username>', LCRequestReceivedUserListView.as_view()),
    path('lcrequest/booked/userlist/<username>', LCRequestBookedUserListView.as_view()),
    path('lcrequest/create/', LCRequestCreateView.as_view()),
    path('lcrequest/<article_id>/<user_id>', LCRequestDetailView.as_view()),
    path('lcrequest/<pk>/delete/', LCRequestDeleteView.as_view()),
    path('lcrequest/lcroom/', LCRoomListView.as_view()),
    path('lcrequest/lcroom/create/', LCRoomCreateView.as_view()),

    path('lcrequest/lcroom/review/create/', LCMeetingReviewCreateView.as_view()),
    path('lcrequest/lcroom/review/list/', LCMeetingReviewlistView.as_view()),
    path('lcrequest/lcroom/detail/<roomName>', LCRoomDetailView.as_view()),
    path('lcrequest/lcroom/listdetail/<article_id>', LCRoomListDetailView.as_view()),
 ]