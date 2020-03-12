from django.db.models import Q, Count
from django.shortcuts import render, get_object_or_404
from .models import Journal, Category
from articlesApi.models import Article, Category, Tag
from inquiriesApi.models import Inquiry, InquiryType, TargetAudience, Topic, PreferLanguage
from .serializers import JournalSerializer
from articlesApi.serializers import ArticleSerializer
from inquiriesApi.serializers import InquirySerializer
from rest_framework import generics, permissions

def is_valid_queryparam(param):
    return param != '' and param is not None

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
    print(" request.data: ",  request.data)
    print(" request.GET.get(title_contains): ",  request.GET.get("itype"))
    qs = Inquiry.objects.all()
    qs = qs.inquiry_filter(types__name="class review")
    # categories = Category.objects.all()
    types = InquiryType.objects.all()
    audiences = TargetAudience.objects.all()
    # topics = Topic.objects.all()
    # languages = PreferLanguage.objects.all()
    title_contains_query = request.GET.get("title_contains")
    # content_contains_query = request.GET.get("content_contains")
    # title_or_author_query = request.GET.get("title_or_author")
    itype = request.GET.get("itype")
    print("itype: ", itype)
    audience = request.GET.get("audience")
    # topic = request.GET.get("topic")
    # langauge = request.GET.get("language")

    if is_valid_queryparam(title_contains_query):
        print("TCQ: ", title_contains_query)
        qs = qs.inquiry_filter(title__icontains=title_contains_query)
        print("qs: ", qs)

    # elif is_valid_queryparam(title_or_author_query):
    #     qs = qs.inquiry_filter(Q(title__icontains=title_or_author_query)
    #                     | Q(author__name__icontains=title_or_author_query)
    #                     ).distinct()

    if is_valid_queryparam(itype) and tag != "Choose...":
        print("TN: ", itype)
        qs = qs.inquiry_filter(types__name=itype)
        print("qs: ", qs)

    if is_valid_queryparam(audience) and tag != "Choose...":
        qs = qs.inquiry_filter(audiences__name=audience)
    # if is_valid_queryparam(topic) and tag != "Choose...":
    #     qs = qs.inquiry_filter(topics__name=topic)
    # if is_valid_queryparam(langauge) and tag != "Choose...":
    #     qs = qs.inquiry_filter(languages__name=langauge)

    return qs

def BootstrapFilterView(request):
    qs = filter(request)
    context = {
        'queryset': qs,
        "categories": Category.objects.all()
    }
    return render(request, "bootstrap_form.html", context)

class ReactFilterView(generics.ListAPIView):
    serializer_class = InquirySerializer
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        print("get_queryset request.data: ",  self.request.data)
        print("get_queryset self.request: ",  self.request)
        qs1 = article_filter(self.request)
        qs = inquiry_filter(self.request)
        print("ReactFilterView qs: ",qs)
        return qs
        