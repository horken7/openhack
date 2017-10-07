import time
from http import client
import requests
from hashlib import sha1
import random
import string
import json

class HandlerBooliAPI:
    def __init__(self):
        self.callerId = 'horken7'
        self.timestamp = str(int(time.time()))
        self.unique = ''.join(random.choice(string.ascii_uppercase + string.digits) for x in range(16))
        self.hashstr = sha1((self.callerId + self.timestamp + "bbFT6ahtP4AKICKuziL0z9E294Nd986REkDh3rtq" + self.unique).encode('utf-8')).hexdigest()

    def update_timestamp(self):
        self.timestamp = str(int(time.time()))
        self.unique = ''.join(random.choice(string.ascii_uppercase + string.digits) for x in range(16))
        self.hashstr = sha1((self.callerId + self.timestamp + "bbFT6ahtP4AKICKuziL0z9E294Nd986REkDh3rtq" + self.unique).encode('utf-8')).hexdigest()

    def test(self):
        self.update_timestamp()
        headers = {'Accept': 'application/vnd.booli-v2+json'}
        url = "http://api.booli.se/listings?q=nacka&callerId=" + self.callerId + "&time=" + self.timestamp + "&unique=" + self.unique + "&hash=" + self.hashstr

        response = requests.get(url, headers=headers)
        json_data = json.loads(response.text)
        print(json_data)

    def listings_city(self, city):
        self.update_timestamp()
        headers = {'Accept': 'application/vnd.booli-v2+json'}
        url = "http://api.booli.se/listings?q=" + str(city) + "&callerId=" + self.callerId + "&time=" + self.timestamp + "&unique=" + self.unique + "&hash=" + self.hashstr

        response = requests.get(url, headers=headers)
        try:
            json_data = json.loads(response.text)
            return json_data
        except:
            pass