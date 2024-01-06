from rest_framework import serializers
from .models import Wallet, Coin


class WalletSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wallet
        fields = "__all__"


class WalletCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wallet
        fields = "__all__"

    def save(self, **kwargs):
        # TODO: See if all fields are required
        # add user
        return super().save(**kwargs)


class CoinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coin
        fields = "__all__"
