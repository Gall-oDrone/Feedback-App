from rest_framework import serializers
from workshopsApi.models import Workshop, Comment, Category, Like, Rating, CommentReply, Lesson, LessonTopic
from users.models import User, ProfileInfo
from users.serializers import ProfileSerializer, ProfileInfoSerializer
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

class FeaturedWorkshopSerializer(serializers.ModelSerializer):
    overview = StringSerializer(many=False)
    categories = StringSerializer(many=True)
    title = StringSerializer(many=False)
    image = serializers.SerializerMethodField()
    class Meta:
        model = Workshop
        fields = ('id', 'title', 'overview', 'categories', 'image')
    
    def get_image(self, obj):
        request = self.context.get('request')
        photo_url = obj.image.url
        return request.build_absolute_uri(photo_url)

class WorkshopSerializer(serializers.ModelSerializer):
    categories = StringSerializer(many=True)
    overview = StringSerializer(many=False)
    author = StringSerializer(many=False)
    # video = StringSerializer(many=False)
    # image = serializers.SerializerMethodField()
    user_name = serializers.SerializerMethodField()
    
    # def get_image(self, obj):
    #     request = self.context.get('request')
    #     print("COLAS: ", obj.author.profile.profile_avatar)
    #     profile_thumbnail = ProfileSerializer(obj.author.profile, many=False, context={'request': request}).data["profile_avatar"]
    #     print("COLAS 2: ", profile_thumbnail)
    #     return profile_thumbnail

    def get_user_name(self, obj):
        profile_name = ProfileInfoSerializer(ProfileInfo.objects.get(profile_username=obj.author.id), many=False ).data.get("name")
        return profile_name

    class Meta:
        model = Workshop
        fields = ('id', 'title', 'overview', 'timestamp',
                  'categories', 'author',
                  "comment_count", "rating_count",
                    "likes_count", "view_count", "rating_count", "avg_rating",
                    "image", "user_name"
                  )

    def get_feedback_forms(self, obj):
        # obj is an assignment
        #choices = AssignmentChoiceSerializer(obj, many=False).data
        # print(choices)
        # return choices
        print("WorkshopSerializer object")
        print(WorkshopSerializer(obj, many=True).data)
        # return (WorkshopSerializer(obj.choices.assignment_choices, many=True).data)

    def create(self, request, *args):
        data = request
        print("DATA")
        print(data)
        print("args: ", args)
        # print(self.args)
        files = args[0]
        workshop = Workshop()
        workshop.save()
        workshop.title = data["title"]
        workshop.content = data["content"]
        workshop.author = User.objects.get(username=data["user"])
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
                    workshop.video= Video(id=videoD.id)
                    # raise ValidationError('Unsupported file extension.')
            else: 
                print("myfile.name is image")
                filename = fs.save("images/"+myfile.name, myfile)
                uploaded_file_url = fs.url(filename)
                print("uploaded_file_url")
                print(uploaded_file_url)
                print(myfile.name)
                print(workshop.thumbnail)
                workshop.thumbnail = "images/"+myfile.name
                print("workshop.thumbnail")
                print(workshop.thumbnail)

        for c in data['categories']:
            try:
                print("try")
                print(c)
                print(Category.objects.all())
                titles = []
                for cs in Category.objects.all():
                    titles.append(cs.title)
                    if cs.title == c:
                        workshop.categories.add(cs.id)
                if c not in titles:
                    newC = Category()
                    newC.title = c
                    newC.save()
                    workshop.categories.add(newC.id)
            except:
                print("except")
                newC = Category()
                newC.title = c
                newC.save()
                workshop.categories.add(newC.id)
        workshop.save()
        return workshop

    def update_likes(self, request):
        data = request.data
        print('update_likes data: ')
        print(data)
        workshop = Workshop(pk='id')
        workshop.likes_count += data
        workshop.save()
        return workshop
    
    def add_star(self, request):
        add_star = Workshop.rating_count + 1
    
    def add_comment(self, request):
        add_comment = Workshop.comment_count + 1

    def count_likes(self, request):
        add_like = Workshop \
            .objects \
            .values("tags__tag") \
            .annotate(Count("tags__tag"))        
        return queryset

    def stars_count(self, request):
        queryset = Workshop \
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

        # workshop = Workshop.objects.all()
        # categories = Category.objects.all()
        # ac = AssignmentChoices.objects.all()
        # print("Engagement choices")
        # print(ac)
        # print("Categories")
        # print(categories)
        # print("Categories filter ")
        # print(Category.objects.filter(title="AI"))
        # print("Workshop Obj all")
        # print(workshop)
        # print(Workshop.objects.get(id="13"))
        # ar2 = Workshop.objects.get(id="13")
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
        # workshop.title = request['title']
        # workshop.content = request['content']
        # workshop.save()
        # print("workshopObject")
        # print("acObject")
        # # print(workshop.objects)
        # for c in request['categories']:
        #     newC = Category()
        #     newC.objects.get("__all__")
        #     print("cacascsacdas")
        #     print(newC.title.objects.get("__all__"))
        #     newC.title = c
        #     workshop.categories.add(newC.title)
        # workshop.engagement.set(request['engagement'])
        # workshop.categories.set(request['categories'])

        # for i in data:
        #     print(i)
        #     if (i == "engagement"):

    #     # engagement = data[]
    #     workshop = Workshop()
        # workshop.engagement
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

class WorkshopDetailSerializer(serializers.ModelSerializer):
    categories = StringSerializer(many=True)
    overview = StringSerializer(many=False)
    author = StringSerializer(many=False)
    lesson = serializers.SerializerMethodField()
    user_name = serializers.SerializerMethodField()
    user_pic = serializers.SerializerMethodField()

    def get_lesson(self, obj):
        lesson = LessonSerializer(Lesson.objects.filter(workshop=obj.id), many=True).data
        print("lesson obj: ", lesson)
        return lesson

    def get_user_name(self, obj):
        profile_name = ProfileInfoSerializer(ProfileInfo.objects.get(profile_username=obj.author.id), many=False ).data.get("name")
        return profile_name
    
    def get_user_pic(self, obj):
        request = self.context.get('request')
        profile_pic = ProfileSerializer(obj.author.profile, many=False, context={'request': request}).data["profile_avatar"]
        return profile_pic

    class Meta:
        model = Workshop
        fields = ('id', 'overview', 'categories', 
                'author', "lesson", "user_name", "user_pic")

class LessonSerializer(serializers.ModelSerializer):
    lesson_title = StringSerializer(many=False)
    lesson_topic = serializers.SerializerMethodField()

    def get_lesson_topic(self, obj):
        # topic = LessonTopicSerializer(Lesson.objects.filter(id=obj.id), many=True).data
        topic = LessonTopicSerializer(LessonTopic.objects.filter(lesson=obj.id), many=True).data
        # print("lesson topic: ", topic)
        # print("lesson topic: ", Lesson.lessontopic_set)
        return topic

    class Meta:
        model = Lesson
        fields = ('id', 'lesson_title', 'lesson_topic')

class LessonTopicSerializer(serializers.ModelSerializer):
    topic_title = StringSerializer(many=False)

    class Meta:
        model = LessonTopic
        fields = ('id', 'topic_title')

class ProfileWorkshopListSerializer(serializers.ListSerializer):
    child = WorkshopSerializer()
    allow_null = True
    many = True

class LikeSerializer(serializers.ModelSerializer):
    user = StringSerializer(many=False)
    # user_name = serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model = Like
        fields = ("id", 'user', "liked", "workshop")
    
    def create_like(self, request):
        data = request.data
        print("DATA LikeSerializer")
        print(data)
        like = Like()
        like.user = User.objects.get(username=data["user"])
        like.liked = data["liked"]
        like.workshop = Workshop.objects.get(id=data["workshop"])
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
        fields = ('user', "rate", "workshop")

    def create_rate(self, request):
        data = request.data
        print("DATA RatingSerializer")
        print(data)
        rating = Rating()
        rating.user = User.objects.get(username=data["username"])
        rating.rate = data["rate"]
        rating.workshop = Workshop.objects.get(id=data["workshopID"])
        rating.save()
        return rating

class CommentSerializer(serializers.ModelSerializer):
    user = StringSerializer(many=False)
    workshop = StringSerializer(many=False)
    # timestamp = StringSerializer(many=False)
    content = StringSerializer(many=False)
    liked = StringSerializer(many=False)
    disliked = StringSerializer(many=False)
    like_counter = StringSerializer(many=False)
    dislike_counter = StringSerializer(many=False)
    comment_reply = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ("id", 'user', "timestamp", "workshop", "content", "liked", "disliked", "like_counter", "dislike_counter", "reply_to", "replies", "comment_reply")
    
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
        comment.workshop = Workshop.objects.get(id=data["workshopID"])
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

class WorkshopFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workshop
        fields = ("__all__")


# class VideoFormSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Video
#         fields = ("__all__")


# class ImageFormSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Image
#         fields = ("__all__")

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("__all__")

class Cat_FT_Serializer(serializers.Serializer):
    category = serializers.SerializerMethodField()
    feedback_type = serializers.SerializerMethodField()
    def get_category(self, obj):
        cats = CategorySerializer(Category.objects.all(), many=True).data
        return cats
    
    class Meta:
        fields = (
            "category",
            "feedback_type",
            "data"
        )