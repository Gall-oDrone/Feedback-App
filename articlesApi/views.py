# from rest_framework import viewsets
from django.db.models import Count, Q, Sum
from django.shortcuts import get_object_or_404, redirect, reverse
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FileUploadParser, FormParser
from rest_framework.status import(
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST
)
from rest_framework import permissions
from articlesApi.models import Article, Tag, Tagging, Category, ArticleView, Like, Rating, Comment, Video
from users.models import User
from .serializers import ArticleSerializer, ArticleFeatureSerializer, VideoFormSerializer, CommentSerializer, LikeSerializer, LikeListSerializer, RatingSerializer, CommentListSerializer
from analytics.models import View
from django.http import Http404
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
    DestroyAPIView,
    UpdateAPIView,
    RetrieveUpdateDestroyAPIView
)


class ArticleFeatureView():
    # queryset = Article.objects.all()
    serializer_class = ArticleFeatureSerializer
    queryset = Article.objects.all()
    permission_classes = (permissions.AllowAny,)

    def index(request):
        queryset = Article.objects.all()
        featured = Article.objects.filter(featured=True)
        latest = Post.objects.order_by("-timestamp")[0:3]

        context = {
            "object_list": featured,
            "latest": latest
        }
        return


class ArticleListView(ListAPIView):
    # model = Article
    queryset = Article.objects.all()
    print("queryset List view")
    print(queryset)
    serializer_class = ArticleSerializer
    permission_classes = (permissions.AllowAny,)

    def category_count():
        queryset = Article \
            .objects \
            .values("categories__title") \
            .annotate(Count("categories__title"))
        return queryset

    def tags_count():
        queryset = Article \
            .objects \
            .values("tags__tag") \
            .annotate(Count("tags__tag"))
        return queryset

    def likes_count():
        queryset = Article \
            .objects \
            .values("tags__tag") \
            .annotate(Count("tags__tag"))
        return queryset

    def stars_count():
        queryset = Article \
            .objects \
            .values("tags__tag") \
            .annotate(Count("tags__tag"))
        return queryset

    def showvideo(request):
        lastvideo = Video.objects.last()
        videofile = lastvideo.videofile
        form = VideoFormSerializer(request.POST or None, request.FILES or None)
        if form.is_valid():
            form.save()
        context = {'videofile': videofile,
                   'form': form
                   }
        return render(request, 'Blog/videos.html', context)

    def get_author(user):
        qs = Author.objects.filter(user=user)
        if qs.exists():
            return qs[0]
        return None


class ArticleDetailView(RetrieveAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = (permissions.AllowAny,)


class ArticleCreateView(CreateAPIView):
    queryset = Article.objects.all()
    print("queryset Create view")
    print(queryset)
    serializer_class = ArticleSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        print("request from ArticleCreateView")
        print(request.data)
        serializer = ArticleSerializer(data=request.data)
        serializer.is_valid()
        print(serializer.is_valid())
        create_article = serializer.create(request)
        if create_article:
            return Response(status=HTTP_201_CREATED)
        return Response(status=HTTP_400_BAD_REQUEST)

    # def post(self, request):
    #     print(request.data)
    #     serializer = ArticleSerializer(data=request.data)
    #     serializer.is_valid()
    #     creating_Article = serializer.create(request)
    #     if creating_Article:
    #         return Response(status=HTTP_201_CREATED)
    #     return Response(status=HTTP_400_BAD_REQUEST)


class ArticleDeleteView(DestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = (permissions.IsAuthenticated,)


class ArticleUpdateView(UpdateAPIView):
    queryset = Article.objects.all()
    print("queryset from ArticleUpdateView")
    print(queryset)
    serializer_class = ArticleSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def update_likes_count(self, request):
        print("request from ArticleUpdateView")
        print(request.data)
        Like.objects.filter(article_id=self.request.data.get("article_id")).filter(
            user_id=self.request.data.get("user_id")).values("liked")[0]["liked"]
        Like.objects.filter(article_id=self.request.data.get(
            "article")).filter(liked=True).Count()
        serializer = ArticleSerializer(data=request.data)
        serializer.is_valid()
        print(serializer.is_valid())
        update_article = serializer.update_likes(request)
        if update_article:
            return Response(status=HTTP_201_CREATED)
        return Response(status=HTTP_400_BAD_REQUEST)
    # def index(request):
    # if request.method == "POST":
    #     article = request.POST['article']
    #     tag = request.POST['tag']
    #     articles = Article.objects.create(post=article)
    #     tags, created = Tag.objects.get_or_create(tag=tag)
    #     tp = Tagging(posts=articles, taggings=tags)
    #     tp.save()
    #     return redirect('index')
    # return render(request, 'index.html')

class LikeListView(RetrieveAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeListSerializer
    permission_classes = (permissions.AllowAny,)

    def get_object(self):
        try:
            articleID = self.kwargs.get('pk')
            like = Like.objects.filter(article_id=articleID)
            return like
        except ObjectDoesNotExist:
            raise Http404("You do not have an active order")
            return Response({"message": "You do not have an active order"}, status=HTTP_400_BAD_REQUEST)

class LikeDetailView(RetrieveUpdateDestroyAPIView):
    # queryset = Like.objects.all()
    serializer_class = LikeSerializer
    permission_classes = (permissions.AllowAny,)
    lookup_field = 'user'
    lookup_url_kwarg = "user_id"

    def get_queryset(self):
        userId = self.kwargs.get(self.lookup_url_kwarg)
        articleId = self.kwargs.get("pk")
        # userId = User.objects.get(username=username).id
        userId = User.objects.get(id=userId)
        print("user EHRENO")
        print(self.lookup_url_kwarg)
        print(userId)
        queryset = Like.objects.filter(user_id=userId).filter(article_id=articleId)
        print(queryset.values())
        return queryset
    
    def update(self, request, *args, **kwargs):
        serializer = LikeSerializer(data=request.data)
        serializer.is_valid()
        print("On update method")
        print(self.request.data)
        print(self.request.data.get("article"))
        Like.objects.filter(user_id=self.request.data.get("user_id")).filter(article_id=self.request.data.get("article")).update(liked=self.request.data.get("liked"))
        Article.objects.update_or_create(
            id=self.request.data.get("article"),
            defaults={"likes_count": Like.objects.filter(
            article_id=self.request.data.get("article")).filter(liked=True).count()}
            )
        return Response(serializer.data)


class CreateLike(CreateAPIView):
    queryset = Like.objects.all()
    queryset2 = Article.objects.all().values()
    print("UpdateLike queryset")
    print(queryset)
    print(queryset2)
    print(Like.objects.values())
    serializer_class = LikeSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def create(self, request, *args, **kwargs):
        # print("request from UpdateLike")
        # print(request.data)
        # like = Like()
        # like.user = self.request.user
        # print("like.user")
        # print(like.user)
        # print(like.user_id)
        # like.user = request.user
        # print("like.user")
        # print(like.user)
        serializer = LikeSerializer(data=request.data)
        serializer.is_valid()
        print("Valid Update Like Serializer?")
        print(serializer.is_valid())
        print(self.request.data.get("article"))
        print(Like.objects.filter(article_id=self.request.data.get(
            "article")).filter(liked=True).count())
        if Like.objects.filter(article_id=self.request.data.get("article")).filter(user_id=self.request.data.get("user_id")).exists():
            if Like.objects.filter(article_id=self.request.data.get("article")).filter(user_id=self.request.data.get("user_id")).values("liked")[0]["liked"] == self.request.data.get("liked"):
                print("A?: User tries to like the article when is already liked")
                return Response({"message": "Article author can't liked its own articles"}, status=HTTP_400_BAD_REQUEST)
            else:
                obj = Like.objects.update_or_create(
                    article_id=self.request.data.get("article"),
                    user_id=self.request.data.get("user_id"),
                    defaults={"liked": self.request.data.get("liked")})
                art = Article.objects.update_or_create(
                    id=self.request.data.get("article"),
                    defaults={"likes_count": Like.objects.filter(
                        article_id=self.request.data.get("article")).filter(liked=True).count()}
                )
                return Response(status=HTTP_201_CREATED)

        else:
            create_like = serializer.create_like(request)
            if create_like:
                art = Article.objects.update_or_create(
                    id=self.request.data.get("article"),
                    defaults={"likes_count": Like.objects.filter(
                        article_id=self.request.data.get("article")).filter(liked=True).count()}
                )
                return Response(status=HTTP_201_CREATED)
            print("B?")
            return Response({"message": "EHRENO"}, status=HTTP_400_BAD_REQUEST)


class CreateRating(CreateAPIView):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def create(self, request, *args, **kwargs):
        serializer = RatingSerializer(data=request.data)
        whg_val = [1, 2, 3, 4, 5]
        serializer.is_valid()
        if Rating.objects.filter(article_id=self.request.data.get("articleID")).filter(user__username=self.request.data.get("username")).exists():
            return Response(status=HTTP_400_BAD_REQUEST)
        else:
            create_rate = serializer.create_rate(request)
            if create_rate:
                wgh_mean = 0
                wgh_den = 0
                for val in whg_val:
                    wgh_mean += val * \
                        Rating.objects.filter(article_id=self.request.data.get(
                            "articleID")).filter(rate=val).count()
                    wgh_den += Rating.objects.filter(
                        article_id=self.request.data.get("articleID")).filter(rate=val).count()

                art = Article.objects.update_or_create(
                    id=self.request.data.get("articleID"),
                    defaults={"rating_count": Rating.objects.filter(
                        article_id=self.request.data.get("articleID"))
                        .aggregate(Sum('rate'))['rate__sum'],
                        "avg_rating": round(wgh_mean/wgh_den, 1)}
                )
                return Response(status=HTTP_201_CREATED)
            return Response(status=HTTP_400_BAD_REQUEST)

class CommentListView(RetrieveAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentListSerializer
    permission_classes = (permissions.AllowAny,)
    print("Comment Detial queryset")
    print(queryset.values())
    def get_object(self):
        try:
            print("Comment filter")
            articleID = self.kwargs.get('pk')
            comment = Comment.objects.filter(article_id=articleID)
            return comment
        except ObjectDoesNotExist:
            raise Http404("You do not have an active order")
            return Response({"message": "You do not have an active order"}, status=HTTP_400_BAD_REQUEST)

class CommentDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    print("queryset from CoomentDetail View")
    print(queryset)
    serializer_class = CommentSerializer
    lookup_url_kwarg = "id"
    permission_classes = (permissions.IsAuthenticated,)
    

class CreateComment(CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def create(self, request, *args, **kwargs):
        serializer = CommentSerializer(data=request.data)
        serializer.is_valid()
        create_comment = serializer.create_comment(request)
        if create_comment:
            print("data at create Commnet")
            print(self.request.data)
            art = Article.objects.update_or_create(
                id=self.request.data.get("articleID"),
                defaults={"comment_count": Comment.objects.filter(
                    article=self.request.data.get("articleID"))
                    .count(),
                }
            )
            return Response(status=HTTP_201_CREATED)
        return Response(status=HTTP_400_BAD_REQUEST)

class UpdateComment(UpdateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = (permissions.IsAuthenticated,)
    lookup_url_kwarg = "id"
    print("request from UpdateComment 1")

    def update_likes_count(self, request, *args, **kwargs):
        print("request from UpdateComment 2")
        print(request.data)
        serializer = CommentSerializer(data=request.data)
        serializer.is_valid()
        upload_comment = serializer.upload_comment(request)
        print(Comment.objects.filter(id=self.request.data.get("id")).filter(article_id=self.request.data.get("article_id")).filter(
            user_id=self.request.data.get("user_id")).values())
        Comment.objects.filter(id=self.request.data.get("id")).filter(article_id=self.request.data.get("article_id")).filter(
            user_id=self.request.data.get("user_id")).values("liked")[0]["liked"]
        Comment.objects.filter(article_id=self.request.data.get(
            "article")).filter(liked=True).Count()
        serializer = ArticleSerializer(data=request.data)
        serializer.is_valid()
        print(serializer.is_valid())
        update_article = serializer.update_likes(request)
        if update_article:
            return Response(status=HTTP_201_CREATED)
        return Response(status=HTTP_400_BAD_REQUEST)

# class VideoViewSet(viewsets.ModelViewSet):
class VideoViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.all()
    serializer_class = VideoFormSerializer
    parser_classes = (MultiPartParser, FileUploadParser, FormParser,)
    permission_classes = (permissions.IsAuthenticated,)

    def createVideo(self, request, *args, **kwargs):
        file_serializer = VideoFormSerializer(data=request.data)
        if file_serializer.is_valid():
          file_serializer.save()
          return Response(file_serializer.data, status=status.HTTP_201_CREATED)
        else:
          return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)