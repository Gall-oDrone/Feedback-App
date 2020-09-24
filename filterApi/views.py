from django.db.models import Q, Count
from django.shortcuts import render, get_object_or_404
from .models import Journal, Category
from articlesApi.models import Article, Category, Tag
from users.models import User, ProfileInfo, Universities, Degree, Bachelor, Master, Doctorate, Course
from surveyApi.models import Survey
from inquiriesApi.models import Inquiry, InquiryType, TargetAudience, Topic, PreferLanguage
from sessionsApi.models import Topic, Experience, Session
from workshopsApi.models import Workshop
from projectsApi.models import Project
from collaborationsApi.models import Collaboration
from .serializers import JournalSerializer
from articlesApi.serializers import ArticleSerializer, FeaturedArticleSerializer
from projectsApi.serializers import FeaturedProjectSerializer
from inquiriesApi.serializers import InquirySerializer, FeaturedInquirySerializer
from sessionsApi.serializers import SessionSerializer, FeaturedSessionSerializer
from collaborationsApi.serializers import FeaturedCollaborationSerializer
from workshopsApi.serializers import FeaturedWorkshopSerializer
from surveyApi.serializers import SurveySerializer


FeaturedProjectSerializer
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view

def is_valid_queryparam(param):
    return param != '' and param != 'null' and param is not None

def article_filter(request):
    qs = Article.objects.all()
    categories = Category.objects.all()
    tags = Tag.objects.all()
    title_contains_query = request.GET.get("title_contains")
    content_contains_query = request.GET.get("content_contains")
    id_exact_query = request.GET.get("id_exact")
    title_or_author_query = request.GET.get("title_or_author")
    category = request.GET.get("category")
    tag = request.GET.get("tag")

    if is_valid_queryparam(title_contains_query):
        qs = qs.article_filter(title__icontains=title_contains_query)

    elif is_valid_queryparam(id_exact_query):
        qs = qs.article_filter(id=id_exact_query)

    elif is_valid_queryparam(title_or_author_query):
        qs = qs.article_filter(Q(title__icontains=title_or_author_query)
                        | Q(author__name__icontains=title_or_author_query)
                        ).distinct()

    if is_valid_queryparam(category) and category != "Choose...":
        qs = qs.article_filter(categories__name=category)

    if is_valid_queryparam(tag) and tag != "Choose...":
        qs = qs.article_filter(tags__name=tag)

    return qs

def inquiry_filter(request):
    print("IN METHOD inquiry_filter")
    print(" request.data: ",  str(request.data))
    print(" request.GET.get(inquiry_type): ",  request.GET.get("inquiry_type"))
    print(" request.GET.get(university): ",  request.GET.get("university"))
    qs = Inquiry.objects.all()
    # qs = qs.inquiry_filter(types__name="class review")
    # categories = Category.objects.all()
    types = InquiryType.objects.all()
    audiences = TargetAudience.objects.all()
    topics = Topic.objects.all()
    university = Universities.objects.all()
    # languages = PreferLanguage.objects.all()
    title_contains_query = request.GET.get("title_contains")
    # content_contains_query = request.GET.get("content_contains")
    # title_or_author_query = request.GET.get("title_or_author")
    itype = request.GET.get("inquiry_type")
    print("itype: ", itype)
    audience = request.GET.get("audience")
    topic = request.GET.get("topic")
    university = request.GET.get("university")
    language = request.GET.get("language")

    if is_valid_queryparam(title_contains_query):
        print("TCQ: ", title_contains_query)
        qs = qs.filter(title__icontains=title_contains_query)
        print("qs: ", qs)

    # elif is_valid_queryparam(title_or_author_query):
    #     qs = qs.inquiry_filter(Q(title__icontains=title_or_author_query)
    #                     | Q(author__name__icontains=title_or_author_query)
    #                     ).distinct()
    if is_valid_queryparam(itype):
        print("TN: ", itype)
        qs = qs.filter(inquiry_type=InquiryType.objects.get(inquiry_type=itype).id)
        print(InquiryType.objects.get(inquiry_type=itype).id)
        print("qs: ", qs)

    if is_valid_queryparam(audience):
        print("TN: ", audience)
        qs = qs.filter(inquiry_audience=InquiryType.objects.get(target_audience=audience).id)
    
    if is_valid_queryparam(university):
        print("TN: ", university)
        qs = qs.filter(user_university=Universities.objects.get(university=university).id)

    if is_valid_queryparam(topic):
        print("TN: ", topic)
        qs = qs.filter(inquiry_topic=Topic.objects.get(topic=topic).id)

    if is_valid_queryparam(language):
        qs = qs.filter(language=PreferLanguage.objects.get(language=language).id)

    return qs

class ReactFilterView(generics.ListAPIView):
    serializer_class = InquirySerializer
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        print("get_queryset request.data: ",  str(self.request.data))
        # qs1 = article_filter(self.request)
        qs = inquiry_filter(self.request)
        print("ReactFilterView qs: ",qs)
        return qs
    
@api_view(["GET"])
def showMultipleModels(request):
    # request = self.context.get('request')
    articles = Article.objects.order_by("-timestamp")[0:5]
    workshops = Workshop.objects.all()
    collaborations = Collaboration.objects.all()
    inquiries = Inquiry.objects.order_by("-timestamp")[0:4]
    projects = Project.objects.all()
    sessions = Session.objects.all()
    articleSerializer = FeaturedArticleSerializer(articles, many=True, context={'request': request})
    workshopSerializer = FeaturedWorkshopSerializer(workshops, many=True, context={'request': request})
    collaborationSerializer = FeaturedCollaborationSerializer(collaborations, many=True, context={'request': request})
    inquirySerializer = FeaturedInquirySerializer(inquiries, many=True)
    projectSerializer = FeaturedProjectSerializer(projects, many=True, context={'request': request})
    sessionSerializer = FeaturedSessionSerializer(sessions, many=True, context={'request': request})
    resultModel = {
        "articles": articleSerializer.data, 
        "workshops": workshopSerializer.data, 
        "collabs": collaborationSerializer.data, 
        "inquiries":  inquirySerializer.data, 
        "projects":  projectSerializer.data,
        "sessions":  sessionSerializer.data
    }
    return Response(resultModel)