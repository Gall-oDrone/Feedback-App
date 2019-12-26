from rest_framework.routers import DefaultRouter
from django.conf.urls import url, include
from django.urls import path, re_path
from livechatApi.views import (
    LCRequestListView, 
    LCRequestDetailView, 
    LCRequestCreateView,
    LCRequestDeleteView,
)

router = DefaultRouter()
urlpatterns = [
    path('lcrequest', LCRequestListView.as_view()),
    path('lcrequest/create/', LCRequestCreateView.as_view()),
    path('lcrequest/<pk>', LCRequestDetailView.as_view()),
    path('lcrequest/<pk>/delete/', LCRequestDeleteView.as_view()),
 ]