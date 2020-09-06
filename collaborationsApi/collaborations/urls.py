from rest_framework.routers import DefaultRouter
from django.conf.urls import url, include
from django.urls import path, re_path
from collaborationsApi.views import (
    CollaborationListView, 
    CollaborationDetailView, 
    CollaborationCreateView,
    CollaborationDeleteView,
    CollaborationUpdateView,
    # ProfileCollaborationListView,
    # ProfileCollaborationDetailView,
    # LikeListView,
    # LikeDetailView,
    # CreateLike,
    # CreateRating,
    # CommentDetailView,
    # CreateComment,
    # UpdateComment,
    # VideoViewSet,
    # ImageCreateView,
    # ImageDestroyView,
    # CommentListView,
    # Categories_and_F_TView
)

# from articlesApi.views import CollaborationViewSet

router = DefaultRouter()
# router.register(r'', VideoViewSet, base_name='video')
# router.register(r'', CommentViewSet, base_name='comment')
# urlpatterns = router.urls
urlpatterns = [
    path('', CollaborationListView.as_view()),
    path('create/', CollaborationCreateView.as_view()),
    path('<pk>', CollaborationDetailView.as_view()),
    path('<pk>/update/', CollaborationUpdateView.as_view()),
    path('<pk>/delete/', CollaborationDeleteView.as_view()),
    # path('list/<username>/', ProfileCollaborationListView.as_view()),
    # path('<pk>/detail/<username>/', ProfileCollaborationDetailView.as_view()),

    # path('<pk>/create-likes/', CreateLike.as_view()),
    # path('<pk>/likes/', LikeListView.as_view()),
    # path('<pk>/likes/<user_id>/', LikeDetailView.as_view()),
    # # re_path(r'^<pk>/likes/(?P<username>\w+)$/', LikeDetailView.as_view()),
    # path('<pk>/rating/', CreateRating.as_view()),
    # path('<pk>/comments/', CommentListView.as_view()),
    # path('<pk>/create-comment/', CreateComment.as_view()),
    # path('<pk>/update-comment/<id>/', UpdateComment.as_view()),
    # path('<pk>/comment/<id>/', CommentDetailView.as_view()),
    # #path('<pk>/video/', VideoViewSet.as_view()),
    # path('create/images/', ImageCreateView.as_view),
    # path('destroy/images/', ImageDestroyView.as_view),
    # path('categories-f_t/', Categories_and_F_TView.as_view()),
    # url(r'^video/', include(router.urls)),
    # url(r'^comment/', include(router.urls))

 ]