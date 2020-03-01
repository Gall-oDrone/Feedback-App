from rest_framework import serializers
from articlesApi.models import Article, Video, Comment, Category, Like, Rating, Image, CommentReply
from notificationsApi.models import Notification 
from users.models import User
from django.core.files.storage import FileSystemStorage
import json

class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value

class NotificationSerializer(serializers.ModelSerializer):
    target = StringSerializer(many=False)
    actor = StringSerializer(many=False)
    user = StringSerializer(many=False)
    

    class Meta:
        model = Notification
        fields = ("__all__")

    def create(self, request):
        data = request
        print("DATA")
        print(data)
        article = Notification()
        article.save()
        article.title = data["title"]
        article.content = data["content"]
        # article.author = data["user"]
        print("FILES I: ", files['file'])
        print("FILES II: ", files['media'])
        for f in files:
            myfile = files[f]
            print("file type: ", myfile.content_type.split('/')[0])
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
            print(myfile.name)
            print(article.thumbnail)
            article.thumbnail = "images/"+myfile.name
            print("article.thumbnail")
            print(article.thumbnail)

        for e in data['engagement']:
            # "2" phone call
            # "3" email 
            # "4" survey

            article.engagement.add(e)
        print("live her alo")
        for c in data['categories']:
            print(c)
            newC = Category()
            newC.title = c
            article.categories.add(newC.title)

        article.save()
        return article

    def update_likes(self, request):
        data = request.data
        print('update_likes data: ')
        print(data)
        article = Notification(pk='id')
        article.likes_count += data
        article.save()
        return article
    
    def add_star(self, request):
        add_star = Notification.rating_count + 1
    
    def add_comment(self, request):
        add_comment = Notification.comment_count + 1

    def count_likes(self, request):
        add_like = Notification \
            .objects \
            .values("tags__tag") \
            .annotate(Count("tags__tag"))        
        return queryset

    def stars_count(self, request):
        queryset = Notification \
            .objects \
            .values("tags__tag") \
            .annotate(Count("tags__tag"))        
        return queryset

class ProfileNotificationListSerializer(serializers.ListSerializer):
    child = NotificationSerializer()
    allow_null = True
    many = True

class ProfileNotificationListUpdateSerializer(serializers.ListSerializer):
    child = NotificationSerializer()
    allow_null = True
    many = True

class LikeSerializer(serializers.ModelSerializer):
    user = StringSerializer(many=False)
    # user_name = serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model = Like
        fields = ("id", 'user', "liked", "article")
    
    def create_like(self, request):
        data = request.data
        print("DATA LikeSerializer")
        print(data)
        like = Like()
        like.user = User.objects.get(username=data["username"])
        like.liked = data["liked"]
        like.article = Notification.objects.get(id=data["article"])
        like.save()
        return like

class LikeListSerializer(serializers.ListSerializer):
    child = LikeSerializer()
    allow_null = True
    many = True

class RatingSerializer(serializers.ModelSerializer):
    user = StringSerializer(many=False)
    class Meta:
        model = Rating
        fields = ('user', "rate", "article")

    def create_rate(self, request):
        data = request.data
        print("DATA RatingSerializer")
        print(data)
        rating = Rating()
        rating.user = User.objects.get(username=data["username"])
        rating.rate = data["rate"]
        rating.article = Notification.objects.get(id=data["articleID"])
        rating.save()
        return rating

class CommentSerializer(serializers.ModelSerializer):
    user = StringSerializer(many=False)
    article = StringSerializer(many=False)
    content = StringSerializer(many=False)
    liked = StringSerializer(many=False)
    disliked = StringSerializer(many=False)
    like_counter = StringSerializer(many=False)
    dislike_counter = StringSerializer(many=False)
    comment_reply = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ("id", 'user', "article", "content", "liked", "disliked", "like_counter", "dislike_counter", "reply_to", "replies", "comment_reply")
    
    def get_comment_reply(self, obj):
        # obj is an survey
        print("OBJ", obj.id)
        questions = CommentReplySerializer(obj.comment_reply.filter(comment_id=obj.id), many=True).data
        print("ASDADASDASSD", questions)
        return questions

    def create_comment(self, request):
        data = request.data
        print("DATA CommentSerializer")
        print(data)
        comment = Comment()
        comment.user = User.objects.get(username=data["username"])
        comment.content = data["content"]
        comment.liked = data["like"]
        comment.disliked = data["dislike"]
        comment.reply_to = Comment.objects.get(id=data["reply_to"])
        comment.article = Notification.objects.get(id=data["articleID"])
        comment.save()
        if data["reply_to"] != None:
            replyC = Comment(id=data["reply_to"])
            replyC.replies.add(comment.id)
        return comment
    
    def upload_comment(self, request):
        data = request.data
        print("DATA CommentSerializer upload ")
        print(data)
        
        return

class CommentListSerializer(serializers.ListSerializer):
    child = CommentSerializer()
    allow_null = True
    many = True

class NotificationFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ("__all__")


class VideoFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ("__all__")


class ImageFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ("__all__")