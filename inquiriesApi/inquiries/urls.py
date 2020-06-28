from rest_framework.routers import DefaultRouter
from django.conf.urls import url, include
from django.urls import path, re_path
from inquiriesApi.views import (
    InquiryListView, 
    InquiryDetailView, 
    InquiryCreateView,
    InquiryDeleteView,
    InquiryUpdateView,
    ProfileInquiryListView,
    ProfileInquiryDetailView,
    LikeListView,
    LikeDetailView,
    CreateLike,
    CreateRating,
    CommentDetailView,
    CreateComment,
    UpdateComment,
    FileCreateView,
    FileDestroyView,
    CommentListView,
    SelectablesView
)

# from inquiriesApi.views import InquiryViewSet

router = DefaultRouter()
# router.register(r'', VideoViewSet, base_name='video')
# router.register(r'', CommentViewSet, base_name='comment')
# urlpatterns = router.urls
urlpatterns = [
    path('list/', InquiryListView.as_view()),
    path('create/', InquiryCreateView.as_view()),
    path('<pk>', InquiryDetailView.as_view()),
    path('<pk>/update/', InquiryUpdateView.as_view()),
    path('<pk>/delete/', InquiryDeleteView.as_view()),
    path('list/<username>/', ProfileInquiryListView.as_view()),
    path('<pk>/detail/<username>/', ProfileInquiryDetailView.as_view()),

    path('<pk>/create-likes/', CreateLike.as_view()),
    path('<pk>/likes/', LikeListView.as_view()),
    path('<pk>/likes/<user_id>/', LikeDetailView.as_view()),
    # re_path(r'^<pk>/likes/(?P<username>\w+)$/', LikeDetailView.as_view()),
    path('<pk>/rating/', CreateRating.as_view()),
    path('<pk>/comments/', CommentListView.as_view()),
    path('<pk>/create-comment/', CreateComment.as_view()),
    path('<pk>/update-comment/<id>/', UpdateComment.as_view()),
    path('<pk>/comment/<id>/', CommentDetailView.as_view()),
    #path('<pk>/video/', VideoViewSet.as_view()),
    path('create/images/', FileCreateView.as_view),
    path('destroy/images/', FileDestroyView.as_view),
    path('types-and-others/', SelectablesView.as_view()),
    url(r'^video/', include(router.urls)),
    # url(r'^comment/', include(router.urls))

 ]