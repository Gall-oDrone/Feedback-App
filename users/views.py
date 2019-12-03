from rest_framework import viewsets
from django.shortcuts import render
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST

from .models import User
from .serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    def get(self, request, *args, **kwargs):
        print("current_user QS")
        print(current_user.id)
        return Response({'userID': request.user.id}, status=HTTP_200_OK)
    serializer_class = UserSerializer
    queryset = User.objects.all()
    # current_user = request.user
    
    print("USER QS")
    print(queryset)
