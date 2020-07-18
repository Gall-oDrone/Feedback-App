# from rest_framework import viewsets
from django.db.models import Count, Q, Sum
from django.shortcuts import get_object_or_404, redirect, reverse
from django.core.exceptions import ObjectDoesNotExist
from django.core.files.storage import FileSystemStorage
from rest_framework.response import Response
from rest_framework.decorators import parser_classes
from rest_framework.parsers import MultiPartParser, FileUploadParser, FormParser, JSONParser
from django.views.decorators.csrf import csrf_exempt
from rest_framework.status import(
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST
)
from rest_framework import permissions, generics
from .models import (
    Inquiry, 
    Tag, 
    Tagging, 
    InquiryType, 
    InquiryView, 
    Like, 
    Rating, 
    Comment, 
    File, 
    ContactOption, 
    InquiryStatus, 
    InquiryType,
    TargetAudience, 
    Topic,  
    PreferLanguage)
from users.models import User
from .serializers import (
    InquirySerializer, 
    InquiryFeatureSerializer, 
    FormSerializer, 
    CommentSerializer, 
    LikeSerializer, 
    LikeListSerializer, 
    RatingSerializer, 
    CommentListSerializer, 
    FileFormSerializer, 
    ProfileInquiryListSerializer,
    testSerializer
    )
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


class InquiryFeatureView():
    # queryset = Inquiry.objects.all()
    serializer_class = InquiryFeatureSerializer
    queryset = Inquiry.objects.all()
    permission_classes = (permissions.AllowAny,)

    def index(request):
        queryset = Inquiry.objects.all()
        featured = Inquiry.objects.filter(featured=True)
        latest = Post.objects.order_by("-timestamp")[0:3]

        context = {
            "object_list": featured,
            "latest": latest
        }
        return


class InquiryListView(ListAPIView):
    # model = Inquiry
    queryset = Inquiry.objects.all()
    print("queryset List view")
    #print(queryset)
    serializer_class = InquirySerializer
    permission_classes = (permissions.AllowAny,)

    def category_count():
        queryset = Inquiry \
            .objects \
            .values("inquiry_type__title") \
            .annotate(Count("inquiry_type__title"))
        return queryset

    def tags_count():
        queryset = Inquiry \
            .objects \
            .values("tags__tag") \
            .annotate(Count("tags__tag"))
        return queryset

    def likes_count():
        queryset = Inquiry \
            .objects \
            .values("tags__tag") \
            .annotate(Count("tags__tag"))
        return queryset

    def stars_count():
        queryset = Inquiry \
            .objects \
            .values("tags__tag") \
            .annotate(Count("tags__tag"))
        return queryset

    def get_author(user):
        qs = Author.objects.filter(user=user)
        if qs.exists():
            return qs[0]
        return None


class InquiryDetailView(RetrieveAPIView):
    queryset = Inquiry.objects.all()
    serializer_class = InquirySerializer
    permission_classes = (permissions.AllowAny,)


class InquiryCreateView(CreateAPIView):
    parser_classes = (MultiPartParser, FormParser)
    queryset = Inquiry.objects.all()
    print("queryset Create view")
    #print(queryset)
    serializer_class = InquirySerializer
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        print("request from InquiryCreateView")
        print("request", request)
        print("req.data",request.data)
        print("req.Files",request.FILES)
        request_data = json.loads((self.request.data["data"]))
        request_files = (self.request.FILES)
        serializer = InquirySerializer(data=request_data)
        serializer.is_valid()
        print(serializer.is_valid())
        create_inquiry = serializer.create(request_data, request_files)
        if create_inquiry:
            return Response(status=HTTP_201_CREATED)
        return Response(status=HTTP_400_BAD_REQUEST)

class InquiryDeleteView(DestroyAPIView):
    queryset = Inquiry.objects.all()
    serializer_class = InquirySerializer
    permission_classes = (permissions.IsAuthenticated,)


class InquiryUpdateView(UpdateAPIView):
    queryset = Inquiry.objects.all()
    print("queryset from InquiryUpdateView")
    #print(queryset)
    serializer_class = InquirySerializer
    permission_classes = (permissions.IsAuthenticated,)

    def update_likes_count(self, request):
        print("request from InquiryUpdateView")
        print(request.data)
        Like.objects.filter(inquiry_id=self.request.data.get("inquiry_id")).filter(
            user_id=self.request.data.get("user_id")).values("liked")[0]["liked"]
        Like.objects.filter(inquiry_id=self.request.data.get(
            "inquiry")).filter(liked=True).Count()
        serializer = InquirySerializer(data=request.data)
        serializer.is_valid()
        print(serializer.is_valid())
        update_inquiry = serializer.update_likes(request)
        if update_inquiry:
            return Response(status=HTTP_201_CREATED)
        return Response(status=HTTP_400_BAD_REQUEST)

class ProfileInquiryListView(RetrieveAPIView):
    queryset = Inquiry.objects.all()
    print("queryset from ProfileInquiryListView")
    serializer_class = ProfileInquiryListSerializer
    permission_classes = (permissions.IsAuthenticated,)
    def get_object(self, *args, **kwargs):
        try:
            print("ProfileInquiryListView")
            userId = self.kwargs.get('username')
            user = User.objects.get(username=userId)
            # inquiryId = Inquiry.objects.get(title=inquiry).id
            profile_inquiry_list = Inquiry.objects.filter(author=user.id)
            print("FILTER")
            print(profile_inquiry_list)
            ProfileInquiryListSerializer(profile_inquiry_list)
            if len(profile_inquiry_list) == 0:
                return None
            else:
                return profile_inquiry_list
        except ObjectDoesNotExist:
            raise Http404("You do not have an active order")
            return Response({"message": "You do not have an active order"}, status=HTTP_400_BAD_REQUEST)


    # def index(request):
    # if request.method == "POST":
    #     inquiry = request.POST['inquiry']
    #     tag = request.POST['tag']
    #     inquiries = Inquiry.objects.create(post=inquiry)
    #     tags, created = Tag.objects.get_or_create(tag=tag)
    #     tp = Tagging(posts=inquiries, taggings=tags)
    #     tp.save()
    #     return redirect('index')
    # return render(request, 'index.html')

class ProfileInquiryDetailView(RetrieveUpdateDestroyAPIView):
    parser_classes = (MultiPartParser, FormParser)
    queryset = Inquiry.objects.all()
    print("queryset from ProfileInquiryDetailView")
    #print(queryset)
    serializer_class = InquirySerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self, *args, **kwargs):
        try:
            print("ProfileInquiryDetailView")
            userId = self.kwargs.get('username')
            inquiryId = self.kwargs.get('pk')
            user = User.objects.get(username=userId)
            profile_inquiry_detail = Inquiry.objects.get(author=user.id, id=inquiryId)
            InquirySerializer(profile_inquiry_detail)
            return profile_inquiry_detail
        except ObjectDoesNotExist:
            raise Http404("You do not have an active order")
            return Response({"message": "You do not have an active order"}, status=HTTP_400_BAD_REQUEST)
    
    def update(self, request, *args, **kwargs):
        serializer = InquirySerializer(data=request.data)
        serializer.is_valid()
        print("On update method")
        userId = self.kwargs.get('username')
        inquiryId = self.kwargs.get('pk')
        inquiry = Inquiry.objects.get(id=inquiryId)
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
        print("request_data.get(inquiry_type)")
        print(request_data.get("inquiry_type"))
        inquiry_type_var = inquiry.inquiry_type.values()
        inquiry.title = request_data.get("title")
        inquiry.content = request_data.get("content")
        inquiry_engagement = self.add_engagement(request_data.get("feedback_type"), inquiry)
        inquiry_inquiry_type = self.add_inquiry_type(request_data.get("inquiry_type"), inquiry)
        print("before myfile")
        myfile = request.FILES['file']
        print("myFile: ")
        print(myfile)
        print(type(myfile))
        print(myfile.content_type)
        print(myfile.content_type.split('/')[0])
        file_type = myfile.content_type.split('/')[0]
        fs = FileSystemStorage()
        valid_extensions = ['.pdf', '.doc', '.docx', '.jpg', '.png', '.xlsx', '.xls']
        print("myfile.name is image")
        filename = fs.save("images/"+myfile.name, myfile)
        uploaded_file_url = fs.url(filename)
        print("uploaded_file_url")
        print(uploaded_file_url)
        # with open(uploaded_file_url) as f:
        #     data = f.read()
        #     inquiry.thumbnail.save("images/"+myfile.name, ContentFile(data))
        print(myfile.name)
        print(myfile.name)
        # print(os.path.basename(uploaded_file_url))
        print(inquiry.thumbnail)
        inquiry.thumbnail = "images/"+myfile.name
        print("inquiry.thumbnail")
        print(inquiry.thumbnail)
        inquiry.save()
        # inquiry.thumbnail = self.request.data["file"]get("thumbnail")
        # inquiry.update(
        #         title=self.request.data.get("title"),
        #         content=self.request.data.get("content"),
        #         inquiry_type= self.add_inquiry_type(self.request.data.get("inquiry_type"), inquiry),
        #         engagement= self.add_engagement(self.request.data.get("feedback_type"), inquiry),
        #         thumbnail=self.request.data.get("file"))
        
        return Response(serializer.data)
    
    def add_engagement(self, engagement, inquiry):
        print("ENGAGEMENTS")
        print(engagement)
        print("inquiry_engagement")
        print(inquiry.engagement.values())
        engagement_id_list = [x["id"] for x in (inquiry.engagement.values())]
        print(engagement_id_list)
        for i in inquiry.engagement.values():
            print(i)
            print(i["id"])
            print(type(i["id"]))
            if str(i["id"]) not in engagement:
                print("removing")
                oldE = ContactOption.objects.get(id=i["id"])
                inquiry.engagement.remove(oldE.id)
            else:
                for e in engagement:
                    print("e:")
                    print(e)
                    if int(e) not in engagement_id_list:        
                        print("adding")
                        print(e)
                        newE = ContactOption.objects.get(id=e)
                        # newC = InquiryType()
                        print(newE)
                        print(newE.id)
                        # newC.id = c
                        print("WHAT ?")
                        # print(inquiry.inquiry_type.category_id)
                        inquiry.engagement.add(newE.id)
                        print("WHAT 2?")
                    else:
                        None

    def add_inquiry_type(self, inquiry_typeD, inquiry):
        print("CATEGORIES")
        print(inquiry_typeD)
        print("inquiry_inquiry_type")
        print(inquiry.inquiry_type.values())
        category_id_list = [x["id"] for x in (inquiry.inquiry_type.values())]
        for i in inquiry.inquiry_type.values():
            print(i)
            print(i["id"])
            print(type(i["id"]))
            if str(i["id"]) not in inquiry_typeD:
                print("removing")
                oldC = InquiryType.objects.get(id=i["id"])
                inquiry.inquiry_type.remove(oldC.id)
            else:
                for c in inquiry_typeD:
                    print("c:")
                    print(c)
                    print(type(c))
                    if int(c) not in category_id_list:        
                        print("adding")
                        print(c)
                        print(type(c))
                        newC = InquiryType.objects.get(id=c)
                        # newC = InquiryType()
                        print(newC)
                        print(newC.id)
                        print(newC.title)
                        # newC.id = c
                        print("WHAT ?")
                        # print(inquiry.inquiry_type.category_id)
                        inquiry.inquiry_type.add(newC.id)
                        print("WHAT 2?")
                    else:
                        print("None")
                        return
    def delete(self, *args, **kwargs):
        try:
            print("ProfileInquiryDetailView")
            userId = self.kwargs.get('username')
            inquiryId = self.kwargs.get('pk')
            user = User.objects.get(username=userId)
            profile_inquiry_detail = Inquiry.objects.delete(author=user.id, id=inquiryId)
            InquirySerializer(profile_inquiry_detail)
            return profile_inquiry_detail
        except ObjectDoesNotExist:
            raise Http404("You do not have an active order")
            return Response({"message": "You do not have an active order"}, status=HTTP_400_BAD_REQUEST)


class LikeListView(RetrieveUpdateDestroyAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeListSerializer
    permission_classes = (permissions.AllowAny,)

    def get_object(self):
        try:
            inquiryID = self.kwargs.get('pk')
            like = Like.objects.filter(inquiry_id=inquiryID)
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
        inquiryId = self.kwargs.get("pk")
        # userId = User.objects.get(username=username).id
        userId = User.objects.get(id=userId)
        print("user EHRENO")
        print(self.lookup_url_kwarg)
        print(userId)
        queryset = Like.objects.filter(user_id=userId).filter(inquiry_id=inquiryId)
        #print(queryset.values())
        return queryset
    
    def update(self, request, *args, **kwargs):
        serializer = LikeSerializer(data=request.data)
        serializer.is_valid()
        print("On update method")
        print(self.request.data)
        print(self.request.data.get("inquiry"))
        Like.objects.filter(user_id=self.request.data.get("user_id")).filter(inquiry_id=self.request.data.get("inquiry")).update(liked=self.request.data.get("liked"))
        Inquiry.objects.update_or_create(
            id=self.request.data.get("inquiry"),
            defaults={"likes_count": Like.objects.filter(
            inquiry_id=self.request.data.get("inquiry")).filter(liked=True).count()}
            )
        return Response(serializer.data)


class CreateLike(CreateAPIView):
    queryset = Like.objects.all()
    queryset2 = Inquiry.objects.all().values()
    print("UpdateLike queryset")
    #print(queryset)
    # print(queryset2)
    # print(Like.objects.values())
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
        print(self.request.data.get("inquiry"))
        print(Like.objects.filter(inquiry_id=self.request.data.get(
            "inquiry")).filter(liked=True).count())
        if Like.objects.filter(inquiry_id=self.request.data.get("inquiry")).filter(user_id=self.request.data.get("user_id")).exists():
            if Like.objects.filter(inquiry_id=self.request.data.get("inquiry")).filter(user_id=self.request.data.get("user_id")).values("liked")[0]["liked"] == self.request.data.get("liked"):
                print("A?: User tries to like the inquiry when is already liked")
                return Response({"message": "Inquiry author can't liked its own inquiries"}, status=HTTP_400_BAD_REQUEST)
            else:
                obj = Like.objects.update_or_create(
                    inquiry_id=self.request.data.get("inquiry"),
                    user_id=self.request.data.get("user_id"),
                    defaults={"liked": self.request.data.get("liked")})
                art = Inquiry.objects.update_or_create(
                    id=self.request.data.get("inquiry"),
                    defaults={"likes_count": Like.objects.filter(
                        inquiry_id=self.request.data.get("inquiry")).filter(liked=True).count()}
                )
                return Response(status=HTTP_201_CREATED)

        else:
            create_like = serializer.create_like(request)
            if create_like:
                art = Inquiry.objects.update_or_create(
                    id=self.request.data.get("inquiry"),
                    defaults={"likes_count": Like.objects.filter(
                        inquiry_id=self.request.data.get("inquiry")).filter(liked=True).count()}
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
        if Rating.objects.filter(inquiry_id=self.request.data.get("inquiryID")).filter(user__username=self.request.data.get("username")).exists():
            return Response(status=HTTP_400_BAD_REQUEST)
        else:
            create_rate = serializer.create_rate(request)
            if create_rate:
                wgh_mean = 0
                wgh_den = 0
                for val in whg_val:
                    wgh_mean += val * \
                        Rating.objects.filter(inquiry_id=self.request.data.get(
                            "inquiryID")).filter(rate=val).count()
                    wgh_den += Rating.objects.filter(
                        inquiry_id=self.request.data.get("inquiryID")).filter(rate=val).count()

                art = Inquiry.objects.update_or_create(
                    id=self.request.data.get("inquiryID"),
                    defaults={"rating_count": Rating.objects.filter(
                        inquiry_id=self.request.data.get("inquiryID"))
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
    #print(queryset.values())
    def get_object(self):
        try:
            print("Comment filter")
            inquiryID = self.kwargs.get('pk')
            comment = Comment.objects.filter(inquiry_id=inquiryID)
            return comment
        except ObjectDoesNotExist:
            raise Http404("You do not have an active order")
            return Response({"message": "You do not have an active order"}, status=HTTP_400_BAD_REQUEST)

class CommentDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    print("queryset from CoomentDetail View")
    #print(queryset)
    serializer_class = CommentSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self, *args, **kwargs):
        try:
            inquiryID = self.kwargs.get('pk')
            commentID = self.kwargs.get('id')
            comment = Comment.objects.get(inquiry=inquiryID, id=commentID)
            return comment
        except ObjectDoesNotExist:
            raise Http404("You do not have an active order")
            return Response({"message": "You do not have an active order"}, status=HTTP_400_BAD_REQUEST)

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
            art = Inquiry.objects.update_or_create(
                id=self.request.data.get("inquiryID"),
                defaults={"comment_count": Comment.objects.filter(
                    inquiry=self.request.data.get("inquiryID"))
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
        print(Comment.objects.filter(id=self.request.data.get("id")).filter(inquiry_id=self.request.data.get("inquiry_id")).filter(
            user_id=self.request.data.get("user_id")).values())
        Comment.objects.filter(id=self.request.data.get("id")).filter(inquiry_id=self.request.data.get("inquiry_id")).filter(
            user_id=self.request.data.get("user_id")).values("liked")[0]["liked"]
        Comment.objects.filter(inquiry_id=self.request.data.get(
            "inquiry")).filter(liked=True).Count()
        serializer = InquirySerializer(data=request.data)
        serializer.is_valid()
        print(serializer.is_valid())
        update_inquiry = serializer.update_likes(request)
        if update_inquiry:
            return Response(status=HTTP_201_CREATED)
        return Response(status=HTTP_400_BAD_REQUEST)

# class ViewSet(viewsets.ModelViewSet):
class FileCreateView(CreateAPIView):
    parser_classes = (MultiPartParser, FormParser, FileUploadParser)
    queryset = File.objects.all()
    serializer_class = FileFormSerializer
    permission_classes = (permissions.AllowAny,)

    @csrf_exempt
    def post(self, request, *args, **kwargs):
        print("createFile at FileViewSet")
        print(request.data)
        myfile = request.FILES['file']
        fs = FileSystemStorage()
        filename = fs.save(myfile.name, myfile)
        uploaded_file_url = fs.url(filename)
        imageSerializer = FileFormSerializer(data=request.data)
        if imageSerializer.is_valid():
          imageSerializer.save()
          return Response(imageSerializer.data, status=status.HTTP_201_CREATED)
        else:
          return Response(imageSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FileDestroyView(DestroyAPIView):
    parser_classes = (MultiPartParser, FormParser, FileUploadParser, JSONParser)
    queryset = File.objects.all()
    serializer_class = FileFormSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def delete(self, request, *args, **kwargs):
        print("createFile at FileViewSet")
        print("self.request.FILES")
        print(self.request.FILES)
        print(request.objects.all())
        imageSerializer = FileFormSerializer(data=request.data)
        if imageSerializer.is_valid():
          imageSerializer.save()
          return Response(imageSerializer.data, status=status.HTTP_201_CREATED)
        else:
          return Response(imageSerializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CommentListView(RetrieveAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentListSerializer
    permission_classes = (permissions.AllowAny,)
    print("Comment Detial queryset")
    #print(queryset.values())
    def get_object(self):
        try:
            print("Comment filter")
            inquiryID = self.kwargs.get('pk')
            comment = Comment.objects.filter(inquiry_id=inquiryID)
            return comment
        except ObjectDoesNotExist:
            raise Http404("You do not have an active order")
            return Response({"message": "You do not have an active order"}, status=HTTP_400_BAD_REQUEST)

class CommentDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    print("queryset from CoomentDetail View")
    #print(queryset)
    serializer_class = CommentSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self, *args, **kwargs):
        try:
            inquiryID = self.kwargs.get('pk')
            commentID = self.kwargs.get('id')
            comment = Comment.objects.get(inquiry=inquiryID, id=commentID)
            return comment
        except ObjectDoesNotExist:
            raise Http404("You do not have an active order")
            return Response({"message": "You do not have an active order"}, status=HTTP_400_BAD_REQUEST)

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
            art = Inquiry.objects.update_or_create(
                id=self.request.data.get("inquiryID"),
                defaults={"comment_count": Comment.objects.filter(
                    inquiry=self.request.data.get("inquiryID"))
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
        print(Comment.objects.filter(id=self.request.data.get("id")).filter(inquiry_id=self.request.data.get("inquiry_id")).filter(
            user_id=self.request.data.get("user_id")).values())
        Comment.objects.filter(id=self.request.data.get("id")).filter(inquiry_id=self.request.data.get("inquiry_id")).filter(
            user_id=self.request.data.get("user_id")).values("liked")[0]["liked"]
        Comment.objects.filter(inquiry_id=self.request.data.get(
            "inquiry")).filter(liked=True).Count()
        serializer = InquirySerializer(data=request.data)
        serializer.is_valid()
        print(serializer.is_valid())
        update_inquiry = serializer.update_likes(request)
        if update_inquiry:
            return Response(status=HTTP_201_CREATED)
        return Response(status=HTTP_400_BAD_REQUEST)

class SelectablesView(generics.ListAPIView):
    # queryset = ProfileInfo.objects.all()
    serializer_class = (testSerializer)
    permission_classes = (permissions.AllowAny,)
    if(len(InquiryStatus.objects.all()) == 0):
        for i in InquiryStatus.CHOICES:
            degree = InquiryStatus.objects.create(inquiry_status=i[0])
    if(len(InquiryType.objects.all()) == 0):
        for i in InquiryType.CHOICES:
            degree = InquiryType.objects.create(inquiry_type=i[0])
    if(len(TargetAudience.objects.all()) == 0):
        for i in TargetAudience.CHOICES:
            degree = TargetAudience.objects.create(target_audience=i[0])

    def get_queryset(self):
        print("Lacking")
        qs = {"data"}
        print(qs)
        return qs