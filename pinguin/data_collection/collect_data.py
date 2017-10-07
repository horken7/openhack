import requests, json
import numpy as np
from pinguin.models import Jobs, Heatmap, Housing
from .arbetsformedlingen_api import HandlerArbetsformedlingenAPI
from .google_geocoding_api import HandlerGoogleGeocodingAPI
from .booli_api import HandlerBooliAPI

from geopy.geocoders import Nominatim

class CollectData:
    def __init__(self):

        self.abfAPI = HandlerArbetsformedlingenAPI()
        self.ggcAPI = HandlerGoogleGeocodingAPI()
        self.houseAPI = HandlerBooliAPI()

        self.cities = ['stockholm', 'göteborg', 'malmö', 'visby', 'karlstad']
        self.population = {'stockholm':942370, 'göteborg':572779, 'malmö':342457, 'visby':23576, 'karlstad':61685}
        self.occupations = ['lärare', 'kock', 'mjukvaruutvecklare', 'elektriker', 'vård']

        self.geolocator = Nominatim()

        self.get_heatmap()
        self.get_jobs_city()
        self.get_houses()

    def get_heatmap(self):
        heats = []
        for city in self.cities:
            listings = self.houseAPI.listings_city(city)
            amount_houses = listings['totalCount']
            inner_heat = []
            amount_city = 0
            for occupation in self.occupations:
                json_data = self.abfAPI.get_occupation_city(occupation, city)
                amount_occupation = json_data['matchningslista']['antal_platserTotal']
                amount_city = amount_city + amount_occupation
                value = (amount_occupation * amount_houses) / self.population[city]
                inner_heat.append(value)
            heats.append(inner_heat)

            # location = self.geolocator.geocode(city)
            # latitude = location.latitude
            # longitude = location.longitude
            latitude, longitude = self.ggcAPI.get_coordinates_city('stockholm')
            value_city = (amount_city * amount_houses) / self.population[city]
            h = Heatmap(city=city, occupation='all', longitude=longitude, latitude=latitude, heat=value_city)
            h.save()

            print(city)
        heatmatrix = np.asmatrix(heats)
        for i in range(len(heatmatrix)):
            heatmatrix[:, i] = heatmatrix[:, i] / max(heatmatrix[:, i])
        for i, city in enumerate(self.cities):
            # location = self.geolocator.geocode('stockholm')
            # latitude = location.latitude
            # longitude = location.longitude
            latitude, longitude = self.ggcAPI.get_coordinates_city('stockholm')
            for j, occupation in enumerate(self.occupations):
                heat = heatmatrix[i,j]
                h = Heatmap(city=city, occupation=occupation, longitude=longitude, latitude=latitude, heat=heat)
                h.save()

    def get_jobs_city(self):
        for city in self.cities:
            for occupation in self.occupations:
                try:
                    json_data = self.abfAPI.get_occupation_city(occupation, city)
                    ads = json_data['matchningslista']['matchningdata']
                    for job in ads[:15]:
                        ad_id = job['annonsid']
                        json_data = self.abfAPI.get_platsannons(ad_id)
                        company = json_data['platsannons']['arbetsplats']['arbetsplatsnamn']
                        address = json_data['platsannons']['arbetsplats']['besoksadress']
                        zipcode = json_data['platsannons']['arbetsplats']['postnummer']
                        city2 = json_data['platsannons']['arbetsplats']['postort']
                        try:
                            location = self.geolocator.geocode(address + ' ' + zipcode + ' ' + city2)
                            latitude = location.latitude
                            longitude = location.longitude
                            j = Jobs(company=company, type=occupation, city=city, latitude=latitude, longitude=longitude, ad_id=ad_id)
                            j.save()
                        except:
                            pass
                    print(city, occupation)
                except:
                    pass

    def get_houses(self):
        for city in self.cities:
            listings = self.houseAPI.listings_city(city)
            houses = listings['listings']
            for h in houses[:15]:
                try:
                    address = h['location']['address']['streetAddress']
                    longitude = h['location']['position']['longitude']
                    latitude = h['location']['position']['latitude']
                    prize = h['listPrice']
                    squaremeters = h['livingArea']
                    ad_id = h['booliId']
                    ha = Housing(address=address, city=city, longitude=longitude, latitude=latitude, prize=prize, squaremeters=squaremeters, ad_id=ad_id)
                    ha.save()
                except:
                    pass