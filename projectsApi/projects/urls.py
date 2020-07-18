from rest_framework.routers import DefaultRouter
from django.conf.urls import url, include
from django.urls import path, re_path
from projectsApi.views import (
    ProjectListView, 
    ProjectDetailView, 
    ProjectCreateView,
    ProjectDeleteView,
    ProjectUpdateView,
    ProfileProjectListView,
    ProfileProjectDetailView,
    LikeDetailView,
    LikeListView,
    UpvoteListView,
    UpvoteDetailView,
    CreateUpvote,
    CreateRating,
    CommentDetailView,
    CreateComment,
    UpdateComment,
    VideoViewSet,
    ImageCreateView,
    ImageDestroyView,
    CommentListView
)

# from projectsApi.views import ProjectViewSet

router = DefaultRouter()
router.register(r'', VideoViewSet, base_name='video')
# router.register(r'', CommentViewSet, base_name='comment')
# urlpatterns = router.urls
urlpatterns = [
    path('', ProjectListView.as_view()),
    path('create/', ProjectCreateView.as_view()),
    path('<pk>', ProjectDetailView.as_view()),
    path('<pk>/update/', ProjectUpdateView.as_view()),
    path('<pk>/delete/', ProjectDeleteView.as_view()),
    path('list/<username>/', ProfileProjectListView.as_view()),
    path('<pk>/detail/<username>/', ProfileProjectDetailView.as_view()),

    path('<pk>/create-upvotes/', CreateUpvote.as_view()),

    path('<pk>/likes/', LikeListView.as_view()),
    path('<pk>/likes/<user_id>/', LikeDetailView.as_view()),
    path('<pk>/upvotes/', UpvoteListView.as_view()),
    path('<pk>/upvotes/<user_id>/', UpvoteDetailView.as_view()),
    # re_path(r'^<pk>/upvotes/(?P<username>\w+)$/', UpvoteDetailView.as_view()),

    path('<pk>/rating/', CreateRating.as_view()),
    path('<pk>/comments/', CommentListView.as_view()),
    path('<pk>/create-comment/', CreateComment.as_view()),
    path('<pk>/update-comment/<id>/', UpdateComment.as_view()),
    path('<pk>/comment/<id>/', CommentDetailView.as_view()),
    #path('<pk>/video/', VideoViewSet.as_view()),
    path('create/images/', ImageCreateView.as_view),
    path('destroy/images/', ImageDestroyView.as_view),
    url(r'^video/', include(router.urls)),
    # url(r'^comment/', include(router.urls))

 ]