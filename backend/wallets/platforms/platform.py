from abc import ABC, abstractmethod
from django.core.exceptions import ValidationError
from coins.models import Coin


class Platform(ABC):
    @staticmethod
    @abstractmethod
    def get_wallet_coins(api_key, api_secret):
        pass

    @classmethod
    def fill_wallet(cls, wallet, api_key, api_secret):
        coins = cls.get_wallet_coins(api_key, api_secret)
        coin_instances = []

        for name, balance in coins.items():
            coin_instances.append(Coin(wallet=wallet, name=name, amount=float(balance)))

        Coin.objects.bulk_create(coin_instances)

    @classmethod
    def validate_api_connection(cls, api_key, api_secret):
        coins = cls.get_wallet_coins(api_key, api_secret)

        if not coins:
            raise ValidationError("Couldn't connect to platform")
