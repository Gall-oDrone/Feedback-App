from django.contrib.auth import get_user_model
from django.shortcuts import render, get_object_or_404
from .models import Chat, Contact

User = get_user_model()


def get_last_10_messages(chatId):
    chat = get_object_or_404(Chat, id=chatId)
    return chat.messages.order_by('-timestamp').all()[:10]


def get_user_contact(username):
    print("0O: ", username)
    user = get_object_or_404(User, username=username)
    return get_object_or_404(Contact, user=user)


def get_current_chat(chatId):
    print("chatId: ", chatId)
    return get_object_or_404(Chat, id=chatId)

def get_last_5_messages(username):
    try:
        userId = User.objects.get(username=username).id
        message = Chat.objects.filter(user=userId)
        all_messages = Chat.objects.filter(user=userId).count()
        first_messages = message.order_by('-timestamp').all()[:5].count()
        hasMore = all_messages - first_messages
        if(hasMore > 0):
            return message.order_by('-timestamp').all()[:5], True
        else:
            return message.order_by('-timestamp').all()[:5], False
    except:
        return None, False

def load_more(data):
    userId = User.objects.get(username=data['username']).id
    limit = data['limit']
    offset = data['offset']
    message = Chat.objects.filter(user=userId)
    all_messages = Chat.objects.filter(user=userId).count()
    if int(offset) or int(offset) + int(limit) < all_messages:
        return message.order_by('-timestamp').all()[int(offset): int(offset) + int(limit)], True
    else:
        return None

def get_views(username):
    userId = User.objects.get(username=username).id
    unviewed = Chat.objects.filter(user=userId, view=False).count()
    return unviewed

def get_user_notifications(username):
    userId = User.objects.get(username=username).id
    return get_object_or_404(Chat, user=userId)

def update_user_notifications(username):
    userId = User.objects.get(username=username).id
    message = Chat.objects.filter(user=userId)
    for n in message:
        n.view = True
        n.save()