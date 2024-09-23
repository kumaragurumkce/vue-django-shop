from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StudentViewSet,CategoryViewSet

router = DefaultRouter()
router.register('students', StudentViewSet, basename='student')
router.register('categories', CategoryViewSet, basename='category')  # Register CategoryViewSet

urlpatterns = [
    path('api/', include(router.urls)),
]