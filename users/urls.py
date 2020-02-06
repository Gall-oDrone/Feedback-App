from rest_framework.routers import DefaultRouter
from django.conf.urls import url, include
from django.urls import path, re_path
from .views import UserViewSet

from .views import (
    UserFriendRequestsView,
    UserLCRequestsView,
    UserProfileView,
    UserProfileInfoView,
    UserViewSet
	)

router = DefaultRouter()
# router.register(r'', UserViewSet, base_name='users')
# urlpatterns = router.urls

urlpatterns = [
    # url(r'^$', users_list, name='list'),
    # url(r'^friend-request/send/(?P<id>[\w-]+)/$', send_friend_request),
    # url(r'^friend-request/cancel/(?P<id>[\w-]+)/$', cancel_friend_request),
    # url(r'^friend-request/accept/(?P<id>[\w-]+)/$', accept_friend_request),
    # url(r'^friend-request/delete/(?P<id>[\w-]+)/$', delete_friend_request),
    # path('users/', UserViewSet.as_view({'get': 'list'})),
    path('lcrequest/<pk>', UserLCRequestsView.as_view()),
    # path('friendrequest/?P<slug>[\w-]+)/$', UserFriendRequestsView.as_view()),
    path('profile/account/user/info/<username>', UserProfileInfoView.as_view()),
    path('profile/account/info/<userid>', UserProfileView.as_view()),
    path('profile/account/user/info/update/<username>', UserProfileInfoView.as_view()),
]
