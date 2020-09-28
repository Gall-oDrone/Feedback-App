from django.conf import settings
from rest_framework import serializers
from django.utils.dateparse import parse_datetime
from datetime import datetime, date
from sessionsApi.models import Session, SessionMeeting, Topic, Experience, Months, Weekdays, Dates
from users.models import User, Profile, ProfileInfo
from users.serializers import ProfileInfoSerializer
from django.core.files.storage import FileSystemStorage
from articlesApi.models import Article

class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value

class SessionTestSerializer(serializers.ModelSerializer):
    profile_avatar = StringSerializer(many=False)

    class Meta:
        model = Profile
        fields = ("__all__")

class FeaturedSessionSerializer(serializers.ModelSerializer):
    user_info = serializers.SerializerMethodField()

    class Meta:
        model = Session
        fields = ('id', "session_photo", "user_info")
    
    def get_user_info(self, obj):
        request = self.context.get('request')
        user_info = ProfileInfoSerializer(obj.user_name, many=False, context={'request': request}).data
        return user_info

class SessionTest2Serializer(serializers.ModelSerializer):
    name = StringSerializer(many=False)
    university = StringSerializer(many=False)
    bachelor = StringSerializer(many=False)
    master = StringSerializer(many=False)
    doctorate = StringSerializer(many=False)
    graduate = StringSerializer(many=False)
    undergraduate = StringSerializer(many=False)

    class Meta:
        model = ProfileInfo
        fields = ("__all__")

class SessionTest3Serializer(serializers.ModelSerializer):
    survey_questions = serializers.SerializerMethodField()

    class Meta:
        model = Session
        fields = ('__all__')

    def get_survey_questions(self, obj):
        # obj is an survey
        print("OBJ", obj)
        questions = SessionTestSerializer(obj.survey_questions.all(), many=True).data
        return questions

class SessionSerializer(serializers.ModelSerializer):
    user = StringSerializer(many=False)
    requester = StringSerializer(many=False)
    # user_name = StringSerializer(many=False)
    user_photo = StringSerializer(many=False)
    price_per_hour = StringSerializer(many=False)
    title = StringSerializer(many=False)
    content = StringSerializer(many=False)
    price_per_hour = StringSerializer(many=False)
    topic = StringSerializer(many=True)
    experience = StringSerializer(many=True)
    created = StringSerializer(many=False)
    user_name = serializers.SerializerMethodField()
    dates = StringSerializer(many=True)

    class Meta:
        model = Session
        fields = ("__all__")

    def get_user_name(self, obj):
        print("OBJ", obj)
        user_info = ProfileInfoSerializer(obj.user_name, many=False).data
        return user_info

    def create(self, request, *args):
        data = request
        print("DATA: ", data)
        user = User.objects.get(username=data["user"])
        userId = User.objects.get(username=data["user"]).id
        files = args[0]
        session = Session()
        session.user = user
        session.content = data["content"]
        session.user_name = ProfileInfo.objects.get(profile_username = user)
        session.user_photo = Profile.objects.get(user = user)
        session.price_per_hour = data["price"]
        session.max_hrs_per_session = data["max_hours"]
        session.start_time = data["start_time"]
        session.end_time = data["end_time"]
        session.save()
        if files:
            print("FILES -I: ", files)
            # print("FILES -II: ", files is dict)
            # print("FILES I: ", files['file'])
            for f in files:
                myfile = files[f]
                print("file type: ", myfile.content_type.split('/')[0])
                file_type = myfile.content_type.split('/')[0]
                if settings.USE_S3:
                    if file_type == "video":
                        # videoD = Video()
                        # videoD.videofile = myfile
                        # videoD.save()
                        # session.session_photo= Video(id=videoD.id)
                        # raise ValidationError('Unsupported file extension.')
                        pass
                    else: 
                        session.session_photo = myfile
                else:
                    fs = FileSystemStorage()
                    valid_extensions = ['.pdf', '.doc', '.docx', '.jpg', '.png', '.xlsx', '.xls']
                    print("myfile.name is doc")
                    filename = fs.save("sessionPhotos/"+myfile.name, myfile)
                    uploaded_file_url = fs.url(filename)
                    print("uploaded_file_url")
                    print(uploaded_file_url)
                    print(myfile.name)
                    print(session.session_photo)
                    session.session_photo = "sessionPhotos/"+myfile.name
                    print("inquiry.ufile")
                    print(session.session_photo)
        session.save()
     
        experience_list = [x["experience"] for x in (Experience.objects.values())]
        topic_list = [x["topic"] for x in (Topic.objects.values())]
        self.checkEntries(data["topics"], topic_list, 0, session)
        self.checkEntries(data["areas_experience"], experience_list, 1, session)

#
        # self.add_fields(data["topics"], 0, session)
        # self.add_fields(data["areas_experience"], 1, session)
        self.add_fields(self.selectMonth(data["months"]), 2, session)
        self.add_fields(self.selectWeekday(data["weekdays"]), 3, session)

        for d in data["dates"]:
            Dates.objects.create(date=d)
            try:
                date_obj = Dates.objects.get(date=d)
                session.dates.add(date_obj.id)
            except:
                date_obj = Dates.objects.filter(date=d)
                session.dates.add(date_obj.reverse()[0].id)
        return session

    def add_fields(self, field, i, inquiry):
        for f in field:
            # if(i == 0 or i == 1):
            #     model = self.scher3(i)
            #     self.check_existence(f, model, i)
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
                if(i == 1 or i == 2):
                    newM.save()
                    print("End except")
                print("newM: ", newM)
                mtype = self.scher5(i, newM, inquiry)
        print("live her alo")

    def selectMonth(self, data):
        new_months = []
        for m in Months.MONTHS:
            if(int(m[1]) not in data):
                new_months.append(m[0])
        print("selectedMonths: ", new_months)
        return new_months
    
    def selectWeekday(self, data):
        new_months = []
        for m in Weekdays.WEEKDAYS:
            if(int(m[1]) not in data):
                new_months.append(m[0])
        print("selectedWD: ", new_months)
        return new_months

    def check_existence(self, data, mod, index):
        arr = []
        mod = self.get_mod(index)
        for f in mod:
            arr.append(f[1])
        if(data not in arr):
            # Topic.objects.create(topic=data)
            mod.append((len(mod), data))
        else: 
            return
    
    def get_mod(self, i):
        it = Topic.TOPICS
        ta =Experience.EXPERIENCES
        switcher={
                0:it,
                1:ta,
            }
        print("switcher: ", switcher.get(i))
        return switcher.get(i,"Invalid day of week")

    def scher2(self, i):
        switcher={
                0:Topic.TOPICS,
                1:Experience.EXPERIENCES,
                2:Months.MONTHS,
                3:Weekdays.WEEKDAYS
            }
        return switcher.get(i,"Invalid day of week")

    def scher3(self, i):
        it = Topic()
        ta =Experience()
        mo = Months()
        we = Weekdays()
        switcher={
            0: it,
            1: ta,
            2: mo,
            3: we
            }
        # print("switcher: ", switcher.get(i))
        return switcher.get(i, "Invalid day of week")
    
    def scher6(self, m, i, f):
        if(i == 0):
            m.topic = f
            return m
        elif(i == 1):
            m.experience = f
            return m
        elif(i == 2):
            m.months = f
            return m
        elif(i == 3):
            m.weekdays = f
            return m
        else:
            return "Invalid day of week"

    def scher4(self, i):
        switcher={
                0:Topic,
                1:Experience,
                2:Months,
                3:Weekdays
            }
        return switcher.get(i,"Invalid day of week")
    def scher5(self, i, m, session):
        sch = self.scher4(i)
        if(i == 0):
            try:
                mt = sch.objects.get(topic=m)
                session.topic.add(mt.id)
            except:
                mt = sch.objects.filter(topic=m)[0]
                session.topic.add(mt.id)
            return 
        elif(i == 1):
            try:
                mt = sch.objects.get(experience=m)
                session.experience.add(mt.id)
            except:
                mt = sch.objects.filter(experience=m)[0]
                session.experience.add(mt.id)
            return 
        elif(i == 2):
            mt = sch.objects.get(month=m)
            session.months.add(mt.id)
            return
        elif(i == 3):
            # print("CACA 0: ", m.weekdays[:])
            mt = sch.objects.get(weekday=m.weekdays)
            session.weekdays.add(mt.id)
            return
        else:
            return "Invalid day of week"
    
    def scher7(self, i, c, session):
        sch = self.scher4(i)
        if(i == 0):
            mt = sch.objects.create(topic=c)
            session.topic.add(mt.id)
            return 
        elif(i == 1):
            mt = sch.objects.create(experience=c)
            session.experience.add(mt.id)
            return
    
    def scher8(self, i, c, session):
        sch = self.scher4(i)
        if(i == 0):
            print("CACAS 2 I: ", "c: ", c, "i: ", i)
            mt = sch.objects.get(topic=c)
            session.topic.add(mt.id)
            return 
        elif(i == 1):
            mt = sch.objects.get(experience=c)
            session.experience.add(mt.id)
            return
    
    def checkEntries(self, category, categories, i, session):
        cgrs = [x.replace(" ", "").upper() for x in (categories)]
        for c in category:
            if len(cgrs) == 0:
                self.scher7(i, c, session)
            else:
                print("CACAS 2: ", "List: ", cgrs, "TOPIC TO CHECK:", c.replace(" ", "").upper())
                if(c.replace(" ", "").upper() not in cgrs):
                    self.scher7(i, c.lower(), session)
                else:
                    self.scher8(i, c.lower(), session)
        return session

class SessionUserListSerializer(serializers.ModelSerializer):
    requester = StringSerializer(many=False)
    session = StringSerializer(many=False)
    date_to_appointment = StringSerializer(many=False)
    start_time = StringSerializer(many=False)
    end_time = StringSerializer(many=False)
    session_hrs = StringSerializer(many=False)
    notified = StringSerializer(many=False)
    scheduled = StringSerializer(many=False)
    canceled = StringSerializer(many=False)
    openRoom = serializers.SerializerMethodField()
    
    class Meta:
        model = SessionMeeting
        fields = ("__all__")
    
    def get_openRoom(self, obj):
        return obj.open_meeting_room()

class SessionMeetingRoomSerializer(serializers.ModelSerializer):
    requester = StringSerializer(many=False)
    session = StringSerializer(many=False)
    date_to_appointment = StringSerializer(many=False)
    dta_start_time = StringSerializer(many=False)
    sta_end_time = StringSerializer(many=False)
    session_hrs = StringSerializer(many=False)
    notified = StringSerializer(many=False)
    scheduled = StringSerializer(many=False)
    canceled = StringSerializer(many=False)
    openRoom = serializers.SerializerMethodField()
    participants = serializers.SerializerMethodField()
    
    class Meta:
        model = SessionMeeting
        fields = ("__all__")
    
    def get_openRoom(self, obj):
        return obj.open_meeting_room()
    
    def get_participants(self, obj):
        return obj.get_participants()

class SessionListDetailSerializer(serializers.ModelSerializer):
    user = StringSerializer(many=False)
    requester = StringSerializer(many=False)
    user_name = StringSerializer(many=False)
    user_photo = StringSerializer(many=False)
    price_per_hour = StringSerializer(many=False)
    title = StringSerializer(many=False)
    created = StringSerializer(many=False)
    class Meta:
        model = Session
        fields = ("__all__")