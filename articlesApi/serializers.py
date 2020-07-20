from rest_framework import serializers
from articlesApi.models import Article, Video, Comment, Category, Like, Rating, Image, CommentReply, FeedbackTypes
from users.models import User
from django.core.files.storage import FileSystemStorage
import json

class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value

class CommentReplySerializer(serializers.ModelSerializer):
    comment = StringSerializer(many=False)

    class Meta:
        model = CommentReply
        fields = ("id", "comment")

class ArticleSerializer(serializers.ModelSerializer):
    engagement = StringSerializer(many=True)
    categories = StringSerializer(many=True)
    author = StringSerializer(many=False)
    video = StringSerializer(many=False)
    

    class Meta:
        model = Article
        fields = ('id', 'title', 'content', 'timestamp',
                  'engagement', 'categories', 'author',
                  "comment_count", "view_count", "rating_count",
                    "likes_count", "view_count", "rating_count", "avg_rating",
                    "video", "thumbnail"
                  )

    def get_feedback_forms(self, obj):
        # obj is an assignment
        #choices = AssignmentChoiceSerializer(obj, many=False).data
        # print(choices)
        # return choices
        print("ArticleSerializer object")
        print(ArticleSerializer(obj, many=True).data)
        # return (ArticleSerializer(obj.choices.assignment_choices, many=True).data)

    def create(self, request, *args):
        data = request
        print("DATA")
        print(data)
        print("args: ", args)
        # print(self.args)
        files = args[0]
        article = Article()
        article.save()
        article.title = data["title"]
        article.content = data["content"]
        article.author = User.objects.get(username=data["user"])
        if files is dict:
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
            try:
                print("try")
                print(e)
                newE = FeedbackTypes()
                fts = FeedbackTypes.CHOICES
                for f in fts:
                    if(e == f[0]):
                        newE.feedback_type = e
                print(newE.feedback_type)
                print(newE)
                ftype = FeedbackTypes.objects.get(feedback_type=newE)
                print("ftype.id", ftype.id)
                article.engagement.add(ftype.id)
            except:
                print("except")
                print(e)
                newE = FeedbackTypes()
                fts = FeedbackTypes.CHOICES
                newE.feedback_type = e
                newE.save()
                print("End except")
                ftype = FeedbackTypes.objects.get(feedback_type=newE)
                print("ftype.id", ftype.id)
                article.engagement.add(ftype.id)
        print("live her alo")
        for c in data['categories']:
            try:
                print("try")
                print(c)
                print(Category.objects.all())
                titles = []
                for cs in Category.objects.all():
                    titles.append(cs.title)
                    if cs.title == c:
                        article.categories.add(cs.id)
                if c not in titles:
                    newC = Category()
                    newC.title = c
                    newC.save()
                    article.categories.add(newC.id)
            except:
                print("except")
                newC = Category()
                newC.title = c
                newC.save()
                article.categories.add(newC.id)
        article.save()
        return article

    def update_likes(self, request):
        data = request.data
        print('update_likes data: ')
        print(data)
        article = Article(pk='id')
        article.likes_count += data
        article.save()
        return article
    
    def add_star(self, request):
        add_star = Article.rating_count + 1
    
    def add_comment(self, request):
        add_comment = Article.comment_count + 1

    def count_likes(self, request):
        add_like = Article \
            .objects \
            .values("tags__tag") \
            .annotate(Count("tags__tag"))        
        return queryset

    def stars_count(self, request):
        queryset = Article \
            .objects \
            .values("tags__tag") \
            .annotate(Count("tags__tag"))        
        return queryset


        # data2 = request.data.keys()
        # # data = request.GET.get('engagement')
        # data3 = request.data.values()
        # print("data create")
        # print(data)
        # print(data['engagement'])
        # print(data2)
        # print(data3)

        # article = Article.objects.all()
        # categories = Category.objects.all()
        # ac = AssignmentChoices.objects.all()
        # print("Engagement choices")
        # print(ac)
        # print("Categories")
        # print(categories)
        # print("Categories filter ")
        # print(Category.objects.filter(title="AI"))
        # print("Article Obj all")
        # print(article)
        # print(Article.objects.get(id="13"))
        # ar2 = Article.objects.get(id="13")
        # # for c in request['categories']:
        # #     print(c)
        # #     ar2.categories.add(c)

        # print("engagement")
        # print(ar2.engagement.all())
        # for e in request.data['engagement']:
        #     print(e)
        #     # "2" phone call
        #     # "3" email 
        #     # "4" survey
        #     ar2.engagement.add(e)
        # print("ar2 Categories")
        # print(ar2.categories.all())
        # print(ar2.categories.get(title="AI"))
        # article.title = request['title']
        # article.content = request['content']
        # article.save()
        # print("articleObject")
        # print("acObject")
        # # print(article.objects)
        # for c in request['categories']:
        #     newC = Category()
        #     newC.objects.get("__all__")
        #     print("cacascsacdas")
        #     print(newC.title.objects.get("__all__"))
        #     newC.title = c
        #     article.categories.add(newC.title)
        # article.engagement.set(request['engagement'])
        # article.categories.set(request['categories'])

        # for i in data:
        #     print(i)
        #     if (i == "engagement"):

    #     # engagement = data[]
    #     article = Article()
        # article.engagement
        # student = User.objects.get(username=data['username'])

        # graded_asnt = GradedAssignment()
        # graded_asnt.assignment = assignment
        # graded_asnt.student = student

        # questions = [q for q in assignments.questions.all()]
        # answers = [data['answers'][a] for a in data['answers']]

        # answered_correct_count = 0
        # for i in range(len(questions)):
        #     if questions[i].answer.title == answers[i]:
        #         answered_correct_count += 1
        #     i += 1

        # grade = answered_correct_count / len(questions)
        # graded_asnt.grade = gradegraded_asnt.save()
        # return graded_asnt
class ProfileArticleListSerializer(serializers.ListSerializer):
    child = ArticleSerializer()
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
        like.user = User.objects.get(username=data["user"])
        like.liked = data["liked"]
        like.article = Article.objects.get(id=data["article"])
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
        rating.article = Article.objects.get(id=data["articleID"])
        rating.save()
        return rating

class CommentSerializer(serializers.ModelSerializer):
    user = StringSerializer(many=False)
    article = StringSerializer(many=False)
    # timestamp = StringSerializer(many=False)
    content = StringSerializer(many=False)
    liked = StringSerializer(many=False)
    disliked = StringSerializer(many=False)
    like_counter = StringSerializer(many=False)
    dislike_counter = StringSerializer(many=False)
    comment_reply = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ("id", 'user', "timestamp", "article", "content", "liked", "disliked", "like_counter", "dislike_counter", "reply_to", "replies", "comment_reply")
    
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
        # if("reply_to" in data):
        #     comment.reply_to = Comment.objects.get(id=data["reply_to"])
        comment.article = Article.objects.get(id=data["articleID"])
        comment.save()
        if("reply_to" in data):
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

class ArticleFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ("__all__")


class VideoFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ("__all__")


class ImageFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ("__all__")

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("__all__")

class Cat_FT_Serializer(serializers.Serializer):
    category = serializers.SerializerMethodField()
    feedback_type = serializers.SerializerMethodField()
    def get_feedback_type(self, obj):
        ob = []
        for ft in FeedbackTypes.CHOICES:
            ob.append({"value": ft[0], "label": ft[1]})
        obj = ob
        return obj
    def get_category(self, obj):
        cats = CategorySerializer(Category.objects.all(), many=True).data
        return cats
    
    class Meta:
        fields = (
            "category",
            "feedback_type",
            "data"
        )