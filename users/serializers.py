from allauth.account.adapter import get_adapter
from rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers
from rest_framework.authtoken.models import Token

from .models import User, MeetingRequest, ProfileInfo, Profile, Universities

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
        print("self.cleaned_data.get('university')", self.cleaned_data.get('university'))
        self.add_fields(self.cleaned_data.get('university'),0, profile_info)
        # profile_info.university = Universities.objects.get(university=self.cleaned_data.get('university'))
        profile_info.save()

        return user
    
    def add_fields(self, field, i, university):
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
    graduate = StringSerializer(many=False)
    undergraduate = StringSerializer(many=False)
    work_experience = StringSerializer(many=False)
    website = StringSerializer(many=False)
    message = StringSerializer(many=False)
    github = StringSerializer(many=False)

    class Meta:
        model = ProfileInfo
        fields = ("__all__")
    
    def update_account_info(self, request):
        data = request.data
        print('update_account_info data: ')
        print(data)
        profile = ProfileInfo(profile_username= User.objects.get(self.request.data.get("profile_username")).id)
        profile.name = self.request.data.get("name"),
        profile.country = self.request.data.get("country"),
        profile.university = self.request.data.get("university"),
        profile.graduate = self.request.data.get("graduate"),
        profile.undergraduate = self.request.data.get("undergraduate"),
        profile.work_experience = self.request.data.get("work_experience"),
        profile.website = self.request.data.get("website"),
        profile.message = self.request.data.get("message"),
        profile.github = self.request.data.get("github")
        profile.save()
        return profile

class ProfileInfoListSerializer(serializers.ListSerializer):
    child = ProfileInfoSerializer()
    allow_null = True
    many = True

