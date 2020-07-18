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
from rest_framework import permissions
from .models import Project, Tag, Category, Like, Upvote, Rating, Comment, Video, Image, FeedbackTypes, DevPhases, CrowdfundingTypes
from users.models import User
from .serializers import (ProjectSerializer,
     ProjectFeatureSerializer,
     VideoFormSerializer,
     CommentSerializer,
     LikeSerializer,
     LikeListSerializer,
     UpvoteSerializer,
     UpvoteListSerializer,
     RatingSerializer,
     CommentListSerializer,
     ImageFormSerializer,
     ProjectDetailSerializer,
     ProfileProjectListSerializer)
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


class ProjectFeatureView():
    # queryset = Project.objects.all()
    serializer_class = ProjectFeatureSerializer
    queryset = Project.objects.all()
    permission_classes = (permissions.AllowAny,)

    def index(request):
        queryset = Project.objects.all()
        featured = Project.objects.filter(featured=True)
        latest = Post.objects.order_by("-timestamp")[0:3]

        context = {
            "object_list": featured,
            "latest": latest
        }
        return


class ProjectListView(ListAPIView):
    # model = Project
    queryset = Project.objects.all().order_by("-timestamp")
    print("queryset List view")
    #print(queryset)
    serializer_class = ProjectSerializer
    permission_classes = (permissions.AllowAny,)
    if(len(FeedbackTypes.objects.all()) == 0):
        for b in FeedbackTypes.CHOICES:
            bachelor = FeedbackTypes.objects.create(feedback_type=b[0])
    if(len(DevPhases.objects.all()) == 0):
        for m in DevPhases.CHOICES:
            master = DevPhases.objects.create(dev_phase=m[0])
    if(len(CrowdfundingTypes.objects.all()) == 0):
        for p in CrowdfundingTypes.CHOICES:
            pHD = CrowdfundingTypes.objects.create(crowdfunding_type=p[0])

    def category_count():
        queryset = Project \
            .objects \
            .values("categories__title") \
            .annotate(Count("categories__title"))
        return queryset

    def tags_count():
        queryset = Project \
            .objects \
            .values("tags__tag") \
            .annotate(Count("tags__tag"))
        return queryset

    def upvotes_count():
        queryset = Project \
            .objects \
            .values("tags__tag") \
            .annotate(Count("tags__tag"))
        return queryset

    def stars_count():
        queryset = Project \
            .objects \
            .values("tags__tag") \
            .annotate(Count("tags__tag"))
        return queryset

    def showproject_video(request):
        lastproject_video = Video.objects.last()
        project_videofile = lastproject_video.project_videofile
        form = VideoFormSerializer(request.POST or None, request.FILES or None)
        if form.is_valid():
            form.save()
        context = {'project_videofile': project_videofile,
                   'form': form
                   }
        return render(request, 'Blog/project_videos.html', context)

    def get_author(user):
        qs = Author.objects.filter(user=user)
        if qs.exists():
            return qs[0]
        return None


class ProjectDetailView(RetrieveAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectDetailSerializer
    permission_classes = (permissions.AllowAny,)

class ProjectCreateView(CreateAPIView):
    parser_classes = (MultiPartParser, FormParser)
    queryset = Project.objects.all()
    print("queryset Create view")
    #print(queryset)
    serializer_class = ProjectSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        print("request from ProjectCreateView")
        print("request", request)
        print("req.data",request.data)
        print("req.Files",request.FILES)
        request_data = json.loads((self.request.data["data"]))
        request_files = (self.request.FILES)
        serializer = ProjectSerializer(data=request_data)
        serializer.is_valid()
        print(serializer.is_valid())
        create_project = serializer.create(request_data, request_files)
        if create_project:
            return Response(status=HTTP_201_CREATED)
        return Response(status=HTTP_400_BAD_REQUEST)

    # def post(self, request):
    #     print(request.data)
    #     serializer = ProjectSerializer(data=request.data)
    #     serializer.is_valid()
    #     creating_Project = serializer.create(request)
    #     if creating_Project:
    #         return Response(status=HTTP_201_CREATED)
    #     return Response(status=HTTP_400_BAD_REQUEST)


class ProjectDeleteView(DestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = (permissions.IsAuthenticated,)


class ProjectUpdateView(UpdateAPIView):
    queryset = Project.objects.all()
    print("queryset from ProjectUpdateView")
    #print(queryset)
    serializer_class = ProjectSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def update_upvotes_count(self, request):
        print("request from ProjectUpdateView")
        # print(request.data)
        Upvote.objects.filter(project_id=self.request.data.get("project_id")).filter(
            user_id=self.request.data.get("user_id")).values("liked")[0]["liked"]
        Upvote.objects.filter(project_id=self.request.data.get(
            "project")).filter(liked=True).Count()
        serializer = ProjectSerializer(data=request.data)
        serializer.is_valid()
        print(serializer.is_valid())
        update_project = serializer.update_upvotes(request)
        if update_project:
            return Response(status=HTTP_201_CREATED)
        return Response(status=HTTP_400_BAD_REQUEST)

class ProfileProjectListView(RetrieveAPIView):
    queryset = Project.objects.all()
    print("queryset from ProfileProjectListView")
    #print(queryset)
    serializer_class = ProfileProjectListSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self, *args, **kwargs):
        try:
            print("ProfileProjectListView")
            userId = self.kwargs.get('username')
            user = User.objects.get(username=userId)
            # projectId = Project.objects.get(title=project).id
            profile_project_list = Project.objects.filter(author=user.id)
            print("FILTER")
            print(profile_project_list)
            ProfileProjectListSerializer(profile_project_list)
            if len(profile_project_list) == 0:
                return None
            else:
                return profile_project_list
        except ObjectDoesNotExist:
            raise Http404("You do not have an active order")
            return Response({"message": "You do not have an active order"}, status=HTTP_400_BAD_REQUEST)


    # def index(request):
    # if request.method == "POST":
    #     project = request.POST['project']
    #     tag = request.POST['tag']
    #     projects = Project.objects.create(post=project)
    #     tags, created = Tag.objects.get_or_create(tag=tag)
    #     tp = Tagging(posts=projects, taggings=tags)
    #     tp.save()
    #     return redirect('index')
    # return render(request, 'index.html')

class ProfileProjectDetailView(RetrieveUpdateDestroyAPIView):
    parser_classes = (MultiPartParser, FormParser)
    queryset = Project.objects.all()
    print("queryset from ProfileProjectDetailView")
    #print(queryset)
    serializer_class = ProjectSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self, *args, **kwargs):
        try:
            print("ProfileProjectDetailView")
            userId = self.kwargs.get('username')
            projectId = self.kwargs.get('pk')
            user = User.objects.get(username=userId)
            profile_project_detail = Project.objects.get(author=user.id, id=projectId)
            ProjectSerializer(profile_project_detail)
            return profile_project_detail
        except ObjectDoesNotExist:
            raise Http404("You do not have an active order")
            return Response({"message": "You do not have an active order"}, status=HTTP_400_BAD_REQUEST)
    
    def update(self, request, *args, **kwargs):
        serializer = ProjectSerializer(data=request.data)
        serializer.is_valid()
        print("On update method")
        userId = self.kwargs.get('username')
        projectId = self.kwargs.get('pk')
        project = Project.objects.get(id=projectId)
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
        categories_var = project.categories.values()
        project.title = request_data.get("title")
        project.content = request_data.get("content")
        project_project_feedback = self.add_project_feedback(request_data.get("feedback_type"), project)
        project_categories = self.add_categories(request_data.get("categories"), project)
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
        if file_type == "project_video":
            print("myfile.name is project_video")
            project_videoD = Video()
            filename = fs.save("project_videos/"+myfile.name, myfile)
            uploaded_file_url = fs.url(filename)
            project_videoD.project_videofile = "project_videos/"+myfile.name
            project_videoD.save()
            print("project_videoD, ", project_videoD)
            print("project_videoD.id, ", project_videoD.id)
            project.project_video= Video(id=project_videoD.id)
            # raise ValidationError('Unsupported file extension.')
        else: 
            print("myfile.name is image")
            filename = fs.save("images/"+myfile.name, myfile)
            uploaded_file_url = fs.url(filename)
            print("uploaded_file_url")
            print(uploaded_file_url)
            # with open(uploaded_file_url) as f:
            #     data = f.read()
            #     project.project_image.save("images/"+myfile.name, ContentFile(data))
            print(myfile.name)
            print(myfile.name)
            # print(os.path.basename(uploaded_file_url))
            print(project.project_image)
            project.project_image = "images/"+myfile.name
            print("project.project_image")
            print(project.project_image)
        project.save()
        # project.project_image = self.request.data["file"]get("project_image")
        # project.update(
        #         title=self.request.data.get("title"),
        #         content=self.request.data.get("content"),
        #         categories= self.add_categories(self.request.data.get("categories"), project),
        #         project_feedback= self.add_project_feedback(self.request.data.get("feedback_type"), project),
        #         project_image=self.request.data.get("file"))
        
        return Response(serializer.data)
    
    def add_project_feedback(self, project_feedback, project):
        print("ENGAGEMENTS")
        print(project_feedback)
        print("project_project_feedback")
        print(project.project_feedback.values())
        project_feedback_id_list = [x["id"] for x in (project.project_feedback.values())]
        print(project_feedback_id_list)
        for i in project.project_feedback.values():
            print(i)
            print(i["id"])
            print(type(i["id"]))
            if str(i["id"]) not in project_feedback:
                print("removing")
                oldE = FeedbackTypes.objects.get(id=i["id"])
                project.project_feedback.remove(oldE.id)
            else:
                for e in project_feedback:
                    print("e:", e)
                    if int(e) not in project_feedback_id_list:        
                        print("adding")
                        print(e)
                        newE = FeedbackTypes.objects.get(id=e)
                        # newC = Category()
                        print(newE)
                        print(newE.id)
                        # newC.id = c
                        print("WHAT ?")
                        # print(project.categories.category_id)
                        project.project_feedback.add(newE.id)
                        print("WHAT 2?")
                    else:
                        None

    def add_categories(self, categoriesD, project):
        print("CATEGORIES")
        print(categoriesD)
        print("project_categories")
        print(project.categories.values())
        category_id_list = [x["id"] for x in (project.categories.values())]
        for i in project.categories.values():
            print(i)
            print(i["id"])
            print(type(i["id"]))
            if str(i["id"]) not in categoriesD:
                print("removing")
                oldC = Category.objects.get(id=i["id"])
                project.categories.remove(oldC.id)
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
                        # print(project.categories.category_id)
                        project.categories.add(newC.id)
                        print("WHAT 2?")
                    else:
                        print("None")
                        return
    def delete(self, *args, **kwargs):
        try:
            print("ProfileProjectDetailView")
            userId = self.kwargs.get('username')
            projectId = self.kwargs.get('pk')
            user = User.objects.get(username=userId)
            profile_project_detail = Project.objects.delete(author=user.id, id=projectId)
            ProjectSerializer(profile_project_detail)
            return profile_project_detail
        except ObjectDoesNotExist:
            raise Http404("You do not have an active order")
            return Response({"message": "You do not have an active order"}, status=HTTP_400_BAD_REQUEST)

class LikeListView(RetrieveUpdateDestroyAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeListSerializer
    permission_classes = (permissions.AllowAny,)

    def get_object(self):
        try:
            projectID = self.kwargs.get('pk')
            like = Like.objects.filter(project_id=projectID)
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
        if(self.request.user.id != None):
            userId = self.kwargs.get(self.lookup_url_kwarg)
            projectId = self.kwargs.get("pk")
            userId = self.request.user.id
            print("user EHRENO")
            print(self.lookup_url_kwarg)
            print(userId)
            queryset = Like.objects.filter(user=userId).filter(project_id=projectId)
            # print(queryset.values())
            return queryset
        else: 
            return Response({"message": "Unregistre user"}, status=HTTP_400_BAD_REQUEST)
    
    def update(self, request, *args, **kwargs):
        serializer = LikeSerializer(data=request.data)
        serializer.is_valid()
        print("On update method")
        print(self.request.data)
        like, created = Like.objects.update_or_create(
            user_id=self.request.user.id, 
            project_id=self.request.data.get("project"), 
            defaults={"like": self.request.data.get("liked")})
        Project.objects.update_or_create(
            id=self.request.data.get("project"),
            defaults={"likes_count": Like.objects.filter(
            project_id=self.request.data.get("project")).filter(like=True).count()}
            )
        return Response(serializer.data)

class UpvoteListView(RetrieveUpdateDestroyAPIView):
    queryset = Upvote.objects.all()
    serializer_class = UpvoteListSerializer
    permission_classes = (permissions.AllowAny,)

    def get_object(self):
        try:
            projectID = self.kwargs.get('pk')
            like = Upvote.objects.filter(project_id=projectID)
            return like
        except ObjectDoesNotExist:
            raise Http404("You do not have an active order")
            return Response({"message": "You do not have an active order"}, status=HTTP_400_BAD_REQUEST)

class UpvoteDetailView(RetrieveUpdateDestroyAPIView):
    # queryset = Upvote.objects.all()
    serializer_class = UpvoteSerializer
    permission_classes = (permissions.AllowAny,)
    lookup_field = 'user'
    lookup_url_kwarg = "user_id"

    def get_queryset(self):
        userId = self.kwargs.get(self.lookup_url_kwarg)
        projectId = self.kwargs.get("pk")
        # userId = User.objects.get(username=username).id
        userId = User.objects.get(id=userId)
        print("user EHRENO")
        print(self.lookup_url_kwarg)
        print(userId)
        queryset = Upvote.objects.filter(user_id=userId).filter(project_id=projectId)
        # print(queryset.values())
        return queryset
    
    def update(self, request, *args, **kwargs):
        serializer = UpvoteSerializer(data=request.data)
        serializer.is_valid()
        print("On update method")
        print(self.request.data)
        print(self.request.data.get("project"))
        Upvote.objects.filter(user_id=self.request.data.get("user_id")).filter(project_id=self.request.data.get("project")).update(liked=self.request.data.get("liked"))
        Project.objects.update_or_create(
            id=self.request.data.get("project"),
            defaults={"upvotes_count": Upvote.objects.filter(
            project_id=self.request.data.get("project")).filter(liked=True).count()}
            )
        return Response(serializer.data)


class CreateUpvote(CreateAPIView):
    queryset = Upvote.objects.all()
    queryset2 = Project.objects.all().values()
    print("UpdateUpvote queryset")
    #print(queryset)
    # print(queryset2)
    print(Upvote.objects.values())
    serializer_class = UpvoteSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def create(self, request, *args, **kwargs):
        # print("request from UpdateUpvote")
        # print(request.data)
        # like = Upvote()
        # like.user = self.request.user
        # print("like.user")
        # print(like.user)
        # print(like.user_id)
        # like.user = request.user
        # print("like.user")
        # print(like.user)
        serializer = UpvoteSerializer(data=request.data)
        serializer.is_valid()
        print("Valid Update Upvote Serializer?")
        print(serializer.is_valid())
        print(self.request.data.get("project"))
        print(Upvote.objects.filter(project_id=self.request.data.get(
            "project")).filter(liked=True).count())
        if Upvote.objects.filter(project_id=self.request.data.get("project")).filter(user_id=self.request.data.get("user_id")).exists():
            if Upvote.objects.filter(project_id=self.request.data.get("project")).filter(user_id=self.request.data.get("user_id")).values("liked")[0]["liked"] == self.request.data.get("liked"):
                print("A?: User tries to like the project when is already liked")
                return Response({"message": "Project author can't liked its own projects"}, status=HTTP_400_BAD_REQUEST)
            else:
                obj = Upvote.objects.update_or_create(
                    project_id=self.request.data.get("project"),
                    user_id=self.request.data.get("user_id"),
                    defaults={"liked": self.request.data.get("liked")})
                art = Project.objects.update_or_create(
                    id=self.request.data.get("project"),
                    defaults={"upvotes_count": Upvote.objects.filter(
                        project_id=self.request.data.get("project")).filter(liked=True).count()}
                )
                return Response(status=HTTP_201_CREATED)

        else:
            create_like = serializer.create_like(request)
            if create_like:
                art = Project.objects.update_or_create(
                    id=self.request.data.get("project"),
                    defaults={"upvotes_count": Upvote.objects.filter(
                        project_id=self.request.data.get("project")).filter(liked=True).count()}
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
        if Rating.objects.filter(project_id=self.request.data.get("projectID")).filter(user__username=self.request.data.get("username")).exists():
            return Response(status=HTTP_400_BAD_REQUEST)
        else:
            create_rate = serializer.create_rate(request)
            if create_rate:
                wgh_mean = 0
                wgh_den = 0
                for val in whg_val:
                    wgh_mean += val * \
                        Rating.objects.filter(project_id=self.request.data.get(
                            "projectID")).filter(rate=val).count()
                    wgh_den += Rating.objects.filter(
                        project_id=self.request.data.get("projectID")).filter(rate=val).count()

                art = Project.objects.update_or_create(
                    id=self.request.data.get("projectID"),
                    defaults={"rating_count": Rating.objects.filter(
                        project_id=self.request.data.get("projectID"))
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
    # print(queryset.values())
    def get_object(self):
        try:
            print("Comment filter")
            projectID = self.kwargs.get('pk')
            comment = Comment.objects.filter(project_id=projectID)
            if(projectID != None):
                Project.objects.filter(
                        id=projectID).update(comment_count=comment.count())
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
            projectID = self.kwargs.get('pk')
            commentID = self.kwargs.get('id')
            comment = Comment.objects.get(project=projectID, id=commentID)
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
            art = Project.objects.update_or_create(
                id=self.request.data.get("projectID"),
                defaults={"comment_count": Comment.objects.filter(
                    project=self.request.data.get("projectID"))
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

    def update_upvotes_count(self, request, *args, **kwargs):
        print("request from UpdateComment 2")
        print(request.data)
        serializer = CommentSerializer(data=request.data)
        serializer.is_valid()
        upload_comment = serializer.upload_comment(request)
        print(Comment.objects.filter(id=self.request.data.get("id")).filter(project_id=self.request.data.get("project_id")).filter(
            user_id=self.request.data.get("user_id")).values())
        Comment.objects.filter(id=self.request.data.get("id")).filter(project_id=self.request.data.get("project_id")).filter(
            user_id=self.request.data.get("user_id")).values("liked")[0]["liked"]
        Comment.objects.filter(project_id=self.request.data.get(
            "project")).filter(liked=True).Count()
        serializer = ProjectSerializer(data=request.data)
        serializer.is_valid()
        print(serializer.is_valid())
        update_project = serializer.update_upvotes(request)
        if update_project:
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

class ImageCreateView(CreateAPIView):
    parser_classes = (MultiPartParser, FormParser, FileUploadParser)
    queryset = Image.objects.all()
    serializer_class = ImageFormSerializer
    permission_classes = (permissions.AllowAny,)

    @csrf_exempt
    def post(self, request, *args, **kwargs):
        print("createImage at ImageViewSet")
        print(request.data)
        myfile = request.FILES['file']
        fs = FileSystemStorage()
        filename = fs.save(myfile.name, myfile)
        uploaded_file_url = fs.url(filename)
        imageSerializer = ImageFormSerializer(data=request.data)
        if imageSerializer.is_valid():
          imageSerializer.save()
          return Response(imageSerializer.data, status=status.HTTP_201_CREATED)
        else:
          return Response(imageSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ImageDestroyView(DestroyAPIView):
    parser_classes = (MultiPartParser, FormParser, FileUploadParser, JSONParser)
    queryset = Image.objects.all()
    serializer_class = ImageFormSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def delete(self, request, *args, **kwargs):
        print("createImage at ImageViewSet")
        print("self.request.FILES")
        print(self.request.FILES)
        print(request.objects.all())
        imageSerializer = ImageFormSerializer(data=request.data)
        if imageSerializer.is_valid():
          imageSerializer.save()
          return Response(imageSerializer.data, status=status.HTTP_201_CREATED)
        else:
          return Response(imageSerializer.errors, status=status.HTTP_400_BAD_REQUEST)