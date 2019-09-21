# from rest_framework import viewsets

# class ArticleViewSet(viewsets.ModelViewSet):
#     serializer_class = ArticleSerializer
#     queryset = Article.objects.all()

from rest_framework import permissions
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
    DestroyAPIView,
    UpdateAPIView
)
from articles.models import Article, Feedback, Survey
from .serializers import ArticleSerializer, FeedbackSerializer, SurveySerializer


class ArticleListView(ListAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = (permissions.AllowAny, )


class ArticleDetailView(RetrieveAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = (permissions.AllowAny, )


class ArticleCreateView(CreateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = (permissions.IsAuthenticated, )


class ArticleUpdateView(UpdateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = (permissions.IsAuthenticated, )


class ArticleDeleteView(DestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = (permissions.IsAuthenticated, )

class SurveyListView(ListAPIView):
    queryset = Survey.objects.all()
    serializer_class = SurveySerializer
    permission_classes = (permissions.AllowAny, )

class FeedbackListView(ListAPIView):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    permission_classes = (permissions.AllowAny, )