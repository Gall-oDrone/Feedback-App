from rest_framework import viewsets, permissions
from rest_framework.response import Response
from django.shortcuts import get_object_or_404, redirect, reverse
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.status import(
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST
)
from .models import Survey, SurveyUseCase, Choice, GradedSurvey, SurveyData, SurveyCounter, Question
from users.models import User
from articlesApi.models import Article
from .serializers import (SurveySerializer, 
    SurveyChoicesSerializer, 
    GradedSurveySerializer, 
    QuestionSerializer, 
    SurveyListSerializer,
    ProfileSurveyListSerializer
    )
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
    DestroyAPIView,
    UpdateAPIView,
    RetrieveUpdateDestroyAPIView
)

class SurveyCreateView(CreateAPIView):
    serializer_class = SurveySerializer
    queryset = Survey.objects.all()
    permission_classes = (permissions.IsAuthenticated,)

    def create(self, request, *args, **kwargs):
        # s_counter = self.kwargs.get('number')
        print("request from SurveyCreateView")
        if(SurveyCounter.objects.values() == 5):
            return Response("You reached the limit number of surveis!!")
        else: 
            print("survey counter < 5")
            serializer = SurveySerializer(data=request.data)
            if serializer.is_valid():
                post_survey = serializer.create(request)
                if post_survey:
                    s_counter = SurveyCounter.objects.update(survey_counter=+1)
                    return Response(status=HTTP_201_CREATED)
            return Response(status=HTTP_400_BAD_REQUEST)

class SurveyListView(ListAPIView):
    serializer_class = SurveyListSerializer
    queryset = Survey.objects.all()
    permission_classes = (permissions.AllowAny,)
    if(len(SurveyUseCase.objects.all()) == 0):
        for b in SurveyUseCase.CHOICES:
            bachelor = SurveyUseCase.objects.create(survey_use_case=b[0])

    # def get_queryset(self):
    #     queryset = Survey.objects.all()
    #     return queryset

class SurveyDetailView(RetrieveAPIView):
    serializer_class = SurveySerializer
    queryset = Survey.objects.all()
    
    def get_object(self, *args, **kwargs):
        try:
            print("SurveyDetailView")
            queryset = Survey.objects.all()
            articleID = self.kwargs.get('pk')
            queryset = queryset.get(article=articleID)
            SurveySerializer(queryset)
            return queryset
        except ObjectDoesNotExist:
            raise Http404("You do not have an active order")
            return Response({"message": "You do not have an active order"}, status=HTTP_400_BAD_REQUEST)

class SurveyChoicesViewSet(viewsets.ModelViewSet):
    serializer_class = SurveyChoicesSerializer
    queryset = Choice.objects.all()


class GradedSurveyListView(ListAPIView):
    serializer_class = GradedSurveySerializer
    queryset = GradedSurvey.objects.all()

    def get_queryset(self):
        queryset = GradedSurvey.objects.all()
        username = self.request.query_params.get('username', None)
        if username is not None:
            queryset = queryset.filter(student__username=username)
        return queryset

class GradedSurveyCreateView(CreateAPIView):
    serializer_class = GradedSurveySerializer
    queryset = GradedSurvey.objects.all()

    def post(self, request):
        print(request.data)
        serializer = GradedSurveySerializer(data=request.data)
        serializer.is_valid()
        graded_survey = serializer.create(request)
        if graded_survey:
            return Response(status=HTTP_201_CREATED)
        return Response(status=HTTP_400_BAD_REQUEST)

class GradedSurveyDetailView(RetrieveAPIView):
    serializer_class = GradedSurveySerializer
    queryset = Survey.objects.all()

    def get_object(self, *args, **kwargs):
        try:
            print("GradedSurveyDetailView")
            articleId = User.objects.get(username=self.kwargs.get('articleId'))
            survey_detail = Survey.objects.get(article=userId)
            GradedSurveySerializer(survey_detail)
            return survey_detail
        except ObjectDoesNotExist:
            raise Http404("You do not have an active order")
            return Response({"message": "You do not have an active order"}, status=HTTP_400_BAD_REQUEST)

class ProfileSurveyListView(RetrieveAPIView):
    serializer_class = ProfileSurveyListSerializer
    queryset = Survey.objects.all()
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self, *args, **kwargs):
        try:
            print("ProfileSurveyListView")
            userId = User.objects.get(username=self.kwargs.get('username'))
            profile_survey_list = Survey.objects.filter(teacher=userId)
            print("FILTER")
            ProfileSurveyListSerializer(profile_survey_list)
            if len(profile_survey_list) == 0:
                return None
            else:
                return profile_survey_list
        except ObjectDoesNotExist:
            raise Http404("You do not have an active order")
            return Response({"message": "You do not have an active order"}, status=HTTP_400_BAD_REQUEST)


class ProfileSurveyDetailView(RetrieveUpdateDestroyAPIView):
    serializer_class = SurveySerializer
    queryset = Survey.objects.all()
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self, *args, **kwargs):
        try:
            print("ProfileSurveyDetailView")
            userId = self.kwargs.get('username')
            surveyId = self.kwargs.get('pk')
            user = User.objects.get(username=userId)
            profile_survey_detail = Survey.objects.get(teacher=user.id, id=surveyId)
            SurveySerializer(profile_survey_detail)
            return profile_survey_detail
        except ObjectDoesNotExist:
            raise Http404("You do not have an active order")
            return Response({"message": "You do not have an active order"}, status=HTTP_400_BAD_REQUEST)
    
    def update(self, request, *args, **kwargs):
        print(request.data)
        serializer = SurveySerializer(data=request.data)
        serializer.is_valid()
        print("On update method")
        print("Data on updata me: ", request.data)
        print("Data on updata me: ", request.data.get("id"))
        userId = self.kwargs.get('username')
        surveyId = self.kwargs.get('pk')
        survey = Survey.objects.get(id=surveyId)
        article = Article.objects.get(
            title=self.request.data.get("article"))
        print("articleID: ", article)
        # survey.title = request_data.get("title")
        # survey.teacher = request_data.get("teacher")
        survey.article = article
        survey.save()
        # survey.update(
        #         article= Article.objects.get(title=request_data.get("article").id)
        #         )
        
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

    def delete(self, *args, **kwargs):
        try:
            print("ProfileArticleDetailView")
            userId = self.kwargs.get('username')
            surveyId = self.kwargs.get('pk')
            user = User.objects.get(username=userId)
            profile_survey_detail = Survey.objects.delete(teacher=user.id, id=surveyId)
            SurveySerializer(profile_survey_detail)
            return profile_survey_detail
        except ObjectDoesNotExist:
            raise Http404("You do not have an active order")
            return Response({"message": "You do not have an active order"}, status=HTTP_400_BAD_REQUEST)

class GradedSurveyCreateView(CreateAPIView):
    serializer_class = GradedSurveySerializer
    queryset = GradedSurvey.objects.all()
    permission_classes = (permissions.IsAuthenticated,)

    def create(self, request, *args, **kwargs):
        print("request from GradedSurveyCreateView")
        serializer = GradedSurveySerializer(data=request.data)
        print("#1", request.data)
        print("#2", serializer)
        if serializer.is_valid():
            print("#3")
            post_graded_survey = serializer.create(request)
            if post_graded_survey:
                return Response(status=HTTP_201_CREATED)
        print("#3", serializer.errors)
        return Response(status=HTTP_400_BAD_REQUEST)

class GradedSurveyListView(ListAPIView):
    serializer_class = SurveyListSerializer
    queryset = Survey.objects.all()

    # def get_queryset(self):
    #     queryset = Survey.objects.all()
    #     return queryset




class ProfileGradedSurveyListView(RetrieveUpdateDestroyAPIView):
    serializer_class = ProfileSurveyListSerializer
    queryset = GradedSurvey.objects.all()

class ProfileGradedSurveyDetailView(RetrieveUpdateDestroyAPIView):
    serializer_class = GradedSurveySerializer
    queryset = GradedSurvey.objects.all()