from rest_framework.routers import DefaultRouter
from assignmentApi.views import GradedAssignmentListView, GradedAssignmentCreateView
from django.urls import path

router = DefaultRouter()

urlpatterns = [
    path('', GradedAssignmentListView.as_view()),
    path('create/', GradedAssignmentCreateView.as_view())

]