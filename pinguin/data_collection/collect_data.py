import requests, json

from pinguin.models import Jobs
from .arbetsformedlingen_api import HandlerArbetsformedlingenAPI
from .google_geocoding_api import HandlerGoogleGeocodingAPI

class CollectData:
    def __init__(self):

        self.abfAPI = HandlerArbetsformedlingenAPI()
        self.ggcAPI = HandlerGoogleGeocodingAPI()

        self.get_jobs()
        # abfAPI.getLans()

    def get_jobs(self):
        ind = 21800400
        for i in range():
            try:
                response = self.abfAPI.get_platsannons(ind+i)
                json_data = json.loads(response.text)
                company = json_data['platsannons']['arbetsplats']['arbetsplatsnamn']
                address = json_data['platsannons']['arbetsplats']['besoksadress']
                zipcode = json_data['platsannons']['arbetsplats']['postnummer']
                city = json_data['platsannons']['arbetsplats']['postort']
                type = json_data['platsannons']['annons']['yrkesbenamning']
                latitude, longitude = self.ggcAPI.get_coordinates(address, zipcode, city)
                j = Jobs(company=company, type=type, latitude=latitude, longitude=longitude)
                j.save()
            except:
                pass
            print(i)