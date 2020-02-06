from rest_framework import viewsets
from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.response import Response
from rest_framework.status import(
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST
)
from .models import Survey, SurveyChoices, GradedSurvey
from .serializers import SurveySerializer, SurveyChoicesSerializer, GradedSurveySerializer


class SurveyViewSet(viewsets.ModelViewSet):
    serializer_class = SurveySerializer
    queryset = Survey.objects.all()

    def create(self, request):
        serializer = SurveySerializer(data=request.data)
        if serializer.is_valid():
            survey = serializer.create(request)
            if survey:
                return Response(status=HTTP_201_CREATED)
        return Response(status=HTTP_400_BAD_REQUEST)


class SurveyChoicesViewSet(viewsets.ModelViewSet):
    serializer_class = SurveyChoicesSerializer
    queryset = SurveyChoices.objects.all()


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
