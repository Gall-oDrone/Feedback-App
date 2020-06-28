from rest_framework.routers import DefaultRouter
from django.conf.urls import url, include
from django.urls import path, re_path
from sessionsApi.views import (
    SessionCreateView,
    SessionDeleteView,
    SessionListView,
    SessionDetailView,
    SessionUserListView,
    SessionListDetailView,
    SessionMeetingRoomView
)

router = DefaultRouter()
urlpatterns = [
    path('list/', SessionListView.as_view()),
    path('detail/<session_id>', SessionDetailView.as_view()),
    path('list/<username>/', SessionUserListView.as_view()),
    path('detail/<session_id>/<user_id>', SessionListDetailView.as_view()),
    # path('session/detail/<session_id>/<user_id>', SessionListDetailView.as_view()),
    path('session/create/', SessionCreateView.as_view()),
    path('session/<pk>/delete/', SessionDeleteView.as_view()),
    path('room/<session_id>/<user_id>/', SessionMeetingRoomView.as_view()),
 ]