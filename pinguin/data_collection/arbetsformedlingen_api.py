import requests, json

class HandlerArbetsformedlingenAPI:
    """
        This is a handler for the Arbetsformedlingen api.
        Contains a set of functions to make API calls where each
        function returns the JSON? data as seen fit in this project
    """
    def __index__(self, key = "", password = ""):
        self.key = key
        self.pw = password

    def get_lans(self):
        headers = {'Accept-Language': 'sv'}
        url = "http://api.arbetsformedlingen.se/af/v0/platsannonser/soklista/lan2"
        response = requests.get(url, headers=headers)
        print(response.text)


    def get_platsannons(self, id):
        headers = {'Accept-Language': 'sv'}
        url = "http://api.arbetsformedlingen.se/af/v0/platsannonser/" + str(id)
        response = requests.get(url, headers=headers)
        json_data = json.loads(response.text)
        return json_data

    def get_occupation_city(self, occupation, city):
        headers = {'Accept-Language': 'sv'}
        url = "http://api.arbetsformedlingen.se/af/v0/platsannonser/matchning?nyckelord=" + str(occupation) + " " + str(city)
        response = requests.get(url, headers=headers)
        json_data = json.loads(response.text)
        return json_data




