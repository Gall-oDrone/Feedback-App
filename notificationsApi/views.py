from django.db.models import Count, Q, Sum
from django.dispatch import Signal, receiver
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
from rest_framework import permissions
from articlesApi.models import Article, Tag, Tagging, Category, Like, Rating, Comment, Video, Image, FeedbackTypes
from notificationsApi.models import Notification 
from users.models import User
from .serializers import NotificationSerializer, NotificationFeatureSerializer, VideoFormSerializer, CommentSerializer, LikeSerializer, LikeListSerializer, RatingSerializer, CommentListSerializer, ImageFormSerializer, ProfileNotificationListSerializer, ProfileNotificationListUpdateSerializer
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

def notify(user, actor, verb, action='', target='', description=''):
    n = user.notification.create(actor=actor, verb=verb, action=action, target=target, description=description)
    return n
          
def multi_notify(users, actor, verb, action='', target='', description=''):
	for u in User.objects.filter(pk__in=users):
		u.notification.create(
 		actor=actor, verb=verb, action=action, target=target, description=description)
             
# @receiver(post_save, sender=Order)
# def order_id_setter(sender, instance, created, *args, **kwargs):
#  	if created:
#  		instance.order_id = instance.order_time.strftime('%M%H%d%m%Y')
#  		instance.address_text = instance.address.get_address()
#  		instance.save()
#  		notify(user=instance.user,
#  				actor=f"Order {instance.order_id}", verb=" placed Successfully.")

class NotificationListView(ListAPIView):
    # model = Notification
    queryset = Notification.objects.all()
    print("queryset List view")
    print(queryset)
    serializer_class = NotificationSerializer
    permission_classes = (permissions.AllowAny,)

    def likes_count():
        queryset = Notification \
            .objects \
            .values("tags__tag") \
            .annotate(Count("tags__tag"))
        return queryset

class NotificationDetailView(RetrieveAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    permission_classes = (permissions.AllowAny,)

lcRequest_post_signal = Signal(providing_args=["context"])
class NotificationCreateView(CreateAPIView):
    parser_classes = (MultiPartParser, FormParser)
    queryset = Notification.objects.all()
    print("queryset Create view")
    print(queryset)
    serializer_class = NotificationSerializer
    permission_classes = (permissions.IsAuthenticated,)

    @receiver(lcRequest_post_signal)
    def post(self, request, *args, **kwargs):
        print("request from NotificationCreateView")
        serializer = NotificationSerializer(data=request.data)
        if serializer.is_valid():
            print(serializer.is_valid())
            create_article = serializer.create(request.data)
            if create_article:
                return Response(status=HTTP_201_CREATED)
        return Response(status=HTTP_400_BAD_REQUEST)


class NotificationDeleteView(DestroyAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    permission_classes = (permissions.IsAuthenticated,)


class NotificationUpdateView(UpdateAPIView):
    queryset = Notification.objects.all()
    print("queryset from NotificationUpdateView")
    print(queryset)
    serializer_class = NotificationSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def update_likes_count(self, request):
        print("request from NotificationUpdateView")
        print(request.data)
        Like.objects.filter(article_id=self.request.data.get("article_id")).filter(
            user_id=self.request.data.get("user_id")).values("liked")[0]["liked"]
        Like.objects.filter(article_id=self.request.data.get(
            "article")).filter(liked=True).Count()
        serializer = NotificationSerializer(data=request.data)
        serializer.is_valid()
        print(serializer.is_valid())
        update_article = serializer.update_likes(request)
        if update_article:
            return Response(status=HTTP_201_CREATED)
        return Response(status=HTTP_400_BAD_REQUEST)

class ProfileNotificationListView(RetrieveAPIView):
    queryset = Notification.objects.all()
    print("queryset from ProfileNotificationListView")
    print(queryset)
    serializer_class = ProfileNotificationListSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self, *args, **kwargs):
        try:
            print("ProfileNotificationListView")
            userId = self.kwargs.get('username')
            user = User.objects.get(username=userId)
            # articleId = Notification.objects.get(title=article).id
            profile_notification_list = Notification.objects.filter(user=user.id, read=False).order_by('-timestamp')
            print("FILTER")
            print(profile_notification_list)
            ProfileNotificationListSerializer(profile_notification_list)
            if len(profile_notification_list) == 0:
                return None
            else:
                return profile_notification_list
        except ObjectDoesNotExist:
            raise Http404("You do not have an active order")
            return Response({"message": "You do not have an active order"}, status=HTTP_400_BAD_REQUEST)

   

class ProfileNotificationListUpdateView(UpdateAPIView):
    queryset = Notification.objects.all()
    print("queryset from ProfileNotificationListView")
    print(queryset)
    serializer_class = NotificationSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def update(self, request, *args, **kwargs):
        userId = self.kwargs.get('username')
        print("On update method I")
        print("request.data I", request.data)
        print("request.data II", request)
        print("self.request.data", self.request.data)
        for n in request.data:
            serializer = NotificationSerializer(data=n)
            serializer.is_valid()
            print("seri is valid?: ", serializer.is_valid())
            print("On update method")
            print("n[id]", n)
            notificationId = n.get("id")
            Notification.objects.update_or_create(
            id=notificationId,
            defaults={"view": True}
            )
        return Response(status=HTTP_201_CREATED)

class ProfileNotificationDetailView(RetrieveUpdateDestroyAPIView):
    parser_classes = (MultiPartParser, FormParser)
    queryset = Notification.objects.all()
    print("queryset from ProfileNotificationDetailView")
    print(queryset)
    serializer_class = NotificationSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self, *args, **kwargs):
        try:
            print("ProfileNotificationDetailView")
            userId = self.kwargs.get('username')
            articleId = self.kwargs.get('pk')
            user = User.objects.get(username=userId)
            profile_article_detail = Notification.objects.get(user=user.id, id=articleId)
            NotificationSerializer(profile_article_detail)
            return profile_article_detail
        except ObjectDoesNotExist:
            raise Http404("You do not have an active order")
            return Response({"message": "You do not have an active order"}, status=HTTP_400_BAD_REQUEST)
    
    def update(self, request, *args, **kwargs):
        serializer = NotificationSerializer(data=request.data)
        serializer.is_valid()
        print("On update method")
        userId = self.kwargs.get('username')
        articleId = self.kwargs.get('pk')
        article = Notification.objects.get(id=articleId)
        print("self.request.FILES")
        print(self.request.FILES)
        print("self.request.data: ")
        print(self.request.data)
        request_data = json.loads((self.request.data["data"]))
        categories_var = article.categories.values()
        article.title = request_data.get("title")
        article.content = request_data.get("content")
        article_engagement = self.add_engagement(request_data.get("feedback_type"), article)
        article_categories = self.add_categories(request_data.get("categories"), article)
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
        
        return Response(serializer.data)
    
    def add_engagement(self, engagement, article):
        print("ENGAGEMENTS")
        print(engagement)
        print("article_engagement")
        print(article.engagement.values())
        engagement_id_list = [x["id"] for x in (article.engagement.values())]
        print(engagement_id_list)
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
                    print("e:")
                    print(e)
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
                        None

    def add_categories(self, categoriesD, article):
        print("CATEGORIES")
        print(categoriesD)
        print("article_categories")
        print(article.categories.values())
        category_id_list = [x["id"] for x in (article.categories.values())]
        for i in article.categories.values():
            print(i)
            print(i["id"])
            print(type(i["id"]))
            if str(i["id"]) not in categoriesD:
                print("removing")
                oldC = Category.objects.get(id=i["id"])
                article.categories.remove(oldC.id)
            else:
                for c in categoriesD:
                    print("c:")
                    print(c)
                    print(type(c))
                    if int(c) not in category_id_list:        
                        print("adding")
                        print(c)
                        print(type(c))
                        newC = Category.objects.get(id=c)
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
                        return