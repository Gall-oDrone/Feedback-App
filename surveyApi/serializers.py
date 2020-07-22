from rest_framework import serializers

from .models import Survey, SurveyUseCase, Question, Choice, Choice, GradedSurvey, SurveyCounter
from articlesApi.models import Article
from users.models import User

class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value


class QuestionSerializer(serializers.ModelSerializer):
    
    # questions = StringSerializer(many=True)
    # question = StringSerializer(many=False)
    choices = StringSerializer(many=True)
    teacher = StringSerializer(many=False)
    # answer = StringSerializer(many=False)
    # survey = StringSerializer(many=False)
    # order = StringSerializer(many=False)

    class Meta:
        model = Question
        fields = ("id", "choices", "question", "order", "teacher")


class SurveyListSerializer(serializers.ModelSerializer):
    # questions = serializers.SerializerMethodField()
    title = StringSerializer(many=False)
    teacher = StringSerializer(many=False)
    article = StringSerializer(many=False)
    survey_use_case = StringSerializer(many=False)
    class Meta:
        model = Survey
        fields = ('__all__')

class SurveySerializer(serializers.ModelSerializer):
    survey_questions = serializers.SerializerMethodField()
    # title = serializers.SerializerMethodField()
    # teacher = serializers.SerializerMethodField()
    # article = serializers.SerializerMethodField()

    class Meta:
        model = Survey
        fields = ('__all__')

    def get_survey_questions(self, obj):
        # obj is an survey
        print("OBJ", obj)
        questions = QuestionSerializer(obj.survey_questions.all(), many=True).data
        return questions

    def create(self, request):
        data = request.data
        print(data)

        survey = Survey()
        teacher = User.objects.get(username=data["teacher"])
        survey.teacher = teacher
        survey.title = data["title"]
        survey.overview = data["overview"]
        survey.reward = data["reward"]
        survey.save()

        order = 1
        for q in data['questions']:
            newQ = Question()
            newQ.question = q['title']
            newQ.order = order
            newQ.survey = Survey.objects.get(id=survey.id)
            newQ.save()

            for c in q['choices']:
                newC = Choice()
                newC.title = c
                newC.save()
                newQ.choices.add(newC)

            # newQ.answer = Choice.objects.get(title=q['answer'])
            # newQ.answer = "ANSW1"
            newQ.survey = Survey.objects.get(id=survey.id)
            newQ.save()
            order += 1
        
        self.add_fields(data('user_case'),0, survey)
        return survey

    def add_fields(self, field, i, model):
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
            mtype = self.scher5(i, newM, model)
        except:
            print("except")
            print(f)
            newM = self.scher3(i)
            ms = self.scher2(i)
            shh = self.scher6(newM, i, f)
            newM.save()
            print("End except")
            print("newM: ", newM)
            mtype = self.scher5(i, newM, model)
        print("live her alo")

    def scher2(self, i):
        switcher={
                0:SurveyUseCase.CHOCIES,
            }
        return switcher.get(i,"Invalid day of week")

    def scher3(self, i):
        u = SurveyUseCase()
        switcher={
                0:u,
            }
        print("switcher: ", switcher.get(i))
        return switcher.get(i,"Invalid day of week")
 
    def scher6(self, m, i, f):
        if(i == 0):
            m.survey_use_case = f            
            return m
        else:
            return "Invalid day of week"
    
    def scher4(self, i):
        switcher={
                0:SurveyUseCase,
            }
        return switcher.get(i,"Invalid day of week")

    def scher5(self, i, m, university):
        sch = self.scher4(i)
        if(i == 0):
            mt = sch.objects.get(survey_use_case=m)    
            university.survey_use_case = mt
            return 
        else:
            return "Invalid day of week"

class GradedSurveySerializer(serializers.ModelSerializer):
    student = StringSerializer(many=False)
    survey = StringSerializer(many=False)
    grade = StringSerializer(many=False)
    survey_completed = StringSerializer(many=False)
    article = StringSerializer(many=False)
    respondent = StringSerializer(many=False)
    respondent_answers = StringSerializer(many=True)

    class Meta:
        model = GradedSurvey
        fields = ('__all__')

    def create(self, request):
        print("#1")
        data = request.data
        print(data)

        surveys = Survey.objects.get(id=data['asntId'])
        student = User.objects.get(username=data['username'])

        graded_asnt = GradedSurvey()
        graded_asnt.survey = surveys
        graded_asnt.respondent = graded_asnt.student = student
        choices = Choice()
        article = Article()

        questions = [q for q in surveys.survey_questions.all()]
        print("questions", questions)
        answers = [data['respondent_answers'][a] for a in data['respondent_answers']]
        print("answers", answers)
        answered_q_counter = 0
        if(len(questions) == len(answers)):
            for i in range(len(answers)):
                if answers[i] != None or len(answers[i]) > 1:
                    answered_q_counter += 1
                i += 1

        if (answered_q_counter == len(questions)):
            graded_asnt.survey_completed = True
        else:
            graded_asnt.survey_completed = False
        graded_asnt.article = Article.objects.get(id="1")
        grade = answered_q_counter / len(questions)
        graded_asnt.grade = grade
        graded_asnt.save()
        for i in range(len(answers)):
            add_choices = Choice.objects.get(title=answers[i])
            graded_asnt.respondent_answers.add(add_choices.id)
        return graded_asnt


class SurveyChoicesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Choice
        fields = ('__all__')

class SurveyChoiceSerializer(serializers.ModelSerializer):
    survey_choices = StringSerializer(many=True)
    #survey_choice = StringSerializer(many=True)
    #survey_choice = StringSerializer(many=False)
    # teacher = StringSerializer(many=False)

    class Meta:
        model = Choice
        fields = ("survey_choices")

    def get_choices(self, obj):
        # obj is an survey
        #choices = SurveyChoiceSerializer(obj, many=False).data
        #print(choices)
        #return choices
        print(SurveyChoiceSerializer(obj.choices.all(), many=True).data)
        return (SurveyChoiceSerializer(obj.choices.survey_choices, many=True).data)
   
class ProfileSurveyListSerializer(serializers.ListSerializer):
    child = SurveyListSerializer()
    allow_null = True
    many = True
