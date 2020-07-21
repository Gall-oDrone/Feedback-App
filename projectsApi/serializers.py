from django.conf import settings
from rest_framework import serializers
from projectsApi.models import Project, Video, Comment, Category, Like, Upvote, Rating, Image, CommentReply, FeedbackTypes, DevPhases, CrowdfundingTypes
from users.models import User, ProfileInfo
from users.serializers import ProfileSerializer
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

class ProjectAuthorInfoSerializer(serializers.ModelSerializer):
    name = StringSerializer(many=False)
    university = StringSerializer(many=False)
    degree = StringSerializer(many=False)
    profile_avatar = serializers.SerializerMethodField()

    class Meta:
        model = ProfileInfo
        fields = (
            "name",
            "university",
            "degree",
            "profile_avatar",
        )
    
    def get_profile_avatar(self, obj):
        request = self.context.get('request')
        profile = ProfileSerializer(obj.profile, many=False, context={'request': request}).data["profile_avatar"]
        return profile

class ProjectDetailSerializer(serializers.ModelSerializer):
    project_feedback = StringSerializer(many=True)
    category = StringSerializer(many=True)
    author = StringSerializer(many=False)
    project_video = StringSerializer(many=False)
    author_info = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = ("__all__")
        
    def get_author_info(self, obj):
        p_u = obj.get_author_details()
        request = self.context.get('request')
        print("CORSO: ", p_u)
        return ProjectAuthorInfoSerializer(p_u, many=False, context={'request': request}).data

class ProjectSerializer(serializers.ModelSerializer):
    project_feedback = StringSerializer(many=True)
    category = StringSerializer(many=True)
    author = StringSerializer(many=False)
    project_video = StringSerializer(many=False)

    class Meta:
        model = Project
        fields = ('id', 'title', 'content', 'timestamp',
                  'project_feedback', 'category', 'author',
                  "comment_count", "view_count", "rating_count",
                    "likes_count", "upvotes_count", "view_count", "rating_count", "avg_rating",
                    "project_video", "project_image", "project_phase", 
                    "project_crowdfunding_type",
                    "members"
                  )

    def get_feedback_forms(self, obj):
        # obj is an assignment
        #choices = AssignmentChoiceSerializer(obj, many=False).data
        # print(choices)
        # return choices
        print("ProjectSerializer object")
        print(ProjectSerializer(obj, many=True).data)
        # return (ProjectSerializer(obj.choices.assignment_choices, many=True).data)

    def create(self, request, *args):
        data = request
        print("DATA")
        print(data)
        print("args: ", args)
        # print(self.args)
        files = args[0]
        project = Project()
        project.save()
        project.title = data["title"]
        project.content = data["overview"]
        project.content = data["content"]
        project.author = User.objects.get(username=data["user"])
        print("FILES: ", files)
        # print("FILES I: ", files['file'])
        # print("FILES II: ", files['media'])
        for f in files:
            myfile = files[f]
            print("file type: ", myfile.content_type.split('/')[0])
            file_type = myfile.content_type.split('/')[0]
            if settings.USE_S3:
                if file_type == "video":
                    videoD = Video()
                    videoD.videofile = myfile
                    videoD.save()
                    project.project_video= Video(id=videoD.id)
                    # raise ValidationError('Unsupported file extension.')
                else: 
                    project.project_image = myfile
            else:
                fs = FileSystemStorage()
                valid_extensions = ['.pdf', '.doc', '.docx', '.jpg', '.png', '.xlsx', '.xls']
                if file_type == "video":
                    print("myfile.name is video")
                    project_video = Video()
                    filename = fs.save("project_videos/"+myfile.name, myfile)
                    uploaded_file_url = fs.url(filename)
                    project_videoD.project_videofile = "project_videos/"+myfile.name
                    project_videoD.save()
                    print("project_videoD, ", project_videoD)
                    print("project_videoD.id, ", project_videoD.id)
                    project.project_video= Video(id=project_videoD.id)
                    # raise ValidationError('Unsupported file extension.')
                else: 
                    print("myfile.name is image")
                    filename = fs.save("project_images/"+myfile.name, myfile)
                    uploaded_file_url = fs.url(filename)
                    print("uploaded_file_url")
                    print(uploaded_file_url)
                    print(myfile.name)
                    print(project.project_image)
                    project.project_image = "project_images/"+myfile.name
                    print("project.project_image")
                    print(project.project_image)

        self.add_fields(data['project_feedback'], 0, project)
        print("HASATTRB: ", hasattr(data, "project_crowdfunding_type"))
        self.add_fields(data['project_phase'], 1, project)
        if("project_crowdfunding_type" in data):
            self.add_fields(data['project_crowdfunding_type'], 2, project)
        # if("member_emails" in data):
        #     self.add_fields(data['member_emails'], 3, project)
        # if("project_website" in data):
        #     project.website = data["project_website"]

        for c in data['categories']:
            try:
                print("try")
                print(c)
                print(Category.objects.all())
                titles = []
                for cs in Category.objects.all():
                    titles.append(cs.title)
                    if cs.title == c:
                        print("CACAS 2 True")
                        project.category.add(cs.id)
                if c not in titles:
                    newC = Category()
                    newC.title = c
                    newC.save()
                    project.category.add(newC.id)
            except Exception as e:
                print("except: ", e)
                newC = Category()
                newC.title = c
                newC.save()
                project.category.add(newC.id)

        project.save()
        return project
    def add_fields(self, field, i, university):
        f = field
        if(type(f) == list):
            for f in field:
                try:
                    print("try")
                    print(f)
                    print(i)
                    newM = self.scher1(i)
                    print("newM I: ", newM, type(newM))
                    ms = self.scher2(i)
                    shh = self.scher3(newM, i, f)
                    for m in ms:
                        if(f == m[0]):
                            self.scher3(newM, i, f)
                    print("newM II: ", newM)
                    mtype = self.scher5(i, newM, university)
                except Exception as e:
                    print("except: ", e)
                    print(f)
                    newM = self.scher1(i)
                    ms = self.scher2(i)
                    shh = self.scher3(newM, i, f)
                    newM.save()
                    print("End except")
                    print("newM: ", newM)
                    mtype = self.scher5(i, newM, university)
        else:
            try:
                print("try")
                print(f)
                print(i)
                newM = self.scher1(i)
                print("newM I: ", newM, type(newM))
                ms = self.scher2(i)
                shh = self.scher3(newM, i, f)
                for m in ms:
                    if(f == m[0]):
                        self.scher3(newM, i, f)
                print("newM II: ", newM)
                mtype = self.scher5(i, newM, university)
            except Exception as e:
                print("except: ", e)
                print(f)
                newM = self.scher1(i)
                ms = self.scher2(i)
                shh = self.scher3(newM, i, f)
                newM.save()
                print("End except")
                print("newM: ", newM)
                mtype = self.scher5(i, newM, university)
        print("live her alo")

    def scher1(self, i):
        ft = FeedbackTypes()
        dp = DevPhases()
        ct = CrowdfundingTypes()
        switcher={
                0:ft,
                1:dp,
                2:ct,
            }
        print("switcher: ", switcher.get(i))
        return switcher.get(i,"Invalid day of week")

    def scher2(self, i):
        switcher={
                0:FeedbackTypes.CHOICES,
                1:DevPhases.CHOICES,
                2:CrowdfundingTypes.CHOICES,
            }
        return switcher.get(i,"Invalid day of week")
 
    def scher3(self, m, i, f):
        if(i == 0):
            m.feedback_type = f        
            return m
        elif(i == 1):
            m.dev_phase = f
            return m
        elif(i == 2):
            m.crowdfunding_type = f
            return m
        else:
            return "Invalid day of week"
    
    def scher4(self, i):
        switcher={
                0:FeedbackTypes,
                1:DevPhases,
                2:CrowdfundingTypes,
            }
        return switcher.get(i,"Invalid day of week")

    def scher5(self, i, m, university):
        sch = self.scher4(i)
        if(i == 0):
            mt = sch.objects.get(feedback_type="survey")
            print("KONGOS: ", mt)
            university.project_feedback.add(mt)
            return 
        elif(i == 1):
            mt = sch.objects.get(dev_phase=m)    
            university.project_phase = mt
            return 
        elif(i == 2):
            mt = sch.objects.get(crowdfunding_type=m)    
            print("CACAS: ", mt)
            university.project_crowdfunding_type = mt
            return 
        else:
            return "Invalid day of week"

    def update_upvotes(self, request):
        data = request.data
        print('update_upvotes data: ')
        print(data)
        project = Project(pk='id')
        project.upvotes_count += data
        project.save()
        return project
    
    def add_star(self, request):
        add_star = Project.rating_count + 1
    
    def add_comment(self, request):
        add_comment = Project.comment_count + 1

    def count_upvotes(self, request):
        add_upvote = Project \
            .objects \
            .values("tags__tag") \
            .annotate(Count("tags__tag"))        
        return queryset

    def stars_count(self, request):
        queryset = Project \
            .objects \
            .values("tags__tag") \
            .annotate(Count("tags__tag"))        
        return queryset


        # data2 = request.data.keys()
        # # data = request.GET.get('project_feedback')
        # data3 = request.data.values()
        # print("data create")
        # print(data)
        # print(data['project_feedback'])
        # print(data2)
        # print(data3)

        # project = Project.objects.all()
        # categories = Category.objects.all()
        # ac = AssignmentChoices.objects.all()
        # print("Engagement choices")
        # print(ac)
        # print("Categories")
        # print(categories)
        # print("Categories filter ")
        # print(Category.objects.filter(title="AI"))
        # print("Project Obj all")
        # print(project)
        # print(Project.objects.get(id="13"))
        # ar2 = Project.objects.get(id="13")
        # # for c in request['categories']:
        # #     print(c)
        # #     ar2.categories.add(c)

        # print("project_feedback")
        # print(ar2.project_feedback.all())
        # for e in request.data['project_feedback']:
        #     print(e)
        #     # "2" phone call
        #     # "3" email 
        #     # "4" survey
        #     ar2.project_feedback.add(e)
        # print("ar2 Categories")
        # print(ar2.categories.all())
        # print(ar2.categories.get(title="AI"))
        # project.title = request['title']
        # project.content = request['content']
        # project.save()
        # print("projectObject")
        # print("acObject")
        # # print(project.objects)
        # for c in request['categories']:
        #     newC = Category()
        #     newC.objects.get("__all__")
        #     print("cacascsacdas")
        #     print(newC.title.objects.get("__all__"))
        #     newC.title = c
        #     project.categories.add(newC.title)
        # project.project_feedback.set(request['project_feedback'])
        # project.categories.set(request['categories'])

        # for i in data:
        #     print(i)
        #     if (i == "project_feedback"):

    #     # project_feedback = data[]
    #     project = Project()
        # project.project_feedback
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
class ProfileProjectListSerializer(serializers.ListSerializer):
    child = ProjectSerializer()
    allow_null = True
    many = True

class LikeSerializer(serializers.ModelSerializer):
    user = StringSerializer(many=False)
    # user_name = serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model = Like
        fields = ("id", 'user', "like", "project")
    
    def create_like(self, request):
        data = request.data
        print("DATA LikeSerializer")
        print(data)
        like = Like()
        like.user = User.objects.get(username=data["user"])
        like.like = data["like"]
        like.project = Project.objects.get(id=data["project"])
        like.save()
        return like

class LikeListSerializer(serializers.ListSerializer):
    child = LikeSerializer()
    allow_null = True
    many = True

class UpvoteSerializer(serializers.ModelSerializer):
    user = StringSerializer(many=False)
    # user_name = serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model = Upvote
        fields = ("id", 'user', "upvoted", "project")
    
    def create_upvote(self, request):
        data = request.data
        print("DATA UpvoteSerializer")
        print(data)
        upvote = Upvote()
        upvote.user = User.objects.get(username=data["user"])
        upvote.upvoted = data["upvoted"]
        upvote.project = Project.objects.get(id=data["project"])
        upvote.save()
        return upvote

class UpvoteListSerializer(serializers.ListSerializer):
    child = UpvoteSerializer()
    allow_null = True
    many = True

class RatingSerializer(serializers.ModelSerializer):
    user = StringSerializer(many=False)
    class Meta:
        model = Rating
        fields = ('user', "rate", "project")

    def create_rate(self, request):
        data = request.data
        print("DATA RatingSerializer")
        print(data)
        rating = Rating()
        rating.user = User.objects.get(username=data["username"])
        rating.rate = data["rate"]
        rating.project = Project.objects.get(id=data["projectID"])
        rating.save()
        return rating

class CommentSerializer(serializers.ModelSerializer):
    user = StringSerializer(many=False)
    project = StringSerializer(many=False)
    # timestamp = StringSerializer(many=False)
    content = StringSerializer(many=False)
    upvoted = StringSerializer(many=False)
    disupvoted = StringSerializer(many=False)
    upvote_counter = StringSerializer(many=False)
    disupvote_counter = StringSerializer(many=False)
    project_comment_reply = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ("id", 'user', "timestamp", "project", "content", "upvoted", "disupvoted", "upvote_counter", "disupvote_counter", "reply_to", "replies", "project_comment_reply")
    
    def get_project_comment_reply(self, obj):
        # obj is an survey
        print("OBJ", obj.id)
        questions = CommentReplySerializer(obj.project_comment_reply.filter(comment_id=obj.id), many=True).data
        print("ASDADASDASSD", questions)
        return questions

    def create_comment(self, request):
        data = request.data
        print("DATA CommentSerializer")
        print(data)
        comment = Comment()
        comment.user = User.objects.get(username=data["username"])
        comment.content = data["content"]
        comment.upvoted = data["upvote"]
        comment.disupvoted = data["disupvote"]
        # if("reply_to" in data):
        #     comment.reply_to = Comment.objects.get(id=data["reply_to"])
        comment.project = Project.objects.get(id=data["projectID"])
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

class ProjectFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ("__all__")


class VideoFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ("__all__")


class ImageFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ("__all__")