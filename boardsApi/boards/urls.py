from rest_framework.routers import DefaultRouter
from django.conf.urls import url, include
from django.urls import path, re_path
from boardsApi.views import (
    BoardListView, 
    BoardDetailView, 
    BoardCreateView,
    BoardDeleteView,
    BoardUpdateView,
    ProfileBoardListView,
    ProfileBoardDetailView,
    LikeListView,
    LikeDetailView,
    CreateLike,
    CreateRating,
    CommentDetailView,
    CreateComment,
    UpdateComment,
    VideoViewSet,
    ImageCreateView,
    ImageDestroyView,
    CommentListView,
    Categories_and_F_TView
)

# from boardsApi.views import BoardViewSet

router = DefaultRouter()
router.register(r'', VideoViewSet, base_name='video')
# router.register(r'', CommentViewSet, base_name='comment')
# urlpatterns = router.urls
urlpatterns = [
    path('', BoardListView.as_view()),
    path('create/', BoardCreateView.as_view()),
    path('<pk>', BoardDetailView.as_view()),
    path('<pk>/update/', BoardUpdateView.as_view()),
    path('<pk>/delete/', BoardDeleteView.as_view()),
    path('list/<username>/', ProfileBoardListView.as_view()),
    path('<pk>/detail/<username>/', ProfileBoardDetailView.as_view()),

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
    path('create/images/', ImageCreateView.as_view),
    path('destroy/images/', ImageDestroyView.as_view),
    path('categories-f_t/', Categories_and_F_TView.as_view()),
    url(r'^video/', include(router.urls)),
    # url(r'^comment/', include(router.urls))

 ]