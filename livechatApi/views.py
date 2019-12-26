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
from livechatApi.models import Sender, Recipient, Category, Request
from users.models import User
from .serializers import LCRequestSerializer
from analytics.models import View
from django.http import Http404
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
    DestroyAPIView,
    RetrieveUpdateDestroyAPIView
)

class LCRequestListView(ListAPIView):
    # model = LCRequest
    queryset = LCRequest.objects.all()
    print("queryset List view")
    print(queryset)
    serializer_class = LCRequestSerializer
    permission_classes = (permissions.AllowAny,)

    def category_count():
        queryset = LCRequest \
            .objects \
            .values("category__category") \
            .annotate(Count("category__category"))
        return queryset

    def get_sender(user):
        qs = Author.objects.filter(user=user)
        if qs.exists():
            return qs[0]
        return None


class LCRequestDetailView(RetrieveAPIView):
    queryset = LCRequest.objects.all()
    serializer_class = LCRequestSerializer
    permission_classes = (permissions.AllowAny,)


class LCRequestCreateView(CreateAPIView):
    queryset = LCRequest.objects.all()
    print("queryset Create view")
    print(queryset)
    serializer_class = LCRequestSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        print("request from LCRequestCreateView")
        print(request.data)
        serializer = LCRequestSerializer(data=request.data)
        serializer.is_valid()
        print(serializer.is_valid())
        create_lcrequest = serializer.create(request)
        if create_lcrequest:
            return Response(status=HTTP_201_CREATED)
        return Response(status=HTTP_400_BAD_REQUEST)

class LCRequestDeleteView(DestroyAPIView):
    queryset = LCRequest.objects.all()
    serializer_class = LCRequestSerializer
    permission_classes = (permissions.IsAuthenticated,)
