from rest_framework import permissions, viewsets
from django.shortcuts import render

from .serializers import JobsSerializer, HousingSerializer, ApplicantSerializer

from .models import Jobs, Housing, Applicant

class JobsViewSet(viewsets.ModelViewSet):
    queryset = Jobs.objects.all().order_by('company')
    serializer_class = JobsSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)


class HousingViewSet(viewsets.ModelViewSet):
    queryset = Housing.objects.all().order_by('vanity')
    serializer_class = HousingSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

class ApplicantViewSet(viewsets.ModelViewSet):
    queryset = Applicant.objects.all().order_by('name')
    serializer_class = ApplicantSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

def index(request):
    return render(request, 'pinguin/index.html')