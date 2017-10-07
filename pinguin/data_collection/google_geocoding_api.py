import requests, json

class HandlerGoogleGeocodingAPI:
    def __index__(self):
        self.key = 'AIzaSyA1zbCwaXIYc7Yw7nk0kvsSvBDx-71vTCg'
        self.url = 'https://maps.googleapis.com/maps/api/geocode/json?address=%s+%s+%s'

    def get_coordinates(self, address, zipcode, city):
        url = 'https://maps.googleapis.com/maps/api/geocode/json?address=%s+%s+%s'
        request_url = url % (address, zipcode, city)
        response = requests.get(request_url)
        json_data = json.loads(response.text)
        latitude = json_data['results'][0]['geometry']['location']['lat']
        longitude = json_data['results'][0]['geometry']['location']['lng']
        return latitude, longitude


    def get_coordinates_city(self, city):
        url = 'https://maps.googleapis.com/maps/api/geocode/json?address=%s'
        request_url = url % (city)
        response = requests.get(request_url)
        json_data = json.loads(response.text)
        latitude = json_data['results'][0]['geometry']['location']['lat']
        longitude = json_data['results'][0]['geometry']['location']['lng']
        return latitude, longitude