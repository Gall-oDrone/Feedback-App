# from rest_framework import viewsets
from django.conf import settings
from django.db.models import Count, Q, Sum
from django.shortcuts import get_object_or_404, redirect, reverse
from django.core.exceptions import ObjectDoesNotExist
from django.core.files.storage import FileSystemStorage
from rest_framework.response import Response
from rest_framework.decorators import parser_classes
from rest_framework.parsers import MultiPartParser, FileUploadParser, FormParser, JSONParser
from django.views.decorators.csrf import csrf_exempt
from rest_framework.status import(
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST
)
from rest_framework import permissions, generics
from boardsApi.models import Board, BoardDetail, Cards, CardTag, CardFiles, CardChecklist, CardComments, CardChecklistTask
from users.models import User
from .serializers import BoardSerializer, BoardDetailSerializer, BCardSerializer, BoardFeatureSerializer, CardSerializer, VideoFormSerializer, CommentSerializer, LikeSerializer, LikeListSerializer, RatingSerializer, CommentListSerializer, ImageFormSerializer, ProfileBoardListSerializer, Cat_FT_Serializer
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

import json


class BoardFeatureView():
    # queryset = Board.objects.all()
    serializer_class = BoardFeatureSerializer
    queryset = Board.objects.all()
    permission_classes = (permissions.AllowAny,)

    def index(request):
        queryset = Board.objects.all()
        featured = Board.objects.filter(featured=True)
        latest = Post.objects.order_by("-timestamp")[0:3]

        context = {
            "object_list": featured,
            "latest": latest
        }
        return


class BoardListView(ListAPIView):
    # model = Board
    queryset = Board.objects.all()
    print("queryset List view")
    # ##print(queryset)
    serializer_class = BoardSerializer
    permission_classes = (permissions.AllowAny,)
    # if(len(FeedbackTypes.objects.all()) == 0):
    #     for ft in FeedbackTypes.CHOICES:
    #         f_t = FeedbackTypes.objects.create(bachelor_degree=ft[0])

    # def category_count():
    #     queryset = Board \
    #         .objects \
    #         .values("categories__title") \
    #         .annotate(Count("categories__title"))
    #     return queryset

    # def tags_count():
    #     queryset = Board \
    #         .objects \
    #         .values("tags__tag") \
    #         .annotate(Count("tags__tag"))
    #     return queryset

    # def likes_count():
    #     queryset = Board \
    #         .objects \
    #         .values("tags__tag") \
    #         .annotate(Count("tags__tag"))
    #     return queryset

    # def stars_count():
    #     queryset = Board \
    #         .objects \
    #         .values("tags__tag") \
    #         .annotate(Count("tags__tag"))
    #     return queryset

    # def showvideo(request):
    #     lastvideo = Video.objects.last()
    #     videofile = lastvideo.videofile
    #     form = VideoFormSerializer(request.POST or None, request.FILES or None)
    #     if form.is_valid():
    #         form.save()
    #     context = {'videofile': videofile,
    #                'form': form
    #                }
    #     return render(request, 'Blog/videos.html', context)

    # def get_author(user):
    #     qs = Author.objects.filter(user=user)
    #     if qs.exists():
    #         return qs[0]
    #     return None


class BoardDetailView(RetrieveAPIView):
    queryset = Board.objects.all()
    serializer_class = BoardSerializer
    permission_classes = (permissions.IsAuthenticated,)


class BoardCreateView(CreateAPIView):
    # parser_classes = (MultiPartParser, FormParser)
    queryset = Board.objects.all()
    print("queryset Create view")
    ##print(queryset)
    serializer_class = BoardSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def create(self, request, *args, **kwargs):
        print("request from BoardCreateView")
        print("request", request, args)
        print("req.data", self.request.data)
        # print("req.Files",request.FILES)
        # request_data = json.loads((self.request.data["data"]))
        # request_files = (self.request.FILES)
        user = request.user
        serializer = BoardSerializer(data=request.data, context={'user': user})
        serializer.is_valid()
        print(serializer.is_valid())
        create_article, id = serializer.create(request.data)
        if create_article:
            return Response(id, status=HTTP_201_CREATED)
        return Response(status=HTTP_400_BAD_REQUEST)

class BoardDeleteView(DestroyAPIView):
    queryset = Board.objects.all()
    serializer_class = BoardSerializer
    permission_classes = (permissions.IsAuthenticated,)


class BoardUpdateView(UpdateAPIView):
    queryset = Board.objects.all()
    print("queryset from BoardUpdateView")
    ##print(queryset)
    serializer_class = BoardSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def update_likes_count(self, request):
        print("request from BoardUpdateView")
        print(request.data)
        Like.objects.filter(article_id=self.request.data.get("article_id")).filter(
            user_id=self.request.data.get("user_id")).values("liked")[0]["liked"]
        Like.objects.filter(article_id=self.request.data.get(
            "article")).filter(liked=True).Count()
        serializer = BoardSerializer(data=request.data)
        serializer.is_valid()
        print(serializer.is_valid())
        update_article = serializer.update_likes(request)
        if update_article:
            return Response(status=HTTP_201_CREATED)
        return Response(status=HTTP_400_BAD_REQUEST)

class ProfileBoardListView(RetrieveAPIView):
    queryset = Board.objects.all()
    print("queryset from ProfileBoardListView")
    ##print(queryset)
    serializer_class = ProfileBoardListSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self, *args, **kwargs):
        try:
            print("ProfileBoardListView")
            userId = self.kwargs.get('username')
            user = User.objects.get(username=userId)
            # articleId = Board.objects.get(title=article).id
            profile_article_list = Board.objects.filter(author=user.id)
            print("FILTER", user)
            print(profile_article_list)
            ProfileBoardListSerializer(profile_article_list)
            if len(profile_article_list) == 0:
                return None
            else:
                return profile_article_list
        except ObjectDoesNotExist:
            raise Http404("You do not have an active order")
            return Response({"message": "You do not have an active order"}, status=HTTP_400_BAD_REQUEST)


    # def index(request):
    # if request.method == "POST":
    #     article = request.POST['article']
    #     tag = request.POST['tag']
    #     boards = Board.objects.create(post=article)
    #     tags, created = Tag.objects.get_or_create(tag=tag)
    #     tp = Tagging(posts=boards, taggings=tags)
    #     tp.save()
    #     return redirect('index')
    # return render(request, 'index.html')

class ProfileBoardDetailView(RetrieveUpdateDestroyAPIView):
    parser_classes = (MultiPartParser, FormParser)
    queryset = Board.objects.all()
    print("queryset from ProfileBoardDetailView")
    ##print(queryset)
    serializer_class = BoardSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self, *args, **kwargs):
        try:
            print("ProfileBoardDetailView")
            userId = self.kwargs.get('username')
            articleId = self.kwargs.get('pk')
            user = User.objects.get(username=userId)
            profile_article_detail = Board.objects.get(author=user.id, id=articleId)
            BoardSerializer(profile_article_detail)
            return profile_article_detail
        except ObjectDoesNotExist:
            raise Http404("You do not have an active order")
            return Response({"message": "You do not have an active order"}, status=HTTP_400_BAD_REQUEST)
    
    def update(self, request, *args, **kwargs):
        serializer = BoardSerializer(data=request.data)
        serializer.is_valid()
        print("On update method")
        userId = self.kwargs.get('username')
        articleId = self.kwargs.get('pk')
        article = Board.objects.get(id=articleId)
        print("self.request.FILES")
        print(self.request.FILES)
        # print("myfile")
        # myfile = request.FILES['file']
        # print("fs")
        # fs = FileSystemStorage()
        # print(fs.values())
        print("self.request.data: ")
        print(self.request.data)
        print("self.request.data[data]: ")
        print(self.request.data["data"])
        print("type(self.request.data[data])")
        print(type(self.request.data["data"]))
        request_data = json.loads((self.request.data["data"]))
        print("request_data.get(categories)")
        print(request_data.get("categories"))
        categories_var = article.categories.values()
        article.title = request_data.get("title")
        article.content = request_data.get("content")
        article_engagement = self.add_engagement(request_data.get("feedback_type"), article)
        article_categories = self.add_categories(request_data.get("categories"), article)
        print("before myfile")
        if (self.request.FILES):
            myfile = request.FILES['file']
            print("myFile: ")
            print(myfile)
            print(type(myfile))
            print(myfile.content_type)
            print(myfile.content_type.split('/')[0])
            file_type = myfile.content_type.split('/')[0]
            if settings.USE_S3:
                if file_type == "video":
                    videoD = Video()
                    videoD.videofile = myfile
                    videoD.save()
                    article.video= Video(id=videoD.id)
                    # raise ValidationError('Unsupported file extension.')
                else: 
                    article.thumbnail = myfile
            else:
                fs = FileSystemStorage()
                valid_extensions = ['.pdf', '.doc', '.docx', '.jpg', '.png', '.xlsx', '.xls']
                if file_type == "video":
                    print("myfile.name is video")
                    videoD = Video()
                    filename = fs.save("videos/"+myfile.name, myfile)
                    uploaded_file_url = fs.url(filename)
                    videoD.videofile = "videos/"+myfile.name
                    videoD.save()
                    print("videoD, ", videoD)
                    print("videoD.id, ", videoD.id)
                    article.video= Video(id=videoD.id)
                    # raise ValidationError('Unsupported file extension.')
                else: 
                    print("myfile.name is image")
                    filename = fs.save("images/"+myfile.name, myfile)
                    uploaded_file_url = fs.url(filename)
                    print("uploaded_file_url")
                    print(uploaded_file_url)
                    # with open(uploaded_file_url) as f:
                    #     data = f.read()
                    #     article.thumbnail.save("images/"+myfile.name, ContentFile(data))
                    print(myfile.name)
                    print(myfile.name)
                    # print(os.path.basename(uploaded_file_url))
                    print(article.thumbnail)
                    article.thumbnail = "images/"+myfile.name
                    print("article.thumbnail")
                    print(article.thumbnail)
        article.save()
        # article.thumbnail = self.request.data["file"]get("thumbnail")
        # article.update(
        #         title=self.request.data.get("title"),
        #         content=self.request.data.get("content"),
        #         categories= self.add_categories(self.request.data.get("categories"), article),
        #         engagement= self.add_engagement(self.request.data.get("feedback_type"), article),
        #         thumbnail=self.request.data.get("file"))
        
        return Response(serializer.data)
    
    def add_engagement(self, engagement, article):
        print("ENGAGEMENTS")
        print(engagement)
        print("article_engagement")
        print(article.engagement.values())
        engagement_id_list = [x["id"] for x in (article.engagement.values())]
        print(engagement_id_list)
        if(len(engagement_id_list) == 0):
            for e in engagement:
                        print("adding e: ", e)
                        newE = FeedbackTypes.objects.get(id=e)
                        # newC = Category()
                        print(newE)
                        print(newE.id)
                        article.engagement.add(newE.id)
        else: 
            for i in article.engagement.values():
                print(i)
                print(i["id"])
                print(type(i["id"]))
                if str(i["id"]) not in engagement:
                    print("removing")
                    oldE = FeedbackTypes.objects.get(id=i["id"])
                    article.engagement.remove(oldE.id)
                else:
                    for e in engagement:
                        print("e:", e)
                        if int(e) not in engagement_id_list:        
                            print("adding")
                            print(e)
                            newE = FeedbackTypes.objects.get(id=e)
                            # newC = Category()
                            print(newE)
                            print(newE.id)
                            # newC.id = c
                            print("WHAT ?")
                            # print(article.categories.category_id)
                            article.engagement.add(newE.id)
                            print("WHAT 2?")
                        else:
                            pass

    def add_categories(self, selectedCategories, article):
        print("CATEGORIES")
        print(selectedCategories)
        print("article_categories")
        print(article.categories.values())
        category_id_list = [x["id"] for x in (article.categories.values())]
        article_category_title_list = [x["title"] for x in (article.categories.values())]
        category_title_list = [x["title"] for x in (Category.objects.values())]
        self.checkCategory(selectedCategories, category_title_list)
        if(len(category_id_list) == 0):
            for c in selectedCategories:
                print("adding c: ", c)
                newC = Category.objects.get(title=c)
                print(newC)
                print(newC.id)
                print(newC.title)
                article.categories.add(newC.id)
        else:
            for i in article.categories.values():
                print(i)
                print(i["id"])
                print(type(i["id"]))
                if str(i["title"]) not in selectedCategories:
                    print("removing")
                    oldC = Category.objects.get(id=i["id"])
                    article.categories.remove(oldC.id)
                else:
                    for c in selectedCategories:
                        print("c:", c, article_category_title_list)
                        print(c)
                        print(type(c))
                        if c not in article_category_title_list:        
                            print("adding")
                            print(c)
                            print(type(c))
                            newC = Category.objects.get(title=c)
                            # newC = Category()
                            print(newC)
                            print(newC.id)
                            print(newC.title)
                            # newC.id = c
                            print("WHAT ?")
                            # print(article.categories.category_id)
                            article.categories.add(newC.id)
                            print("WHAT 2?")
                        else:
                            print("None")
                            pass
    
    def checkCategory(self, category, categories):
        # print("CACAS: ", category, Category.objects.all(), categories)
        cgrs = [x.replace(" ", "").upper() for x in (categories)]
        for c in category:
            if len(cgrs) == 0:
                Category.objects.create(title=c)
            else:
                # print("CACAS 2: ", cgrs)
                if(c.replace(" ", "").upper() not in cgrs):
                    Category.objects.create(title=c)

    def delete(self, *args, **kwargs):
        try:
            print("ProfileBoardDetailView")
            userId = self.kwargs.get('username')
            articleId = self.kwargs.get('pk')
            user = User.objects.get(username=userId)
            profile_article_detail = Board.objects.delete(author=user.id, id=articleId)
            BoardSerializer(profile_article_detail)
            return profile_article_detail
        except ObjectDoesNotExist:
            raise Http404("You do not have an active order")
            return Response({"message": "You do not have an active order"}, status=HTTP_400_BAD_REQUEST)

class ListListView(ListAPIView):
    print("queryset List view")
    # ##print(queryset)
    serializer_class = BoardDetailSerializer
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self, *args, **kwargs):
        boardId = self.kwargs.get("pk")
        queryset = BoardDetail.objects.filter(board=boardId[-1])
        print(queryset.values())
        return queryset

class ListCreateView(CreateAPIView):
    queryset = BoardDetail.objects.all()
    print("queryset Create view")
    ##print(queryset)
    serializer_class = BoardDetailSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def create(self, request, *args, **kwargs):
        print("request from BoardCreateView")
        print("request", request, args)
        print("req.data", self.request.data)
        boardID = self.kwargs.get('board')
        serializer = BoardDetailSerializer(data=request.data, context={'boardID': boardID})
        serializer.is_valid()
        print(serializer.is_valid())
        create_article, id = serializer.create(request.data)
        if create_article:
            return Response(id, status=HTTP_201_CREATED)
        return Response(status=HTTP_400_BAD_REQUEST)

class ListUpdateView(RetrieveUpdateDestroyAPIView):
    queryset = Board.objects.all()
    print("queryset from BoardUpdateView")
    ##print(queryset)
    serializer_class = BoardDetailSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def put(self, request, *args, **kwargs):
        boardID = self.kwargs.get('board')
        serializer = BoardDetailSerializer(data=request.data,  context={'boardID': boardID})
        serializer.is_valid()
        print("update_card", serializer.is_valid())
        update_article = serializer.update_list(request.data)
        if update_article:
            return Response(status=HTTP_200_OK)
        return Response(status=HTTP_400_BAD_REQUEST)
    
    def delete(self, request, *args, **kwargs):
        serializer = BoardSerializer(data=request.data)
        serializer.is_valid()
        boardID = self.kwargs.get('board').split("board-", 1)[-1]
        listID = request.data["listID"].split("list-", 1)[-1]
        # print("delete", serializer.is_valid(), request.data, listID, boardID)
        try:
            BoardDetail.objects.filter(id=listID, board=boardID).delete()
            return Response(status=HTTP_200_OK)
        except Exception as e:
            print("error: ", e)
            return Response(status=HTTP_400_BAD_REQUEST)

class CardListView(RetrieveAPIView):
    queryset = Board.objects.all()
    print("queryset List view")
    # ##print(queryset)
    serializer_class = BoardSerializer
    permission_classes = (permissions.AllowAny,)

class CardCreateView(CreateAPIView):
    queryset = Cards.objects.all()
    print("queryset Create view")
    ##print(queryset)
    serializer_class = CardSerializer
    permission_classes = (permissions.AllowAny,)

    def create(self, request, *args, **kwargs):
        print("request from BoardCreateView")
        print("request", request, args)
        print("req.data", self.request.data)
        # print("req.Files",request.FILES)
        # request_data = json.loads((self.request.data["data"]))
        # request_files = (self.request.FILES)
        listID = self.kwargs.get('listId')
        serializer = CardSerializer(data=request.data, context={'listID': listID})
        serializer.is_valid()
        print(serializer.is_valid())
        create_article, id = serializer.create(request.data)
        if create_article:
            return Response(id, status=HTTP_201_CREATED)
        return Response(status=HTTP_400_BAD_REQUEST)

class CardUpdateView(RetrieveUpdateDestroyAPIView):
    queryset = Cards.objects.all()
    print("queryset from BoardUpdateView")
    ##print(queryset)
    serializer_class = CardSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def put(self, request, *args, **kwargs):
        listID = self.kwargs.get('pk')
        serializer = CardSerializer(data=request.data,  context={'listID': listID})
        serializer.is_valid()
        print("update_card", serializer.is_valid())
        update_article = serializer.update_card(request.data)
        if update_article:
            return Response(status=HTTP_200_OK)
        return Response(status=HTTP_400_BAD_REQUEST)
    
    def delete(self, request, *args, **kwargs):
        serializer = CardSerializer(data=request.data)
        serializer.is_valid()
        print("delete", serializer.is_valid())
        listID = self.kwargs.get('pk').split("list-", 1)[-1]
        cardID = request.data["id"].split("card-", 1)[-1]
        try:
            Cards.objects.filter(id=cardID, boardD=listID).delete()
            return Response(status=HTTP_200_OK)
        except:
            return Response(status=HTTP_400_BAD_REQUEST)

class LikeListView(RetrieveUpdateDestroyAPIView):
    print("lero")
    # queryset = Like.objects.all()
    # serializer_class = LikeListSerializer
    # permission_classes = (permissions.AllowAny,)

    # def get_object(self):
    #     try:
    #         articleID = self.kwargs.get('pk')
    #         like = Like.objects.filter(article_id=articleID)
    #         return like
    #     except ObjectDoesNotExist:
    #         raise Http404("You do not have an active order")
    #         return Response({"message": "You do not have an active order"}, status=HTTP_400_BAD_REQUEST)

class LikeDetailView(RetrieveUpdateDestroyAPIView):
    print("lero")
    # queryset = Like.objects.all()
    # serializer_class = LikeSerializer
    # permission_classes = (permissions.AllowAny,)
    # lookup_field = 'user'
    # lookup_url_kwarg = "user_id"

    # def get_queryset(self):
    #     userId = self.kwargs.get(self.lookup_url_kwarg)
    #     articleId = self.kwargs.get("pk")
    #     # userId = User.objects.get(username=username).id
    #     userId = User.objects.get(id=userId)
    #     # print("user EHRENO")
    #     # print(self.lookup_url_kwarg)
    #     # print(userId)
    #     queryset = Like.objects.filter(user_id=userId).filter(article_id=articleId)
    #     print(queryset.values())
    #     return queryset
    
    # def update(self, request, *args, **kwargs):
    #     serializer = LikeSerializer(data=request.data)
    #     serializer.is_valid()
    #     print("On update method")
    #     # print(self.request.data)
    #     # print(self.request.data.get("article"))
    #     Like.objects.filter(user_id=self.request.data.get("user_id")).filter(article_id=self.request.data.get("article")).update(liked=self.request.data.get("liked"))
    #     Board.objects.update_or_create(
    #         id=self.request.data.get("article"),
    #         defaults={"likes_count": Like.objects.filter(
    #         article_id=self.request.data.get("article")).filter(liked=True).count()}
    #         )
    #     return Response(serializer.data)


class CreateLike(CreateAPIView):
    print("lero")
    # queryset = Like.objects.all()
    # queryset2 = Board.objects.all().values()
    # print("UpdateLike queryset")
    # ##print(queryset)
    # # print(queryset2)
    # # print(Like.objects.values())
    # serializer_class = LikeSerializer
    # permission_classes = (permissions.IsAuthenticated,)

    # def create(self, request, *args, **kwargs):
    #     # print("request from UpdateLike")
    #     # print(request.data)
    #     # like = Like()
    #     # like.user = self.request.user
    #     # print("like.user")
    #     # print(like.user)
    #     # print(like.user_id)
    #     # like.user = request.user
    #     # print("like.user")
    #     # print(like.user)
    #     serializer = LikeSerializer(data=request.data)
    #     serializer.is_valid()
    #     print("Valid Update Like Serializer?")
    #     print(serializer.is_valid())
    #     print(self.request.data.get("article"))
    #     print(Like.objects.filter(article_id=self.request.data.get(
    #         "article")).filter(liked=True).count())
    #     if Like.objects.filter(article_id=self.request.data.get("article")).filter(user_id=self.request.data.get("user_id")).exists():
    #         if Like.objects.filter(article_id=self.request.data.get("article")).filter(user_id=self.request.data.get("user_id")).values("liked")[0]["liked"] == self.request.data.get("liked"):
    #             print("A?: User tries to like the article when is already liked")
    #             return Response({"message": "Board author can't liked its own boards"}, status=HTTP_400_BAD_REQUEST)
    #         else:
    #             obj = Like.objects.update_or_create(
    #                 article_id=self.request.data.get("article"),
    #                 user_id=self.request.data.get("user_id"),
    #                 defaults={"liked": self.request.data.get("liked")})
    #             art = Board.objects.update_or_create(
    #                 id=self.request.data.get("article"),
    #                 defaults={"likes_count": Like.objects.filter(
    #                     article_id=self.request.data.get("article")).filter(liked=True).count()}
    #             )
    #             return Response(status=HTTP_201_CREATED)

    #     else:
    #         create_like = serializer.create_like(request)
    #         if create_like:
    #             art = Board.objects.update_or_create(
    #                 id=self.request.data.get("article"),
    #                 defaults={"likes_count": Like.objects.filter(
    #                     article_id=self.request.data.get("article")).filter(liked=True).count()}
    #             )
    #             return Response(status=HTTP_201_CREATED)
    #         print("B?")
    #         return Response({"message": "EHRENO"}, status=HTTP_400_BAD_REQUEST)


class CreateRating(CreateAPIView):
    print("lero")
#     queryset = Rating.objects.all()
#     serializer_class = RatingSerializer
#     permission_classes = (permissions.IsAuthenticated,)

#     def create(self, request, *args, **kwargs):
#         serializer = RatingSerializer(data=request.data)
#         whg_val = [1, 2, 3, 4, 5]
#         serializer.is_valid()
#         if Rating.objects.filter(article_id=self.request.data.get("articleID")).filter(user__username=self.request.data.get("username")).exists():
#             return Response(status=HTTP_400_BAD_REQUEST)
#         else:
#             create_rate = serializer.create_rate(request)
#             if create_rate:
#                 wgh_mean = 0
#                 wgh_den = 0
#                 for val in whg_val:
#                     wgh_mean += val * \
#                         Rating.objects.filter(article_id=self.request.data.get(
#                             "articleID")).filter(rate=val).count()
#                     wgh_den += Rating.objects.filter(
#                         article_id=self.request.data.get("articleID")).filter(rate=val).count()

#                 art = Board.objects.update_or_create(
#                     id=self.request.data.get("articleID"),
#                     defaults={"rating_count": Rating.objects.filter(
#                         article_id=self.request.data.get("articleID"))
#                         .aggregate(Sum('rate'))['rate__sum'],
#                         "avg_rating": round(wgh_mean/wgh_den, 1)}
#                 )
#                 return Response(status=HTTP_201_CREATED)
#             return Response(status=HTTP_400_BAD_REQUEST)

class CommentListView(RetrieveAPIView):
    print("lero")
#     queryset = Comment.objects.all()
#     serializer_class = CommentListSerializer
#     permission_classes = (permissions.AllowAny,)
#     print("Comment Detial queryset")
#     # print(queryset.values())
#     def get_object(self):
#         try:
#             print("Comment filter")
#             articleID = self.kwargs.get('pk')
#             comment = Comment.objects.filter(article_id=articleID)
#             return comment
#         except ObjectDoesNotExist:
#             raise Http404("You do not have an active order")
#             return Response({"message": "You do not have an active order"}, status=HTTP_400_BAD_REQUEST)

class CommentDetailView(RetrieveUpdateDestroyAPIView):
    print("lero")
#     queryset = Comment.objects.all()
#     print("queryset from CoomentDetail View")
#     ##print(queryset)
#     serializer_class = CommentSerializer
#     permission_classes = (permissions.IsAuthenticated,)

#     def get_object(self, *args, **kwargs):
#         try:
#             articleID = self.kwargs.get('pk')
#             commentID = self.kwargs.get('id')
#             comment = Comment.objects.get(article=articleID, id=commentID)
#             return comment
#         except ObjectDoesNotExist:
#             raise Http404("You do not have an active order")
#             return Response({"message": "You do not have an active order"}, status=HTTP_400_BAD_REQUEST)

class CreateComment(CreateAPIView):
    print("lero")
#     queryset = Comment.objects.all()
#     serializer_class = CommentSerializer
#     permission_classes = (permissions.IsAuthenticated,)

#     def create(self, request, *args, **kwargs):
#         serializer = CommentSerializer(data=request.data)
#         serializer.is_valid()
#         create_comment = serializer.create_comment(request)
#         if create_comment:
#             print("data at create Commnet")
#             print(self.request.data)
#             art = Board.objects.update_or_create(
#                 id=self.request.data.get("articleID"),
#                 defaults={"comment_count": Comment.objects.filter(
#                     article=self.request.data.get("articleID"))
#                     .count(),
#                 }
#             )
#             return Response(status=HTTP_201_CREATED)
#         return Response(status=HTTP_400_BAD_REQUEST)

class UpdateComment(UpdateAPIView):
    print("lero")
#     queryset = Comment.objects.all()
#     serializer_class = CommentSerializer
#     permission_classes = (permissions.IsAuthenticated,)
#     lookup_url_kwarg = "id"
#     print("request from UpdateComment 1")

#     def update_likes_count(self, request, *args, **kwargs):
#         print("request from UpdateComment 2")
#         print(request.data)
#         serializer = CommentSerializer(data=request.data)
#         serializer.is_valid()
#         upload_comment = serializer.upload_comment(request)
#         print(Comment.objects.filter(id=self.request.data.get("id")).filter(article_id=self.request.data.get("article_id")).filter(
#             user_id=self.request.data.get("user_id")).values())
#         Comment.objects.filter(id=self.request.data.get("id")).filter(article_id=self.request.data.get("article_id")).filter(
#             user_id=self.request.data.get("user_id")).values("liked")[0]["liked"]
#         Comment.objects.filter(article_id=self.request.data.get(
#             "article")).filter(liked=True).Count()
#         serializer = BoardSerializer(data=request.data)
#         serializer.is_valid()
#         print(serializer.is_valid())
#         update_article = serializer.update_likes(request)
#         if update_article:
#             return Response(status=HTTP_201_CREATED)
#         return Response(status=HTTP_400_BAD_REQUEST)

# # class VideoViewSet(viewsets.ModelViewSet):
class VideoViewSet(viewsets.ModelViewSet):
    print("lero")
#     queryset = Video.objects.all()
#     serializer_class = VideoFormSerializer
#     parser_classes = (MultiPartParser, FileUploadParser, FormParser,)
#     permission_classes = (permissions.IsAuthenticated,)

#     def createVideo(self, request, *args, **kwargs):
#         file_serializer = VideoFormSerializer(data=request.data)
#         if file_serializer.is_valid():
#           file_serializer.save()
#           return Response(file_serializer.data, status=status.HTTP_201_CREATED)
#         else:
#           return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ImageCreateView(CreateAPIView):
    print("lero")
#     parser_classes = (MultiPartParser, FormParser, FileUploadParser)
#     queryset = Image.objects.all()
#     serializer_class = ImageFormSerializer
#     permission_classes = (permissions.AllowAny,)

#     @csrf_exempt
#     def post(self, request, *args, **kwargs):
#         print("createImage at ImageViewSet")
#         print(request.data)
#         myfile = request.FILES['file']
#         fs = FileSystemStorage()
#         filename = fs.save(myfile.name, myfile)
#         uploaded_file_url = fs.url(filename)
#         imageSerializer = ImageFormSerializer(data=request.data)
#         if imageSerializer.is_valid():
#           imageSerializer.save()
#           return Response(imageSerializer.data, status=status.HTTP_201_CREATED)
#         else:
#           return Response(imageSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ImageDestroyView(DestroyAPIView):
    print("lero")
#     parser_classes = (MultiPartParser, FormParser, FileUploadParser, JSONParser)
#     queryset = Image.objects.all()
#     serializer_class = ImageFormSerializer
#     permission_classes = (permissions.IsAuthenticated,)

#     def delete(self, request, *args, **kwargs):
#         print("createImage at ImageViewSet")
#         print("self.request.FILES")
#         print(self.request.FILES)
#         print(request.objects.all())
#         imageSerializer = ImageFormSerializer(data=request.data)
#         if imageSerializer.is_valid():
#           imageSerializer.save()
#           return Response(imageSerializer.data, status=status.HTTP_201_CREATED)
#         else:
#           return Response(imageSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

class Categories_and_F_TView(generics.ListAPIView):
    print("lero")
#     serializer_class = (Cat_FT_Serializer)
#     permission_classes = (permissions.AllowAny,)

#     def get_queryset(self):
#         print("Lacking")
#         # qs1 = article_filter(self.request)
#         qs = {"data"}
#         # qs = {"degree": Degree.DEGREES}
#         # qs = {"degree": Degree.DEGREES, "bachelor": Bachelor.BACHELOR_DEGREES, "master": Master.MASTER_DEGREES,
#         #     "pHD": Doctorate.PHD_DEGREES, "course": Course.COURSES}
#         # qs = {{"degree": Degree.DEGREES}, {"bachelor": Bachelor.BACHELOR_DEGREES}, {"master": Master.MASTER_DEGREES},
#         #     {"pHD": Doctorate.PHD_DEGREES}, {"course": Course.COURSES}}
#         # qs = [Degree.DEGREES,  Bachelor.BACHELOR_DEGREES, Master.MASTER_DEGREES,
#         #      Doctorate.PHD_DEGREES, Course.COURSES]
#         print(qs)
#         return qs