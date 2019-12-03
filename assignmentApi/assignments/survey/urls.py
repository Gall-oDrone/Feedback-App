from rest_framework.routers import DefaultRouter
from assignmentApi.views import AssignmentChoicesViewSet

router = DefaultRouter()
router.register(r'', AssignmentChoicesViewSet, base_name='assignmentChoices')
urlpatterns = (router.urls)