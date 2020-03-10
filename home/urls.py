from django.contrib import admin
from django.urls import path, include, re_path
from filterApi.views import ReactFilterView
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('admin/', admin.site.urls),
    path('accounts/', include("allauth.urls")),
    path('api/articles/', include('articlesApi.articles.urls')),
    path('assignments/', include('assignmentApi.assignments.urls')),
    path('api/survey/', include('surveyApi.survey.urls')),
    # path('assignmentsChoices/', include('assignmentApi.assignments.survey.urls')),
    path('api/graded-assignments/', include('assignmentApi.graded_assignments.urls')),
    path('api/graded-survey/', include('surveyApi.graded_survey.urls')),
    path('api/incentives/', include('incentivesApi.incentives.urls')),
    path('api/inquiries/', include('inquiriesApi.inquiries.urls')),
    path('api/notifications/', include('notificationsApi.notifications.urls')),
    path('api/live-chat/', include('livechatApi.livechat.urls')),
    # path('api/filter', ReactFilterView.as_view(), name='react'),
    path('api/users/', include('users.urls')),
    re_path(r'^.*', TemplateView.as_view(template_name='index.html'))
    
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL,
                          document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
        
if not settings.DEBUG:
    urlpatterns += [re_path(r'^.*',
                            TemplateView.as_view(template_name='index.html'))]
