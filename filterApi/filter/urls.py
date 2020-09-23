from rest_framework.routers import DefaultRouter
from django.conf.urls import url, include
from django.urls import path, re_path
from filterApi.views import (
    ReactFilterView,
    showMultipleModels
)

router = DefaultRouter()
urlpatterns = [
    path('inquiry/', ReactFilterView.as_view()),
    path('featured_list/', showMultipleModels),
    # path('list/', IncentiveListView.as_view()),
    # path('detail/profile/', IncentiveDetailView.as_view()),
    # path('userlist/<username>', IncentiveUserListView.as_view()),
    # path('<pk>/delete/', IncentiveDeleteView.as_view()),
    # path('create/amigc/', IncentiveCreateView.as_view())
 ]