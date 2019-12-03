from rest_framework import serializers

from .models import Assignment, Question, AssignmentChoices, Choice, GradedAssignment
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


class AssignmentSerializer(serializers.ModelSerializer):
    questions = serializers.SerializerMethodField()

    class Meta:
        model = Assignment
        fields = ('__all__')

    def get_questions(self, obj):
        # obj is an assignment
        questions = QuestionSerializer(obj.questions.all(), many=True).data
        return questions

    def create(self, request):
        data = request.data
        print(data)

        assignment = Assignment()
        teacher = User.objects.get(username=data["teacher"])
        assignment.teacher = teacher
        assignment.title = data["title"]
        assignment.save()

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
            newQ.assignment = assignment
            newQ.save()
            oder += 1
        return assignment

class GradedAssignmentSerializer(serializers.ModelSerializer):
    student = StringSerializer(many=False)
    assignment = StringSerializer(many=False)

    class Meta:
        model = GradedAssignment
        fields = ('__all__')

    def create(self, request):
        data = request.data
        print(data)

        assignments = Assignment.objects.get(id=data['asntId'])
        student = User.objects.get(username=data['username'])

        graded_asnt = GradedAssignment()
        graded_asnt.assignment = assignment
        graded_asnt.student = student

        questions = [q for q in assignments.questions.all()]
        answers = [data['answers'][a] for a in data['answers']]

        answered_correct_count = 0
        for i in range(len(questions)):
            if questions[i].answer.title == answers[i]:
                answered_correct_count += 1
            i += 1

        grade = answered_correct_count / len(questions)
        graded_asnt.grade = gradegraded_asnt.save()
        return graded_asnt

class AssignmentChoicesSerializer(serializers.ModelSerializer):

    class Meta:
        model = AssignmentChoices
        fields = ('__all__')

class AssignmentChoiceSerializer(serializers.ModelSerializer):
    assignment_choices = StringSerializer(many=True)
    #assignment_choice = StringSerializer(many=True)
    #assignment_choice = StringSerializer(many=False)
    # teacher = StringSerializer(many=False)

    class Meta:
        model = AssignmentChoices
        fields = ("assignment_choices")

    def get_choices(self, obj):
        # obj is an assignment
        #choices = AssignmentChoiceSerializer(obj, many=False).data
        #print(choices)
        #return choices
        print(AssignmentChoiceSerializer(obj.choices.all(), many=True).data)
        return (AssignmentChoiceSerializer(obj.choices.assignment_choices, many=True).data)
