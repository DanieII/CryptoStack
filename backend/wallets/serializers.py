from rest_framework import serializers
from .models import Wallet, Coin


class CoinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coin
        fields = ["id", "name", "amount"]


class WalletListSerializer(serializers.ModelSerializer):
    coins = CoinSerializer(many=True, source="coin_set")

    class Meta:
        model = Wallet
        fields = ["id", "platform", "coins"]


class WalletCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wallet
        fields = ["platform", "api_key"]

    def to_internal_value(self, data):
        instance = super().to_internal_value(data)
        instance["user"] = self.context["request"].user
        return instance
