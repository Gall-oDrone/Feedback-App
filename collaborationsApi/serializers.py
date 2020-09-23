from rest_framework import serializers
from .models import CollaborationTypes, RequestStatus, Collaboration, CollaborationWorkFlow, CollaborationRequest, AcademicDisciplines, ColaborationStatus, CollaborationCategory, IndustryFields, RequestCollabPosition
from users.models import User, ProfileInfo
from .constants import *
from users.serializers import ProfileSerializer, ProfileInfoSerializer
from django.core.files.storage import FileSystemStorage
from django.contrib.auth import get_user_model

import json

class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value

class CommentReplySerializer(serializers.ModelSerializer):
    print("lero")
    # comment = StringSerializer(many=False)

    # class Meta:
    #     model = CommentReply
    #     fields = ("id", "comment")

class FeaturedCollaborationSerializer(serializers.ModelSerializer):
    collaboration_type = StringSerializer(many=False)
    class Meta:
        model = Collaboration
        fields = ('id', 'collaboration_type')

class CollaborationSerializer(serializers.ModelSerializer):
    collaboration_type = StringSerializer(many=False)
    collaboration_ad = StringSerializer(many=False)
    collaboration_cat = StringSerializer(many=False)
    collaboration_if = StringSerializer(many=False)
    timesamp = StringSerializer(many=False)
    user_info = serializers.SerializerMethodField()
    
    def get_user_thumbnail(self, obj):
        request = self.context.get('request')
        print("COLAS: ", obj.author.profile.profile_avatar)
        profile_thumbnail = ProfileSerializer(obj.author.profile, many=False, context={'request': request}).data["profile_avatar"]
        print("COLAS 2: ", profile_thumbnail)
        return profile_thumbnail

    def get_user_info(self, obj):
        # print("COLAS SX: ", obj.collaborators.get(username="q").profileinfo_set.all().values("name")[0] )
        request = self.context.get('request')
        userId = obj.collaborators.all().values()[0]["id"]
        profile_info = ProfileInfoSerializer(ProfileInfo.objects.get(profile_username=userId), many=False, context={'request': request} ).data
        # profile_name = obj.collaborators.get(username="q").profileinfo_set.all().values("name")
        return profile_info

    class Meta:
        model = Collaboration
        fields = ('id', 'collaboration_type', "timesamp", "collaboration_ad", "collaboration_cat", "collaboration_if", "user_info")

    def get_feedback_forms(self, obj):
        # obj is an assignment
        #choices = AssignmentChoiceSerializer(obj, many=False).data
        # print(choices)
        # return choices
        print("CollaborationSerializer object")
        print(CollaborationSerializer(obj, many=True).data)
        # return (CollaborationSerializer(obj.choices.assignment_choices, many=True).data)

    def create(self, request, *args):
        data = request
        print("DATA")
        print(data)
        print("args: ", args)
        article = Collaboration()

        self.add_fields(data['type'].lower(), 0, article)
        self.add_fields(data['category'][0], 1, article)
        if(data['academic'] is not None):
            self.add_fields(data['academic'][1], 2, article)
        if(data['industry'] is not None):
            self.add_fields(data['industry'][0], 3, article)
            self.add_fields(data['position'][0], 4, article)
        article.save()

        article.collaborators.add(User.objects.get(username=data["user"]) )
        # print("HASATTRB: ", hasattr(data, "project_crowdfunding_type"))
        # if("project_crowdfunding_type" in data):
        #     self.add_fields(data['project_crowdfunding_type'], 2, project)

        article.save()
        return article
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
                print("try on !List type")
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
                print("except on !List type: ", e)
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
        ct = CollaborationTypes()
        cc = CollaborationCategory()
        ad = AcademicDisciplines()
        indf = IndustryFields()
        cp = RequestCollabPosition()
        switcher={
                0:ct,
                1:cc,
                2:ad,
                3:indf,
                4:cp,
            }
        print("switcher: ", switcher.get(i))
        return switcher.get(i,"Invalid day of week")

    def scher2(self, i):
        switcher={
                0:CollaborationTypes.CHOICES,
                1:CollaborationCategory.CHOICES,
                2:ACADEMIC_DISCIPLINES_CHOICES,
                3:INDUSTRY_FIELDS_CHOICES,
                4:COLLABORATION_POSITIONS,
                # 2:CrowdfundingTypes.CHOICES,
            }
        return switcher.get(i,"Invalid day of week")
    
    #Not the variable name assigned to the FK
    def scher3(self, m, i, f):
        if(i == 0):
            m.collaboration_type = f        
            return m
        elif(i == 1):
            m.collaboration_cateogry = f
            return m
        elif(i == 2):
            m.a_d = f
            return m
        elif(i == 3):
            m.i_f = f
            return m
        elif(i == 2):
            m.collab_pos = f
            return m
        else:
            return "Invalid"
    
    def scher4(self, i):
        switcher={
                0:CollaborationTypes,
                1:CollaborationCategory,
                2:AcademicDisciplines,
                3:IndustryFields,
                4:RequestCollabPosition
            }
        return switcher.get(i,"Invalid day of week")

    def scher5(self, i, m, university):
        sch = self.scher4(i)
        if(i == 0):
            print("KONGOS KUDOS: ", m)
            mt = sch.objects.get(collaboration_type=m)
            print("KONGOS: ", mt)
            #ManyToMany
            try:
                print("try at scher5 ")
                university.collaboration_type.add(mt)
            #Foreign Key
            except Exception as e:
                print("except at scher5: ", e)
                university.collaboration_type = mt
            return 
        elif(i == 1):
            mt = sch.objects.get(collaboration_cateogry=m)    
            #ManyToMany
            try:
                university.collaboration_cat.add(mt)
            #Foreign Key
            except Exception as e:
                print("except at scher5: ", e)
                university.collaboration_cat = mt
            return 
        elif(i == 2):
            mt = sch.objects.get(a_d=m)    
            print("KONGOS KUDOS II: ", mt)
            #ManyToMany
            try:
                print("try at scher5 ")
                university.collaboration_ad.add(mt)
            #Foreign Key
            except Exception as e:
                print("except at scher5: ", e)
                university.collaboration_ad = mt
            return 
        elif(i == 3):
            mt = sch.objects.get(i_f=m)    
            #ManyToMany
            try:
                university.collaboration_if.add(mt)
            #Foreign Key
            except Exception as e:
                print("except at scher5: ", e)
                university.collaboration_if = mt
            return 
        elif(i == 4):
            mt = sch.objects.get(collab_pos=m)    
            #ManyToMany
            try:
                university.collaboration_pos.add(mt)
            #Foreign Key
            except Exception as e:
                print("except at scher5: ", e)
                university.collaboration_pos = mt
            return 
        else:
            return "Invalid day of week"

class CollabRequestSerializer(serializers.Serializer):
    collaboration_type = StringSerializer(many=False)

    class Meta:
        model = CollaborationRequest
        fields = ("requester", "recipient", "timestamp")

    def create(self, request, *args):
        data = request
        print("DATA")
        print(data)
        print("args: ", args)
        article = CollaborationRequest()
        article.requester = User.objects.get(username=data["user"])
        article.recipient = User.objects.get(username=data["recipient"])
        article.collaboration = Collaboration.objects.get(id=data["collabId"])

        article.save()
        return article

class academicDiscListSerializer(serializers.Serializer):
    academic_disc = serializers.SerializerMethodField()
    
    def get_academic_disc(self, obj):
        ob = []
        index = 0
        for ad in ACADEMIC_DISCIPLINES_CHOICES:
            jsonobj = {}
            for ad_sub_cat in ad:            
                if(type(ad_sub_cat) is list):
                    nList = []
                    for disc in ad_sub_cat:
                        nList.append({"value": disc[0], "label": disc[1]})
                    dest = {**jsonobj, "children": nList}
                    ob.append( dest )
                else:
                    jsonobj = {"value": ad_sub_cat, "label": ad_sub_cat.upper()}

        obj = ob
        return obj
    
    class Meta:
        fields = (
            "academic_disc",
        )

class ChoicesListSerializer(serializers.Serializer):
    academic_disc = serializers.SerializerMethodField()
    industry_fields = serializers.SerializerMethodField()
    collab_position = serializers.SerializerMethodField()
    collab_categories = serializers.SerializerMethodField()

    def get_academic_disc(self, obj):
        ob = []
        index = 0
        for ad in ACADEMIC_DISCIPLINES_CHOICES:
            jsonobj = {}
            for ad_sub_cat in ad:            
                if(type(ad_sub_cat) is list):
                    nList = []
                    for disc in ad_sub_cat:
                        nList.append({"value": disc[0], "label": disc[1]})
                    dest = {**jsonobj, "children": nList}
                    ob.append( dest )
                else:
                    jsonobj = {"value": ad_sub_cat, "label": ad_sub_cat.upper()}

        obj = ob
        return obj
    
    def get_industry_fields(self, obj):
        ob = []
        for d in INDUSTRY_FIELDS_CHOICES:
            ob.append({"value": d[0], "label": d[1]})
        obj = ob
        return obj

    def get_collab_position(self, obj):
        ob = []
        for d in COLLABORATION_POSITIONS:
            ob.append({"value": d[0], "label": d[1]})
        obj = ob
        return obj
    
    def get_collab_categories(self, obj):
        ob = []
        for d in CollaborationCategory.CHOICES:
            ob.append({"value": d[0], "label": d[1]})
        obj = ob
        return obj

    
    class Meta:
        fields = (
            "academic_disc",
            "industry_fields",
            "collab_position",
            "collab_categories"
        )