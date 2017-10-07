from django.conf.urls import url, include
from rest_framework.schemas import get_schema_view
from rest_framework.routers import DefaultRouter

from . import views

schema_view = get_schema_view(title='Pinguin API')

router = DefaultRouter()
router.register(r'jobs', views.JobsViewSet)
router.register(r'housing', views.HousingViewSet)
# router.register(r'applicant', views.ApplicantViewSet)
router.register(r'heatmap', views.HeatmapViewSet)

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^api/$', include(router.urls)),
    url(r'^schema/$', schema_view),
]

# request authentication for modification requests of api
urlpatterns += [
    url(r'^api/auth/', include('rest_framework.urls',
                               namespace='rest_framework')),
]