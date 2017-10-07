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
        return response




