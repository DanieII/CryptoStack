import time
import requests
import hmac
import hashlib
from .platform import Platform


URL = "https://www.mexc.com/open/api/v2/account/info"


class Mexc(Platform):
    def get_wallet_coins(api_key, api_secret):
        headers = {
            "ApiKey": api_key,
            "Request-Time": str(Mexc.get_server_time()),
            "Signature": Mexc.get_signature(api_key, api_secret),
        }
        response = requests.request("GET", URL, headers=headers)

        if response.status_code != 200:
            return False

        data = dict(response.json())
        coins = data["data"]

        return coins

    @staticmethod
    def get_server_time():
        return int(time.time() * 1000)

    @staticmethod
    def get_signature(api_key, api_secret):
        signature = api_key + str(Mexc.get_server_time())
        signature = hmac.new(
            api_secret.encode(), signature.encode(), hashlib.sha256
        ).hexdigest()
        return signature
