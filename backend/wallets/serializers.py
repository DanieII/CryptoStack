from rest_framework import serializers
from .models import Wallet, Coin


class WalletListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wallet
        fields = ["id", "platform"]


class WalletCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wallet
        fields = ["platform", "api_key"]

    def to_internal_value(self, data):
        instance = super().to_internal_value(data)
        instance["user"] = self.context["request"].user
        return instance


class CoinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coin
        fields = "__all__"
