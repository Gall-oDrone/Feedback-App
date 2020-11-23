from rest_framework import serializers
from .models import Workshop, Comment, Category, Like, Rating, CommentReply, Lesson, LessonTopic, LessonVideo, LessonTopicVideo, PracticeFile, Participants
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
        # for el in args:
        #     print("coño: ", el)
        #     for k in el.keys():
        #         if("lesson_media" in k):
        #             print("LUZ: ", el[k])
        workshop = Workshop()
        workshop.title = data["title"]
        workshop.content = data["content"]
        #data["categories"]
        if("image" in data):
            # workshop.image = self.post_media(t["image"])
            self.post_media1(args, 3, workshop, None)
            print("image")
        elif("video" in data):
            # lesson.video = self.post_media(t["video"])
            self.post_media1(args, 3, workshop, None)
            print("video")
        workshop.author = User.objects.get(username=data["user"])
        workshop.save()
        topic_index = lesson_index = 0
        for l in data["lessons"]:
            lesson = Lesson()
            lesson.workshop = workshop
            lesson.lesson_title = l["lesson_title"]
            lesson.lesson_description = l["lesson_desc"]
            # lesson.lesson_video = self.post_media(l["lesson_media"], 0, lesson)
            self.post_media1(args, 0, lesson, lesson_index, "lesson_media_{}")
            lesson_index = lesson_index + 1
        #     # lesson.practice_file = self.post_media(l["lab"])
            for t in l["lesson_topics"]:
                topic = LessonTopic()
                topic.lesson = lesson
                topic.topic_title = t["lesson_topic_title"]
                topic.topic_description = t["lesson_topic_desc"]
                # topic.topic_video = self.post_media(t["media"], 1, topic)
                self.post_media1(args, 1, topic, topic_index, "topic_media_{}")
                topic_index = topic_index + 1
                # topic.save()
            # lesson.save()
        # if files is dict:
        #     print("FILES I: ", files['file'])
        #     print("FILES II: ", files['media'])
        #     # files["selectedImage"]
        #     for f in files:
        #         myfile = files[f]
        #         print("file type: ", myfile.content_type.split('/')[0])
        #         file_type = myfile.content_type.split('/')[0]
        #         fs = FileSystemStorage()
        #         valid_extensions = ['.pdf', '.doc', '.docx', '.jpg', '.png', '.xlsx', '.xls']
        #         if file_type == "video":
        #             print("myfile.name is video")
        #             videoD = Video()
        #             filename = fs.save("videos/"+myfile.name, myfile)
        #             uploaded_file_url = fs.url(filename)
        #             videoD.videofile = "videos/"+myfile.name
        #             videoD.save()
        #             print("videoD, ", videoD)
        #             print("videoD.id, ", videoD.id)
        #             workshop.video= Video(id=videoD.id)
        #             # raise ValidationError('Unsupported file extension.')
        #     else: 
        #         print("myfile.name is image")
        #         filename = fs.save("images/"+myfile.name, myfile)
        #         uploaded_file_url = fs.url(filename)
        #         print("uploaded_file_url")
        #         print(uploaded_file_url)
        #         print(myfile.name)
        #         print(workshop.thumbnail)
        #         workshop.thumbnail = "images/"+myfile.name
        #         print("workshop.thumbnail")
        #         print(workshop.thumbnail)

        # for c in data['categories']:
        #     try:
        #         print("try")
        #         print(c)
        #         print(Category.objects.all())
        #         titles = []
        #         for cs in Category.objects.all():
        #             titles.append(cs.title)
        #             if cs.title == c:
        #                 workshop.categories.add(cs.id)
        #         if c not in titles:
        #             newC = Category()
        #             newC.title = c
        #             newC.save()
        #             workshop.categories.add(newC.id)
        #     except:
        #         print("except")
        #         newC = Category()
        #         newC.title = c
        #         newC.save()
        #         workshop.categories.add(newC.id)
        workshop.save()
        return workshop

    def post_media1(self, media_set, i, pmodel, index, obj_key):
        if media_set is not dict:
            for media in media_set:
                print("culo", media, media is dict)
                for key in media.keys():
                    print("culo II", key, media.keys())
                    if(obj_key.format(index) == key):
                        print("Post workshop media")
                        self.post_media2(media[key], i, pmodel, "THE MODEL")
                    # elif("lesson_media_{}".format(index) == key):
                    #     print("Post lesson video", i, index, pmodel, key, media[key])
                    #     self.post_media2(media[key], i, pmodel, "lesson")
                    # elif("topic_media_{}".format(index) == key):
                    #     print("Post topic video")
                    #     self.post_media2(media[key], i, pmodel, "topic")
                    # elif("topic_practice_file_{}".format(index) == key):
                    #     print("Post practice file")
                    #     self.post_media2(media[key], i, pmodel, "lab")
    
    def post_media2(self, file_obj, i, pmodel, type_obj):
        myfile = file_obj
        print("file type: ", myfile.content_type.split('/')[0])
        file_type = myfile.content_type.split('/')[0]
        fs = FileSystemStorage()
        valid_extensions = ['.pdf', '.doc', '.docx', '.jpg', '.png', '.xlsx', '.xls']
        if file_type == "video":
            print("myfile.name is video")
            videoD = self.get_media_model(i)
            uppath = self.get_media_path(i)
            print("COÑO: ", uppath+myfile.name, myfile, i, type_obj)
            if(i == "1"):
                filename = fs.save("workshops/lessons/topics/videos/"+myfile.name, myfile)
            else:
                filename = fs.save(uppath+myfile.name, myfile)
            print("COÑO II")
            uploaded_file_url = fs.url(filename)
            attrb = self.get_parent(i, pmodel, myfile.name)
            print("COÑO III")
            attrb = self.get_parent(i, videoD, myfile.name)
            videoD.save()
            print("videoD, ", videoD, uppath+myfile.name)
            print("videoD.id, ", videoD.id,)
            self.save_to_pmodel(i, pmodel, videoD)
            # workshop.video= Video(id=videoD.id)
            # raise ValidationError('Unsupported file extension.')
        else: 
            print("myfile.name is image")
            filename = fs.save("images/"+myfile.name, myfile)
            uploaded_file_url = fs.url(filename)
            print("uploaded_file_url")
            print(uploaded_file_url)
            print(myfile.name)
            print(workshop.image)
            workshop.image = "workshops/images/"+myfile.name

    def post_media(self, files, i, pmodel):
        print("files", files)
        if files is dict:
            print("FILES I: ", files['file'])
            print("FILES II: ", files['media'])
            # files["selectedImage"]
            for f in files:
                myfile = files[f]
                print("file type: ", myfile.content_type.split('/')[0])
                file_type = myfile.content_type.split('/')[0]
                fs = FileSystemStorage()
                valid_extensions = ['.pdf', '.doc', '.docx', '.jpg', '.png', '.xlsx', '.xls']
                if file_type == "video":
                    print("myfile.name is video")
                    videoD = get_media_model(i)
                    uppath = get_media_path(i)
                    filename = fs.save(uppath+myfile.name, myfile)
                    uploaded_file_url = fs.url(filename)
                    attrb = get_parent(i, videoD, myfile.name)
                    videoD.save()
                    print("videoD, ", videoD)
                    print("videoD.id, ", videoD.id,)
                    save_to_pmodel(i, pmodel, videoD)
                    # workshop.video= Video(id=videoD.id)
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
        else:
            print("media is not dict")

    def compare_media_key(self, key):
        lv = LessonVideo()
        tv = LessonTopicVideo()
        pf = PracticeFile()
        switcher={
                0:lv,
                1:tv,
                2:pf,
            }
        print("switcher: ", switcher.get(i))
        return switcher.get(i,"Invalid model")

    def get_media_model(self, i):
        lv = LessonVideo()
        tv = LessonTopicVideo()
        pf = PracticeFile()
        wsh = Workshop()
        switcher={
                0:lv,
                1:tv,
                2:pf,
                3:wsh,
            }
        print("switcher: ", switcher.get(i))
        return switcher.get(i,"Invalid model")
    
    def get_media_path(self, i):
        lvp = "workshops/lessons/videos/"
        tvp = "workshops/lessons/topics/videos/"
        pfp = "workshops/lessons/files/"
        wshp = "workshops/videos/"
        switcher={
                0:lvp,
                1:tvp,
                2:pfp,
                3:wshp,
            }
        print("switcher: ", switcher.get(i))
        return switcher.get(i,"Invalid path")
    
    def get_parent(self, i, par, fileName):
        if(i == 0):
            par.videofile = "workshops/lessons/videos/"+fileName
            return
        elif(i == 1):
            par.videofile = "workshops/lessons/topics/videos/"+fileName
            return
        elif(i == 2):
            par.pfile = "workshops/lessons/files/"+fileName
            return
        elif(i == 3):
            par.image = "workshops/videos/"+fileName
            par.save()
            return
        else:
            return switcher.get(i,"Invalid day of week")
    
    def save_to_pmodel(self, i, pmodel, instance):
        if(i == 0):
            pmodel.lesson_video = instance
            pmodel.save()
            return 
        elif(i == 1):
            pmodel.topic_video = instance
            pmodel.save()
            return 
        elif(i == 2):
            pmodel.practice_file.add(instance)
            pmodel.save()
            return 
        else:
            return "Invalid day of week"

        return switcher.get(i,"Invalid day of week")

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
    is_registered = serializers.SerializerMethodField()

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
    
    def get_is_registered(self, obj):
        print("user is not registered")
        # user = obj.author.username
        # if(user in obj.workshop_inscribed.inscribed):
        #     return True
        return False

    class Meta:
        model = Workshop
        fields = ('id', 'overview', 'categories', 
                'author', "lesson", "user_name", 
                "user_pic", "is_registered")

class WorkshopInscribedDetailSerializer(serializers.ModelSerializer):
    categories = StringSerializer(many=True)
    overview = StringSerializer(many=False)
    author = StringSerializer(many=False)
    lesson = serializers.SerializerMethodField()
    user_name = serializers.SerializerMethodField()
    user_pic = serializers.SerializerMethodField()
    is_registered = serializers.SerializerMethodField()

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
    
    def get_is_registered(self, obj):
        print("user is not registered")
        # user = obj.author.username
        # if(user in obj.workshop_inscribed.inscribed):
        #     return True
        return True

    class Meta:
        model = Workshop
        fields = ('id', 'overview', 'categories', 
                'author', "lesson", "user_name", 
                "user_pic", "is_registered")

class WorkshopCreateRegistrationView(serializers.ModelSerializer):
    class Meta:
        model = Participants
        fields = ("__all__")

    def create(self, request, *args):
        data = request
        print("DATA")
        print(data)
        print("args: ", args[0])
        workshopId = args[0]["id"]
        par_obj = Participants()
        par_obj.workshop = Workshop.objects.get(id=workshopId)
        par_obj.save()
        par_obj.inscribed.add(request.user)
        par_obj.save()
        return par_obj

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

class LessonTopicVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = LessonTopicVideo
        fields = ('id', "videofile")

class LessonTopicSerializer(serializers.ModelSerializer):
    topic_title = StringSerializer(many=False)
    topic_video = LessonTopicVideoSerializer()

    # def get_topic_video(self, obj):
    #     request = self.context.get('request')
    #     video_url = LessonTopicVideo(LessonTopic.objects.filter(lesson=obj.id), many=True, context={'request': request}).data.get("topic_video")
    #     return video_url

    class Meta:
        model = LessonTopic
        fields = ('id', 'topic_title', "topic_description", "topic_video")

class ProfileWorkshopListSerializer(serializers.ListSerializer):
    child = WorkshopSerializer()
    allow_null = True
    many = True

class WorkshopContentSerializer(serializers.ModelSerializer):
    lesson_topic = serializers.SerializerMethodField()

    def get_lesson_topic(self, obj):
        request = self.context.get('request')
        topic = LessonTopicSerializer(LessonTopic.objects.filter(lesson=obj.id), many=True, context={'request': request}).data
        return topic
    class Meta:
        model = Lesson
        fields = ('__all__')
        
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