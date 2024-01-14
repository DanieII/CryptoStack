from rest_framework import serializers
from .models import Coin
from wallets.models import Wallet


class CoinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coin
        fields = ["id", "name", "amount"]


class CoinCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coin
        fields = ["name", "amount"]

    def to_internal_value(self, data):
        instance = super().to_internal_value(data)
        instance["wallet"] = Wallet.objects.filter(id=data.get("walletId")).get()
        return instance
