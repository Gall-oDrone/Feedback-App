from rest_framework import serializers

from .models import Survey, Question, SurveyChoices, Choice, GradedSurvey, SurveyCounter
from users.models import User

class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value


class QuestionSerializer(serializers.ModelSerializer):
    choices = StringSerializer(many=True)
    teacher = StringSerializer(many=False)

    class Meta:
        model = Question
        fields = ("id", "choices", "question", "order", "teacher")


class SurveySerializer(serializers.ModelSerializer):
    questions = serializers.SerializerMethodField()

    class Meta:
        model = Survey
        fields = ('__all__')

    def get_questions(self, obj):
        # obj is an survey
        questions = QuestionSerializer(obj.questions.all(), many=True).data
        return questions

    def create(self, request):
        data = request.data
        print(data)

        survey = Survey()
        s_counter = SurveyCounter()
        teacher = User.objects.get(username=data["teacher"])
        survey.teacher = teacher
        survey.title = data["title"]
        survey.article = data{"article"}
        survey.save()

        order = 1
        for q in data['questions']:
            newQ = Question()
            newQ.question = q['title']
            newQ.order = order
            newQ.save()

            for c in q['choices']:
                newC = Choice()
                newC.title = c
                newC.save()
                newQ.choices.add(newC)

            newQ.answer = Choice.objects.get(title=q['answer'])
            newQ.survey = survey
            newQ.save()
            oder += 1
        s_counter += 1
        return survey

class GradedSurveySerializer(serializers.ModelSerializer):
    student = StringSerializer(many=False)
    survey = StringSerializer(many=False)

    class Meta:
        model = GradedSurvey
        fields = ('__all__')

    def create(self, request):
        data = request.data
        print(data)

        surveys = Survey.objects.get(id=data['asntId'])
        student = User.objects.get(username=data['username'])

        graded_asnt = GradedSurvey()
        graded_asnt.survey = survey
        graded_asnt.student = student

        questions = [q for q in surveys.questions.all()]
        answers = [data['answers'][a] for a in data['answers']]

        # answered_correct_count = 0
        # for i in range(len(questions)):
        #     if questions[i].answer.title == answers[i]:
        #         answered_correct_count += 1
        #     i += 1

        # grade = answered_correct_count / len(questions)
        # graded_asnt.grade = gradegraded_asnt.save()
        # return graded_asnt

        answered_q_counter = 0
        for i in range(len(questions)):
            if questions[i].answer.title != None or len(questions[i].answer.title) > 1:
                answered_q_counter += 1
            i += 1

        if (answered_q_counter == len(questions)):
            graded_asnt.survey_completed = True
        else:
            graded_asnt.survey_completed = False

        graded_asnt.grade = gradegraded_asnt.save()
        return graded_asnt


class SurveyChoicesSerializer(serializers.ModelSerializer):

    class Meta:
        model = SurveyChoices
        fields = ('__all__')

class SurveyChoiceSerializer(serializers.ModelSerializer):
    survey_choices = StringSerializer(many=True)
    #survey_choice = StringSerializer(many=True)
    #survey_choice = StringSerializer(many=False)
    # teacher = StringSerializer(many=False)

    class Meta:
        model = SurveyChoices
        fields = ("survey_choices")

    def get_choices(self, obj):
        # obj is an survey
        #choices = SurveyChoiceSerializer(obj, many=False).data
        #print(choices)
        #return choices
        print(SurveyChoiceSerializer(obj.choices.all(), many=True).data)
        return (SurveyChoiceSerializer(obj.choices.survey_choices, many=True).data)
