from django.db import models

from django.db.models.signals import post_save, post_delete, pre_save

from django.dispatch import receiver
from datetime import datetime

class Housing(models.Model):
    """
    Creates table for storing information about housing.
    """
    vanity = models.CharField(max_length=200, help_text='vanity name')
    address = models.CharField(max_length=200, help_text='address of the house')
    longitude = models.FloatField(null=True, help_text='longitude of the house')
    latitude= models.FloatField(null=True, help_text='latitude of the house')
    prize = models.IntegerField(help_text='prise of the house')
    rooms = models.IntegerField(help_text='prise of the house', null=True)
    size = models.IntegerField(help_text='prise of the house', null=True)
    created_at = models.DateTimeField(auto_now_add=True, help_text = 'timestamp when entry created')
    updated_at = models.DateTimeField(auto_now=True, help_text = 'timestamp when entry updated')
    def __str__(self):
        return  self.vanity


class Jobs(models.Model):
    """
    Creates table for storing information about jobs.
    """
    company = models.CharField(max_length=200, help_text='the name of the company')
    type = models.CharField(max_length=200, help_text='job type')
    skills = models.CharField(max_length=200, help_text='required skills')
    address = models.CharField(max_length=200, help_text='address of the company')
    salary = models.CharField(max_length=200, help_text='salary for the position')
    longitude = models.FloatField(null=True, help_text='longitude of the house')
    latitude = models.FloatField(null=True, help_text='latitude of the house')
    created_at = models.DateTimeField(auto_now_add=True, help_text='timestamp when entry created')
    updated_at = models.DateTimeField(auto_now=True, help_text='timestamp when entry updated')
    def __str__(self):
        return  self.vanity


class Applicant(models.Model):
    """
    Creates table for storing information about jobs.
    """
    name = models.CharField(max_length=200, help_text='applicant name')
    skills = models.CharField(max_length=200, help_text='skills separated by comma (,)')
    created_at = models.DateTimeField(auto_now_add=True, help_text='timestamp when entry created')
    updated_at = models.DateTimeField(auto_now=True, help_text='timestamp when entry updated')
    def __str__(self):
        return  self.vanity