from rest_framework.routers import DefaultRouter
from django.conf.urls import url, include
from django.urls import path, re_path
from notificationsApi.views import (
    NotificationCreateView,
    NotificationListView,
    NotificationDetailView,
    NotificationUpdateView,
    NotificationDeleteView,
    ProfileNotificationListView,
    ProfileNotificationDetailView,
    ProfileNotificationListUpdateView,
    ReactInfiniteView
)

router = DefaultRouter()
urlpatterns = [
    path('create/', NotificationCreateView.as_view()),
    path('list/', NotificationListView.as_view()),
    path('detail/profile/', NotificationDetailView.as_view()),
    path('<pk>/update/', NotificationUpdateView.as_view()),
    path('<pk>/delete/', NotificationDeleteView.as_view()),
    path('list/<username>/', ProfileNotificationListView.as_view()),
    path('list/scroller/<username>/', ReactInfiniteView.as_view()),
    path('list/update/<username>/', ProfileNotificationListUpdateView.as_view()),
    path('<pk>/detail/<username>/', ProfileNotificationDetailView.as_view()),

 ]