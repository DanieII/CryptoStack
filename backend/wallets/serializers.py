from rest_framework import serializers
from .models import Wallet
from coins.serializers import CoinSerializer
from common.functions import get_platform_class


class WalletSerializer(serializers.ModelSerializer):
    coins = CoinSerializer(many=True, source="coin_set")

    class Meta:
        model = Wallet
        fields = ["id", "platform", "coins"]


class WalletCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wallet
        fields = ["platform", "api_key", "api_secret"]

    def to_internal_value(self, data):
        user = self.context["request"].user
        instance = super().to_internal_value(data)
        instance["user"] = user

        return instance

    def validate(self, attrs):
        platform, api_key, api_secret = (
            attrs["platform"],
            attrs["api_key"],
            attrs["api_secret"],
        )
        platform_class = get_platform_class(platform)
        self.platform_class = platform_class
        self.api_key = api_key
        self.api_secret = api_secret

        if platform_class:
            platform_class.validate_api_connection(api_key, api_secret)

        return super().validate(attrs)

    def save(self, **kwargs):
        instance = super().save(**kwargs)

        if self.platform_class:
            self.platform_class.fill_wallet(instance, self.api_key, self.api_secret)

        return instance
