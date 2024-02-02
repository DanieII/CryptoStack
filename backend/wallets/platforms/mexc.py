import time
import requests
import hmac
import hashlib


URL = "https://www.mexc.com/open/api/v2/account/info"
# TODO Get keys through user
API_KEY = ""
SECRET_KEY = ""


def get_server_time():
    return int(time.time() * 1000)


def get_signature():
    signature = API_KEY + str(get_server_time())
    signature = hmac.new(
        SECRET_KEY.encode(), signature.encode(), hashlib.sha256
    ).hexdigest()
    return signature


def get_wallet_coins(user):
    headers = {
        "Accept-Language": "en-US,en;q=0.5",
        "ApiKey": API_KEY,
        "Request-Time": str(get_server_time()),
        "Signature": get_signature(),
    }
    response = requests.request("GET", URL, headers=headers)
    data = dict(response.json())
    assets = data["data"]
    coins = {}

    for name, info in assets.items():
        coins[name] = float(info.available)
