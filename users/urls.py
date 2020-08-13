from rest_framework.routers import DefaultRouter
from django.conf.urls import url, include
from django.urls import path, re_path
from .views import UserViewSet

from .views import (
    UserFriendRequestsView,
    UserLCRequestsView,
    UserProfileView,
    UserProfileInfoView,
    ProfilePageView,
    UserMeetingInfoView,
    UserViewSet,
    Degrees_and_CoursesView,
    UniView,
    DegView,
    ActivateView,
    GoogleLoginView,
    FacebookLogin,
    GoogleLogin,
    google_callback,
    EmailTemplateView,
    ResendConfirmationView,
    UserFollowingViewSet
    # BachelorView,
    # MasterView,
    # DoctorateView,
    # CourseView
	)

from .serializers import send_verification_email
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
    path('accounts/login/', UserProfileInfoView.as_view()),
    path('profile/account/user/info/<username>', UserProfileInfoView.as_view()),
    path('profile/account/info/<userid>', UserProfileView.as_view()),
    path('profile/info/<username>', UserMeetingInfoView.as_view()),
    path('profile-page/<username>', ProfilePageView.as_view()),
    path('profile/account/user/info/update/<user>', UserProfileInfoView.as_view()),
    path('courses-degrees/', Degrees_and_CoursesView.as_view()),
    path('universities/', UniView.as_view()),
    path('deg/', DegView.as_view()),
    path('activate/<str:uid>/<str:token>', ActivateView.as_view(), name='activate'),
    path('auth/google/', GoogleLogin.as_view(), name='google_login'),
    path('auth/facebook/', FacebookLogin.as_view(), name='facebook_login'),
    path('auth/google/callback/', google_callback, name="google_callback"),
    path('email_template/<str:uidb64>/<str:token>', ActivateView.as_view(), name="email_account_confirmation"),
    path('auth/resend/confirmation/', ResendConfirmationView.as_view(), name="resend_confirmation_email"),
    path('following/<username>', UserFollowingViewSet.as_view(), name="user-following")
    # path('auth/google/url/', google_views.oauth2_login)
    # path('bachelor-list/', BachelorView.as_view()),
    # path('master-list/', MasterView.as_view()),
    # path('doctorate-list/', DoctorateView.as_view()),
    # path('course-list/', CourseView.as_view()),
]
