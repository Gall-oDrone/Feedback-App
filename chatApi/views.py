from django.contrib.auth import get_user_model
from rest_framework import permissions
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
    DestroyAPIView,
    UpdateAPIView
)
from chatApi.models import Chat, Contact, Callers, Callees
from chatApi.views2 import get_user_contact
from .serializers import ChatSerializer, ChatStatusSerializer, CallerCandidatesSerializer, CalleeCandidatesSerializer, Participants

User = get_user_model()


class ChatListView(ListAPIView):
    serializer_class = ChatSerializer
    permission_classes = (permissions.AllowAny, )

    def get_queryset(self):
        queryset = Chat.objects.all()
        username = self.request.query_params.get('username', None)
        if username is not None:
            contact = get_user_contact(username)
            queryset = contact.chats.all()
        return queryset


class ChatDetailView(RetrieveAPIView):
    queryset = Chat.objects.all()
    serializer_class = Participants
    permission_classes = (permissions.AllowAny, )

class ChatParticipantsView(ListAPIView):
    queryset = Contact.objects.all()
    serializer_class = Participants
    permission_classes = (permissions.AllowAny, )

    def get_object(self, **kwargs):
        chatId = self.kwargs.get('pk')
        print("BULOCK")
        par = Contact.objects.filter(chats=chatId)
        pars = []
        for p in par:
            pars.append(p.user)
        print("PARS: ", pars, par)
        return par

# class ChatParticipantsView(ListAPIView):
    # queryset = Contact.objects.all()
    # serializer_class = Participants
    # permission_classes = (permissions.AllowAny, )

    # def get_object(self, **kwargs):
    #     chatId = self.kwargs.get('pk')
    #     par = Contact.objects.filter(chats=chatId)
    #     pars = []
    #     for p in par:
    #         pars.append(p.user)
    #     print(pars)
    #     return par

class ChatStatusView(RetrieveAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatStatusSerializer
    permission_classes = (permissions.AllowAny, )

    def get_object(self, **kwargs):
        chatId = self.kwargs.get('pk')
        chat = Chat.objects.get(id=chatId).video_disabled
        status = {'video_disabled': chat}
        print("CHAT status view GET", chat)
        return status


class ChatCreateView(CreateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = (permissions.IsAuthenticated, )


class ChatUpdateView(UpdateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = (permissions.IsAuthenticated, )


class ChatDeleteView(DestroyAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = (permissions.IsAuthenticated, )

class CallerCreateView(CreateAPIView):
    queryset = Callers.objects.all()
    serializer_class = CallerCandidatesSerializer
    permission_classes = (permissions.IsAuthenticated, )

class CalleeCreateView(CreateAPIView):
    queryset = Callees.objects.all()
    serializer_class = CalleeCandidatesSerializer
    permission_classes = (permissions.IsAuthenticated, )

class VideoChatDetailView(RetrieveAPIView):
    serializer_class = ChatSerializer
    permission_classes = (permissions.AllowAny, )

    def get_queryset(self, **kwargs):
        queryset = Chat.objects.all()
        chatId = self.kwargs.get('pk')
        # chatId = self.request.query_params.get('roomID', None)
        # if username is not None and chatID is not None:
        #     contact = get_user_contact(username)
        #     queryset = Chat.objects.filter(pk=chatId).participants
        #     del queryset["messages"]
        queryset = Chat.objects.filter(pk=chatId)
        print("DODO", queryset.values())
        return queryset
