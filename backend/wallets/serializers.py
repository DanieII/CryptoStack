from rest_framework import serializers
from .models import Wallet
from coins.serializers import CoinSerializer
from wallets.platforms import mexc


class WalletSerializer(serializers.ModelSerializer):
    coins = CoinSerializer(many=True, source="coin_set")

    class Meta:
        model = Wallet
        fields = ["id", "platform", "coins"]


class WalletCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wallet
        fields = ["platform", "api_key"]

    def to_internal_value(self, data):
        user = self.context["request"].user
        instance = super().to_internal_value(data)
        instance["user"] = user
        mexc.get_wallet_coins(user)
        return instance

    def save(self, **kwargs):
        return
