from rest_framework import serializers
from articlesApi.models import Article, Video, Comment, Category, Like, Rating
from users.models import User


class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value


class ArticleSerializer(serializers.ModelSerializer):
    engagement = StringSerializer(many=True)
    categories = StringSerializer(many=True)
    author = StringSerializer(many=False)
    

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

    def create(self, request):
        data = request.data
        print("DATA")
        print(data)
        article = Article()
        article.save()
        article.title = data["title"]
        article.content = data["content"]
        # article.author = data["user"]

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
    class Meta:
        model = Comment
        fields = ("id", 'user', "article", "content", "liked", "disliked", "like_counter", "dislike_counter", "reply_to")
        
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
        comment.article = Article.objects.get(id=data["articleID"])
        comment.save()
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


