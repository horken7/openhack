from rest_framework import serializers
from .models import Jobs, Housing, Applicant, Heatmap

class HousingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Housing
        fields = '__all__'


class JobsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Jobs
        fields = '__all__'

class ApplicantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Applicant
        fields = '__all__'

class HeatmapSerializer(serializers.ModelSerializer):
    class Meta:
        model = Heatmap
        fields = '__all__'