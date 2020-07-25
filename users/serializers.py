from allauth.account.adapter import get_adapter
from rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from .models import User, MeetingRequest, Universities, ProfileInfo, Profile, Universities, Degree, Bachelor, Master, Doctorate, Course
from django.conf import settings
from django.core.files.storage import FileSystemStorage
import json 

class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'university', 'username', 'password', 'is_student', 'is_teacher', 'id')


class CustomRegisterSerializer(RegisterSerializer):
    is_student = serializers.BooleanField()
    is_teacher = serializers.BooleanField()
    university = serializers.CharField(max_length=50, allow_blank=True)

    class Meta:
        model = User
        fields = ('__all__')
        # fields = ('email', 'university', 'username', 'password', 'is_student', 'is_teacher')

    def get_cleaned_data(self):
        return {
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'password2': self.validated_data.get('password2', ''),
            'email': self.validated_data.get('email', ''),
            'is_student': self.validated_data.get('is_student', ''),
            'is_teacher': self.validated_data.get('is_teacher', ''),
            'university': self.validated_data.get('university', '')
        }

    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        user.is_student = self.cleaned_data.get('is_student')
        user.is_teacher = self.cleaned_data.get('is_teacher')
        user.university = self.cleaned_data.get('university')
        user.save()
        adapter.save_user(request, user, self)

        profile_info = ProfileInfo()
        profile_info.profile_username = User.objects.get(username=user.username)
        # profile_info.name = self.cleaned_data.get('first_name')+" "+self.cleaned_data.get('last_name')
        print("self.cleaned_data.get('university')", self.cleaned_data.get('university'))
        self.add_fields(self.cleaned_data.get('university'),0, profile_info)
        # profile_info.university = Universities.objects.get(university=self.cleaned_data.get('university'))
        profile_info.save()

        return user
    
    def add_fields(self, field, i, university):
        f = field
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
            mtype = self.scher5(i, newM, university)
        except:
            print("except")
            print(f)
            newM = self.scher3(i)
            ms = self.scher2(i)
            shh = self.scher6(newM, i, f)
            newM.save()
            print("End except")
            print("newM: ", newM)
            mtype = self.scher5(i, newM, university)
        print("live her alo")

    def scher2(self, i):
        switcher={
                0:Universities.UNIVERSITIES,
            }
        return switcher.get(i,"Invalid day of week")

    def scher3(self, i):
        u = Universities()
        switcher={
                0:u,
            }
        print("switcher: ", switcher.get(i))
        return switcher.get(i,"Invalid day of week")
 
    def scher6(self, m, i, f):
        if(i == 0):
            m.university = f            
            return m
        else:
            return "Invalid day of week"
    
    def scher4(self, i):
        switcher={
                0:Universities,
            }
        return switcher.get(i,"Invalid day of week")

    def scher5(self, i, m, university):
        sch = self.scher4(i)
        if(i == 0):
            mt = sch.objects.get(university=m)    
            university.university = mt
            return 
        else:
            return "Invalid day of week"


class TokenSerializer(serializers.ModelSerializer):
    user_type = serializers.SerializerMethodField()
    university = serializers.SerializerMethodField()

    class Meta:
        model = Token
        fields = ('key', 'user', 'user_type', 'university')

    def get_user_type(self, obj):
        serializer_data = UserSerializer(
            obj.user
        ).data
        is_student = serializer_data.get('is_student')
        is_teacher = serializer_data.get('is_teacher')
        return {
            'is_student': is_student,
            'is_teacher': is_teacher
        }

    def get_university(self, obj):
        serializer_data = UserSerializer(
            obj.user
        ).data
        university = serializer_data.get('university')
        return {
            'university': university
        }

class ProfileSerializer(serializers.ModelSerializer):
    user = StringSerializer(many=False)
    # slug = serializers.SerializerMethodField(many=False)
    class Meta:
        model = Profile
        fields = ("__all__" )
    
    def update_profile_info(self, request, *args):
        data = request
        print('update_profile_info data: ', data)
        profile = Profile.objects.get(user=data["user_id"])
        files = args[0]
        if files:
            print("FILES -I: ", files)
            print("FILES -II: ", files is dict)
            print("FILES I: ", files['file'])
            for f in files:
                myfile = files[f]
                # print("file type: ", myfile.content_type.split('/')[0])
                if settings.USE_S3:
                    profile.profile_avatar = myfile
                else:
                    file_type = myfile.content_type.split('/')[0]
                    fs = FileSystemStorage()
                    valid_extensions = ['.pdf', '.doc', '.docx', '.jpg', '.png', '.xlsx', '.xls']
                    filename = fs.save("profileAvatar/"+myfile.name, myfile)
                    uploaded_file_url = fs.url(filename)
                    # print("uploaded_file_url", uploaded_file_url)
                    # print("myfile.name", myfile.name)
                    # profile.profile_avatar = myfile
                    profile.profile_avatar = "profileAvatar/"+myfile.name
        profile.save()
        return profile


class UserProfileLCRequestSerializer(serializers.ModelSerializer):
    to_user = StringSerializer()
    from_user = StringSerializer()

    class Meta:
        model = MeetingRequest
        fields = ("to_user", "from_user", "timestamp")

class ProfileInfoSerializer(serializers.ModelSerializer):
    profile_username = StringSerializer(many=False)
    name = StringSerializer(many=False)
    country = StringSerializer(many=False)
    university = StringSerializer(many=False)
    degree = StringSerializer(many=False)
    bachelor = StringSerializer(many=False)
    master = StringSerializer(many=False)
    doctorate = StringSerializer(many=False)
    course  = StringSerializer(many=False)
    work_experience = StringSerializer(many=False)
    website = StringSerializer(many=False)
    message = StringSerializer(many=False)
    github = StringSerializer(many=False)
    profile_avatar = serializers.SerializerMethodField()

    class Meta:
        model = ProfileInfo
        fields = ("__all__")
    
    def get_profile_avatar(self, obj):
        request = self.context.get('request')
        profile = ProfileSerializer(obj.profile, many=False).data["profile_avatar"]
        return profile

    def update_account_info(self, request):
        data = request.data
        print('update_account_info data: ')
        print(data, data.get("profile_username"))
        username = User.objects.get(username="q")
        print(username)
        profile = ProfileInfo.objects.get(profile_username = username)
        # profile.country = data.get("country"),
        if(data.get("experience") != None):
            profile.name = data.get("name"),
        if(data.get("experience") != None):
            profile.work_experience = data.get("experience")
        if(data.get("website") != None):
            profile.website = data.get("website")
        if(data.get("message") != None):
            profile.message = data.get("message")
        if(data.get("github") != None):
            profile.github = data.get("github")

        profile.save()
        if(data.get("university") != None):
            profile.university = Universities.objects.get(university=data.get("university"))
        if(data.get("attendace") != None):
            profile.attendace = data.get("attendace")
        if(data.get("degree") != None):
            profile.degree = Degree.objects.get(degree=data.get("degree"))
        if(data.get("bachelor") != None):
            profile.bachelor = Bachelor(bachelor_degree=data.get("bachelor"))
        if(data.get("master") != None):
            profile.master = Master.objects.get(master_degree=data.get("master"))
        if(data.get("doctorate") != None):
            profile.doctorate = Doctorate.objects.get(pHd_degree=data.get("doctorate"))
        if(data.get("course") != None):
            profile.course = Course.objects.get(course=data.get("course"))
        if(data.get("graduate") != None):
            profile.graduate = data.get("graduate")
        if(data.get("undergraduate") != None):
            profile.undergraduate = data.get("undergraduate")
        if(data.get("postgraduate") != None):
            profile.postgraduate = data.get("postgraduate")
            
        profile.save()
        return profile

class ProfilePageSerializer(serializers.ListSerializer):
    info = ProfileInfoSerializer


class ProfileInfoListSerializer(serializers.ListSerializer):
    child = ProfileInfoSerializer()
    allow_null = True
    many = True

class UniSerializer(serializers.ModelSerializer):
    university = StringSerializer(many=False)
    # UNIVERSITIES = serializers.MultipleChoiceField(choices = Universities.UNIVERSITIES) 
    class Meta:
        model = Universities
        fields = ("university", )
        # read_only_fields = ("bac",)

class degreeSerializer(serializers.Serializer):
    # degree = serializers.MultipleChoiceField(choices=Degree.DEGREES)
    degree = serializers.SerializerMethodField()
    bachelor = serializers.SerializerMethodField()
    # degree = serializers.MultipleChoiceField(choices=Degree.DEGREES)
    # print("123456, ", degree)
    def get_degree(self, obj):
        obj = Degree.DEGREES
        return obj
    
    def get_bachelor(self, obj):
        obj = Degree.DEGREES
        return obj

    class Meta:
        model = Degree
        fields = ("__all__")

class bachelor_degreeSerializer(serializers.ModelSerializer):
    type = serializers.ChoiceField(choices=Bachelor.BACHELOR_DEGREES)

    class Meta:
        model = Bachelor
        fields = ("__all__")

class master_degreeSerializer(serializers.ModelSerializer):
    type = serializers.ChoiceField(choices= Master.MASTER_DEGREES)

    class Meta:
        model = Master
        fields = ("__all__")

class pHd_degreeSerializer(serializers.ModelSerializer):
    type = serializers.ChoiceField(choices= Doctorate.PHD_DEGREES)

    class Meta:
        model = Doctorate
        fields = ("__all__")

class courseSerializer(serializers.ModelSerializer):
    type = serializers.ChoiceField(choices= Course.COURSES)

    class Meta:
        model = Course
        fields = ("__all__")

class FetchDataSerializer(serializers.ListSerializer):
    child = serializers.ListField(child=serializers.CharField())
    allow_null = False
    many = True
    
class testSerializer(serializers.Serializer):
    # degree2 = serializers.MultipleChoiceField( 
    #                     choices = Degree.DEGREES) 

    degree = serializers.SerializerMethodField()
    bachelor = serializers.SerializerMethodField()
    master = serializers.SerializerMethodField()
    pHD = serializers.SerializerMethodField()
    course = serializers.SerializerMethodField()
    def get_degree(self, obj):
        ob = []
        for d in Degree.DEGREES:
            ob.append({"value": d[1], "label": d[0]})
        obj = ob
        return obj
    def get_bachelor(self, obj):
        ob = []
        for d in Bachelor.BACHELOR_DEGREES:
            ob.append({"value": d[0], "label": d[0]})
        obj = ob
        return obj
    def get_master(self, obj):
        ob = []
        for d in Master.MASTER_DEGREES:
            ob.append({"value": d[0], "label": d[0]})
        obj = ob
        return obj
    def get_pHD(self, obj):
        ob = []
        for d in Doctorate.PHD_DEGREES:
            ob.append({"value": d[0], "label": d[0]})
        obj = ob
        return obj
    def get_course(self, obj):
        ob = []
        for d in Course.COURSES:
            ob.append({"value": d[0], "label": d[0]})
        obj = ob
        return obj
    # degree = StringSerializer(many=True)
    # bachelor = StringSerializer(many=True)
    # master = StringSerializer(many=True)
    # pHD = StringSerializer(many=True)
    # course  = StringSerializer(many=True)

    # Degree.DEGREES = serializers.MultipleChoiceField( 
    #                     choices = Degree.DEGREES) 

    # degree = StringSerializer(many=False)
    # bachelor = StringSerializer(many=False)
    # master = StringSerializer(many=False)
    # pHD = StringSerializer(many=False)
    # course  = StringSerializer(many=False)
    # class Geeks(object): 
    # def __init__(self, multiplechoices): 
    #     self.multiplechoices = multiplechoices 
    
    class Meta:
        fields = (
            "degree",
            "bachelor",
            "master",
            "pHD",
            "course",
            "data"
            # "Degree.DEGREES",
            # "Bachelor.BACHELOR_DEGREES",
            # "Master.MASTER_DEGREES",
            # "Doctorate.PHD_DEGREES",
            # "Course.COURSES",
        )
        # depth = 1
    
    # name = serializers.SerializerMethodField()
    # def get_name(self, obj):
    #     return obj.get_name_display()
    # GEEKS_CHOICES = [{"degree": Degree.DEGREES, "bachelor": Bachelor.BACHELOR_DEGREES, "master": Master.MASTER_DEGREES,
    #         "pHD": Doctorate.PHD_DEGREES, "course": Course.COURSES}]

    # multiplechoices = serializers.MultipleChoiceField( 
    #     choices = GEEKS_CHOICES) 

class testSerializer2(serializers.Serializer):

    degree = serializers.SerializerMethodField()
    bachelor = serializers.SerializerMethodField()
    def get_degree(self, obj):
        # ob = {}
        # for d in Degree.DEGREES:
        #     for sd in d:
        #         ob["value"] = 
        obj = Degree.DEGREES
        return obj
    def get_bachelor(self, obj):
        obj = Bachelor.BACHELOR_DEGREES
        return obj
    def get_master(self, obj):
        obj = Master.MASTER_DEGREES
        return obj
    def get_pHD(self, obj):
        obj = Doctorate.PHD_DEGREES
        return obj
    def get_course(self, obj):
        obj = Course.COURSES
        return obj
    # degree = StringSerializer(many=True)
    # bachelor = StringSerializer(many=True)
    # master = StringSerializer(many=True)
    # pHD = StringSerializer(many=True)
    # course  = StringSerializer(many=True)

    # Degree.DEGREES = serializers.MultipleChoiceField( 
    #                     choices = Degree.DEGREES) 

    # degree = StringSerializer(many=False)
    # bachelor = StringSerializer(many=False)
    # master = StringSerializer(many=False)
    # pHD = StringSerializer(many=False)
    # course  = StringSerializer(many=False)
    # class Geeks(object): 
    # def __init__(self, multiplechoices): 
    #     self.multiplechoices = multiplechoices 
    
    class Meta:
        fields = (
            "degree",
            "bachelor"
        )
    
    # name = serializers.SerializerMethodField()
    # def get_name(self, obj):
    #     return obj.get_name_display()
    # GEEKS_CHOICES = [{"degree": Degree.DEGREES, "bachelor": Bachelor.BACHELOR_DEGREES, "master": Master.MASTER_DEGREES,
    #         "pHD": Doctorate.PHD_DEGREES, "course": Course.COURSES}]

    # multiplechoices = serializers.MultipleChoiceField( 
    #     choices = GEEKS_CHOICES) 