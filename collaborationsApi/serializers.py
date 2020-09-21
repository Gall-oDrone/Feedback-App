from rest_framework import serializers
from .models import CollaborationTypes, RequestStatus, Collaboration, CollaborationWorkFlow, CollaborationRequest, AcademicDisciplines
from users.models import User, ProfileInfo
from .constants import ACADEMIC_DISCIPLINES_CHOICES
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

class CollaborationSerializer(serializers.ModelSerializer):
    collaboration_type = StringSerializer(many=False)
    collaborators = StringSerializer(many=False)
    collaboration_ad = StringSerializer(many=False)
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
        fields = ('id', 'collaboration_type', "timesamp", "collaboration_ad", "collaborators", "user_info")

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
        self.add_fields(data['field'][1], 1, article)
        article.save()
        print("DATA CORSO")
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
        ad = AcademicDisciplines()
        # ct = CrowdfundingTypes()
        switcher={
                0:ct,
                1:ad,
                # 2:ct,
            }
        print("switcher: ", switcher.get(i))
        return switcher.get(i,"Invalid day of week")

    def scher2(self, i):
        switcher={
                0:CollaborationTypes.CHOICES,
                1:ACADEMIC_DISCIPLINES_CHOICES,
                # 2:CrowdfundingTypes.CHOICES,
            }
        return switcher.get(i,"Invalid day of week")
    
    #Not the variable name assigned to the FK
    def scher3(self, m, i, f):
        if(i == 0):
            m.collaboration_type = f        
            return m
        elif(i == 1):
            m.a_d = f
            return m
        elif(i == 2):
            m.crowdfunding_type = f
            return m
        else:
            return "Invalid day of week"
    
    def scher4(self, i):
        switcher={
                0:CollaborationTypes,
                1:AcademicDisciplines,
                # 2:CrowdfundingTypes,
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
        elif(i == 2):
            mt = sch.objects.get(crowdfunding_type=m)    
            print("CACAS: ", mt)
            university.project_crowdfunding_type = mt
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
        article.requester = data["user"]
        article.recipient = data["author"]
        collab = Collaboration()
        article.collaboration = collab.get(id=data["collabId"])

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