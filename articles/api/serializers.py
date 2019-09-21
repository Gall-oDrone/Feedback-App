from rest_framework import serializers

from articles.models import Article, Feedback, Survey, URL


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ('id', 'title', 'content')

class URLSerializer(serializers.ModelSerializer):
    class Meta:
        model = URL
        fields = ('url')

class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = ('id', 'user','my project', 'feedback', 'respondent')

class SurveySerializer(serializers.ModelSerializer):
    class Meta:
        model = Survey
        fields = ('id', 'user', 'Total', 'respondent')
