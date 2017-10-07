from rest_framework import permissions, viewsets, generics, filters

from .serializers import JobsSerializer, HousingSerializer, ApplicantSerializer, HeatmapSerializer

from .models import Jobs, Housing, Applicant, Heatmap
from .data_collection.collect_data import CollectData

debug = True

if(debug):
    apa = CollectData()

class JobsViewSet(viewsets.ModelViewSet):
    queryset = Jobs.objects.all().order_by('company')
    serializer_class = JobsSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('city', 'city')

class HousingViewSet(viewsets.ModelViewSet):
    queryset = Housing.objects.all().order_by('address')
    serializer_class = HousingSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

class ApplicantViewSet(viewsets.ModelViewSet):
    queryset = Applicant.objects.all().order_by('name')
    serializer_class = ApplicantSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

class HeatmapViewSet(viewsets.ModelViewSet):
    queryset = Heatmap.objects.all().order_by('occupation')
    serializer_class = HeatmapSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)