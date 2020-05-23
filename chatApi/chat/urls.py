from django.urls import path, re_path

from ..views import (
    ChatListView,
    ChatDetailView,
    ChatParticipantsView,
    ChatStatusView,
    ChatCreateView,
    ChatUpdateView,
    ChatDeleteView,
    VideoChatDetailView,
    CallerCreateView,
    CalleeCreateView
)

app_name = 'chatApi'

urlpatterns = [
    path('', ChatListView.as_view()),
    path('create/', ChatCreateView.as_view()),
    path('detail/<pk>', ChatDetailView.as_view()),
    path('detail/participants/<pk>', ChatParticipantsView.as_view()),
    path('detail/status/<pk>', ChatStatusView.as_view()),
    path('<pk>/update/', ChatUpdateView.as_view()),
    path('<pk>/delete/', ChatDeleteView.as_view()),
    path('video-chat/<pk>', VideoChatDetailView.as_view()),
    path('video-chat<pk>/update/', VideoChatDetailView.as_view()),
    path('video-chat<pk>/caller/', CallerCreateView.as_view()),
    path('video-chat<pk>/callee/', CalleeCreateView.as_view()),
]
