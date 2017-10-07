from django.db import models

from django.db.models.signals import post_save, post_delete, pre_save

from django.dispatch import receiver
from datetime import datetime

class Housing(models.Model):
    """
    Creates table for storing information about housing.
    """
    address = models.CharField(max_length=200, help_text='address of the house')
    city = models.CharField(max_length=200, help_text='city of the house')
    longitude = models.FloatField(null=True, help_text='longitude of the house')
    latitude= models.FloatField(null=True, help_text='latitude of the house')
    prize = models.IntegerField(help_text='prise of the house')
    squaremeters = models.IntegerField(help_text='square meters the house', null=True)
    created_at = models.DateTimeField(auto_now_add=True, help_text = 'timestamp when entry created')
    updated_at = models.DateTimeField(auto_now=True, help_text = 'timestamp when entry updated')
    ad_id = models.IntegerField(help_text='id of arbetsformedlinen add to be used for new api request')
    def __str__(self):
        return  self.address


class Jobs(models.Model):
    """
    Creates table for storing information about jobs.
    """
    company = models.CharField(max_length=200, help_text='the name of the company')
    type = models.CharField(max_length=200, help_text='job type')
    # skills = models.CharField(max_length=200, help_text='required skills')
    # address = models.CharField(max_length=200, help_text='address of the company')
    # salary = models.CharField(max_length=200, null=True, help_text='salary for the position')
    city = models.CharField(max_length=200, help_text='city of the company')
    longitude = models.FloatField(help_text='longitude of the house')
    latitude = models.FloatField(help_text='latitude of the house')
    created_at = models.DateTimeField(auto_now_add=True, help_text='timestamp when entry created')
    updated_at = models.DateTimeField(auto_now=True, help_text='timestamp when entry updated')
    ad_id = models.IntegerField(help_text='id of arbetsformedlinen add to be used for new api request')
    def __str__(self):
        return  self.company


class Applicant(models.Model):
    """
    Creates table for storing information about jobs.
    """
    name = models.CharField(max_length=200, help_text='applicant name')
    type = models.CharField(max_length=200, help_text='looking for type of role')
    created_at = models.DateTimeField(auto_now_add=True, help_text='timestamp when entry created')
    updated_at = models.DateTimeField(auto_now=True, help_text='timestamp when entry updated')
    def __str__(self):
        return  self.name


class Heatmap(models.Model):
    """
    Creates table for storing information about density of jobs and houses depending on occupation.
    """
    occupation = models.CharField(max_length=200, help_text='occupation/job type')
    city = models.CharField(max_length=200, help_text='city')
    heat = models.FloatField(help_text='normalised heat value')
    longitude = models.FloatField(help_text='longitude of the city')
    latitude = models.FloatField(help_text='latitude of the city')
    created_at = models.DateTimeField(auto_now_add=True, help_text='timestamp when entry created')
    updated_at = models.DateTimeField(auto_now=True, help_text='timestamp when entry updated')
    def __str__(self):
        return  self.city