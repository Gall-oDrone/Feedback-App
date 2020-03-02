from rest_framework import serializers
from inquiriesApi.models import Inquiry, Video, Comment, InquiryType, Like, Rating, Image, CommentReply
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

class InquirySerializer(serializers.ModelSerializer):
    engagement = StringSerializer(many=True)
    inquiry_type = StringSerializer(many=True)
    author = StringSerializer(many=False)
    video = StringSerializer(many=False)
    

    class Meta:
        model = Inquiry
        fields = ('id', 'title', 'content', 'timestamp',
                  'engagement', 'inquiry_type', 'author',
                  "comment_count", "view_count", "rating_count",
                    "likes_count", "view_count", "rating_count", "avg_rating",
                    "video", "thumbnail"
                  )

    def get_feedback_forms(self, obj):
        # obj is an assignment
        #choices = AssignmentChoiceSerializer(obj, many=False).data
        # print(choices)
        # return choices
        print("InquirySerializer object")
        print(InquirySerializer(obj, many=True).data)
        # return (InquirySerializer(obj.choices.assignment_choices, many=True).data)

    def create(self, request, *args):
        data = request
        print("DATA")
        print(data)
        print("args: ", args)
        # print(self.args)
        files = args[0]
        inquiry = Inquiry()
        inquiry.save()
        inquiry.title = data["title"]
        inquiry.content = data["content"]
        # inquiry.author = data["user"]
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
                inquiry.video= Video(id=videoD.id)
                # raise ValidationError('Unsupported file extension.')
        else: 
            print("myfile.name is image")
            filename = fs.save("images/"+myfile.name, myfile)
            uploaded_file_url = fs.url(filename)
            print("uploaded_file_url")
            print(uploaded_file_url)
            print(myfile.name)
            print(inquiry.thumbnail)
            inquiry.thumbnail = "images/"+myfile.name
            print("inquiry.thumbnail")
            print(inquiry.thumbnail)

        for e in data['engagement']:
            # "2" phone call
            # "3" email 
            # "4" survey

            inquiry.engagement.add(e)
        print("live her alo")
        for c in data['inquiry_type']:
            print(c)
            newC = InquiryType()
            newC.title = c
            inquiry.inquiry_type.add(newC.title)

        inquiry.save()
        return inquiry

    def update_likes(self, request):
        data = request.data
        print('update_likes data: ')
        print(data)
        inquiry = Inquiry(pk='id')
        inquiry.likes_count += data
        inquiry.save()
        return inquiry
    
    def add_star(self, request):
        add_star = Inquiry.rating_count + 1
    
    def add_comment(self, request):
        add_comment = Inquiry.comment_count + 1

    def count_likes(self, request):
        add_like = Inquiry \
            .objects \
            .values("tags__tag") \
            .annotate(Count("tags__tag"))        
        return queryset

    def stars_count(self, request):
        queryset = Inquiry \
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

        # inquiry = Inquiry.objects.all()
        # inquiry_type = InquiryType.objects.all()
        # ac = AssignmentChoices.objects.all()
        # print("Engagement choices")
        # print(ac)
        # print("Categories")
        # print(inquiry_type)
        # print("Categories filter ")
        # print(InquiryType.objects.filter(title="AI"))
        # print("Inquiry Obj all")
        # print(inquiry)
        # print(Inquiry.objects.get(id="13"))
        # ar2 = Inquiry.objects.get(id="13")
        # # for c in request['inquiry_type']:
        # #     print(c)
        # #     ar2.inquiry_type.add(c)

        # print("engagement")
        # print(ar2.engagement.all())
        # for e in request.data['engagement']:
        #     print(e)
        #     # "2" phone call
        #     # "3" email 
        #     # "4" survey
        #     ar2.engagement.add(e)
        # print("ar2 Categories")
        # print(ar2.inquiry_type.all())
        # print(ar2.inquiry_type.get(title="AI"))
        # inquiry.title = request['title']
        # inquiry.content = request['content']
        # inquiry.save()
        # print("inquiryObject")
        # print("acObject")
        # # print(inquiry.objects)
        # for c in request['inquiry_type']:
        #     newC = InquiryType()
        #     newC.objects.get("__all__")
        #     print("cacascsacdas")
        #     print(newC.title.objects.get("__all__"))
        #     newC.title = c
        #     inquiry.inquiry_type.add(newC.title)
        # inquiry.engagement.set(request['engagement'])
        # inquiry.inquiry_type.set(request['inquiry_type'])

        # for i in data:
        #     print(i)
        #     if (i == "engagement"):

    #     # engagement = data[]
    #     inquiry = Inquiry()
        # inquiry.engagement
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
class ProfileInquiryListSerializer(serializers.ListSerializer):
    child = InquirySerializer()
    allow_null = True
    many = True

class LikeSerializer(serializers.ModelSerializer):
    user = StringSerializer(many=False)
    # user_name = serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model = Like
        fields = ("id", 'user', "liked", "inquiry")
    
    def create_like(self, request):
        data = request.data
        print("DATA LikeSerializer")
        print(data)
        like = Like()
        like.user = User.objects.get(username=data["username"])
        like.liked = data["liked"]
        like.inquiry = Inquiry.objects.get(id=data["inquiry"])
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
        fields = ('user', "rate", "inquiry")

    def create_rate(self, request):
        data = request.data
        print("DATA RatingSerializer")
        print(data)
        rating = Rating()
        rating.user = User.objects.get(username=data["username"])
        rating.rate = data["rate"]
        rating.inquiry = Inquiry.objects.get(id=data["inquiryID"])
        rating.save()
        return rating

class CommentSerializer(serializers.ModelSerializer):
    user = StringSerializer(many=False)
    inquiry = StringSerializer(many=False)
    content = StringSerializer(many=False)
    liked = StringSerializer(many=False)
    disliked = StringSerializer(many=False)
    like_counter = StringSerializer(many=False)
    dislike_counter = StringSerializer(many=False)
    comment_reply = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ("id", 'user', "inquiry", "content", "liked", "disliked", "like_counter", "dislike_counter", "reply_to", "replies", "comment_reply")
    
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
        comment.inquiry = Inquiry.objects.get(id=data["inquiryID"])
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

class InquiryFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inquiry
        fields = ("__all__")


class VideoFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ("__all__")


class ImageFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ("__all__")