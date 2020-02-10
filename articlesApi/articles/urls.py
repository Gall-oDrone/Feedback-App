from rest_framework.routers import DefaultRouter
from django.conf.urls import url, include
from django.urls import path, re_path
from articlesApi.views import (
    ArticleListView, 
    ArticleDetailView, 
    ArticleCreateView,
    ArticleDeleteView,
    ArticleUpdateView,
    ProfileArticleListView,
    ProfileArticleDetailView,
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
    CommentListView
)

# from articlesApi.views import ArticleViewSet

router = DefaultRouter()
router.register(r'', VideoViewSet, base_name='video')
# router.register(r'', CommentViewSet, base_name='comment')
# urlpatterns = router.urls
urlpatterns = [
    path('', ArticleListView.as_view()),
    path('create/', ArticleCreateView.as_view()),
    path('<pk>', ArticleDetailView.as_view()),
    path('<pk>/update/', ArticleUpdateView.as_view()),
    path('<pk>/delete/', ArticleDeleteView.as_view()),
    path('list/<username>/', ProfileArticleListView.as_view()),
    path('<pk>/detail/<username>/', ProfileArticleDetailView.as_view()),

    path('<pk>/create-likes/', CreateLike.as_view()),
    path('<pk>/likes/', LikeListView.as_view()),
    path('<pk>/likes/<user_id>/', LikeDetailView.as_view()),
    # re_path(r'^<pk>/likes/(?P<username>\w+)$/', LikeDetailView.as_view()),
    path('<pk>/rating/', CreateRating.as_view()),
    path('<pk>/comments/', CommentListView.as_view()),
    path('<pk>/create-comment/', CreateComment.as_view()),
    path('<pk>/update-comment/<id>/', UpdateComment.as_view()),
    path('<pk>/comments/<id>/', CommentDetailView.as_view()),
    #path('<pk>/video/', VideoViewSet.as_view()),
    path('create/images/', ImageCreateView.as_view),
    path('destroy/images/', ImageDestroyView.as_view),
    url(r'^video/', include(router.urls)),
    # url(r'^comment/', include(router.urls))

 ]