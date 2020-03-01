from rest_framework.routers import DefaultRouter
from django.urls import path, include, re_path
from surveyApi.views import (
    GradedSurveyDetailView, 
    GradedSurveyListView, 
    GradedSurveyCreateView,
    ProfileGradedSurveyListView, 
    ProfileGradedSurveyDetailView,
    )

router = DefaultRouter()
# router.register(r'', SurveyViewSet, base_name='assignments')

urlpatterns = [
    path('', GradedSurveyListView.as_view()),
    path('create/', GradedSurveyCreateView.as_view()),
    path('<articleID>/', GradedSurveyDetailView.as_view()),
    # path('<pk>/update/', ArticleUpdateView.as_view()),
    # path('<pk>/delete/', ArticleDeleteView.as_view()),
    path('profile/list/<username>/', ProfileGradedSurveyListView.as_view()),
    path('profile/detail/<username>/<pk>/', ProfileGradedSurveyDetailView.as_view()),

    # path('<pk>/create-likes/', CreateLike.as_view()),
    # path('<pk>/likes/', LikeListView.as_view()),
    # path('<pk>/likes/<user_id>/', LikeDetailView.as_view()),
    # # re_path(r'^<pk>/likes/(?P<username>\w+)$/', LikeDetailView.as_view()),
    # path('<pk>/rating/', CreateRating.as_view()),
    # path('<pk>/comments/', CommentListView.as_view()),
    # path('<pk>/create-comment/', CreateComment.as_view()),
    # path('<pk>/update-comment/<id>/', UpdateComment.as_view()),
    # path('<pk>/comments/<id>/', CommentDetailView.as_view()),
    # #path('<pk>/video/', VideoViewSet.as_view()),
    # path('create/images/', ImageCreateView.as_view),
    # path('destroy/images/', ImageDestroyView.as_view),
    # url(r'^video/', include(router.urls)),
    # url(r'^comment/', include(router.urls))

 ]