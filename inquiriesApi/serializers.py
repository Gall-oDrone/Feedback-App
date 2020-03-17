from rest_framework import serializers
from .models import Inquiry, Comment, InquiryType, Like, Rating, File, CommentReply,InquiryType, TargetAudience, Topic, ContactOption, PreferLanguage
from users.models import User, ProfileInfo, Universities
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
    inquiry_type = StringSerializer(many=True)
    inquiry_topic = StringSerializer(many=True)
    inquiry_audience = StringSerializer(many=True)
    contact_option = StringSerializer(many=True)
    author = StringSerializer(many=False)
    user_university = StringSerializer(many=False)
    opened = StringSerializer(many=False)
    contact_option = StringSerializer(many=True)
    language = StringSerializer(many=True)

    class Meta:
        model = Inquiry
        fields = ("__all__")

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
        inquiry.title = data["title"]
        inquiry.content = data["content"]
        userId = User.objects.get(username=data["user"]).id
        print("userId: ", userId)
        inquiry.author = User.objects.get(username=data["user"])
        if "range" in data:
            inquiry.end = data["range"][1]
        userUniversity = ProfileInfo.objects.get(profile_username_id=userId)
        print("userUniversity: ", userUniversity)
        print("userUniversity 2: ", userUniversity.university_id)
        print("userUniversity 3: ", userUniversity.university)
        inquiry.user_university = Universities.objects.get(university=userUniversity.university)
        inquiry.save()
        #inquiry.author = data["user"]
        if files:
            print("FILES -I: ", files)
            print("FILES -II: ", files is dict)
            print("FILES I: ", files['file'])
            for f in files:
                myfile = files[f]
                print("file type: ", myfile.content_type.split('/')[0])
                file_type = myfile.content_type.split('/')[0]
                fs = FileSystemStorage()
                valid_extensions = ['.pdf', '.doc', '.docx', '.jpg', '.png', '.xlsx', '.xls']
                print("myfile.name is doc")
                filename = fs.save("files/"+myfile.name, myfile)
                uploaded_file_url = fs.url(filename)
                print("uploaded_file_url")
                print(uploaded_file_url)
                print(myfile.name)
                print(inquiry.ufile)
                inquiry.ufile = "files/"+myfile.name
                print("inquiry.ufile")
                print(inquiry.ufile)
        
        # self.add_fields(data["inquiry_type"],0)
        self.add_fields(data["audience"],1, inquiry)
        if "language" in data:
            self.add_fields(data["language"],4, inquiry)
        self.add_fields(data["topic"],2,inquiry)
        if "contact" in data:
            self.add_fields(data["contact"],3,inquiry)
        self.add_fields(data["inquiry_type"],0,inquiry)

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
    
    def add_fields(self, field, i, inquiry):
        for f in field:
            try:
                print("try")
                print(f)
                print(i)
                newM = self.scher3(i)
                print("newM I: ", newM)
                ms = self.scher2(i)
                shh = self.scher6(newM, i, f)
                for m in ms:
                    if(f == m[0]):
                        self.scher6(newM, i, f)
                print("newM II: ", newM)
                mtype = self.scher5(i, newM, inquiry)
            except:
                print("except")
                print(f)
                newM = self.scher3(i)
                ms = self.scher2(i)
                shh = self.scher6(newM, i, f)
                newM.save()
                print("End except")
                print("newM: ", newM)
                mtype = self.scher5(i, newM, inquiry)
        print("live her alo")

    def scher2(self, i):
        switcher={
                0:InquiryType.CHOICES,
                1:TargetAudience.CHOICES,
                2:Topic.TOPICS,
                3:ContactOption.CHOICES,
                4:PreferLanguage.CHOICES,
            }
        return switcher.get(i,"Invalid day of week")

    def scher3(self, i):
        it = InquiryType()
        ta =TargetAudience()
        t =Topic()
        co = ContactOption()
        pl =PreferLanguage()
        switcher={
                0:it,
                1:ta,
                2:t ,
                3:co,
                4:pl,
            }
        print("switcher: ", switcher.get(i))
        return switcher.get(i,"Invalid day of week")
    
    def scher6(self, m, i, f):
        if(i == 0):
            m.inquiry_type = f            
            return m
        elif(i == 1):
            m.target_audience = f
            return m
        elif(i == 2):
            m.topic = f
            return m
        elif(i == 3):
            m.contact_option = f
            return m
        elif(i == 4):
            m.language = f
            return m
        else:
            return "Invalid day of week"

    def scher4(self, i):
        switcher={
                0:InquiryType,
                1:TargetAudience,
                2:Topic,
                3:ContactOption,
                4:PreferLanguage,
            }
        return switcher.get(i,"Invalid day of week")
    def scher5(self, i, m, inquiry):
        sch = self.scher4(i)
        if(i == 0):
            mt = sch.objects.get(inquiry_type=m)    
            inquiry.inquiry_type.add(mt.id)
            return 
        elif(i == 1):
            mt = sch.objects.get(target_audience=m)
            inquiry.inquiry_audience.add(mt.id)
            return 
        elif(i == 2):
            mt = sch.objects.get(topic=m)
            inquiry.inquiry_topic.add(mt.id)
            return 
        elif(i == 3):
            mt = sch.objects.get(contact_option=m)
            inquiry.contact_option.add(mt.id)
            return 
        elif(i == 4):
            mt = sch.objects.get(language=m)
            inquiry.language.add(mt.id)
            return 
        else:
            return "Invalid day of week"
         
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
        comment.inquiry = Inquiry.objects.get(id=data["inquiryID"])
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

class InquiryFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inquiry
        fields = ("__all__")


class FormSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = ("__all__")


class FileFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = ("__all__")