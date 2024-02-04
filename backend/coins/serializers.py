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
        wallet = Wallet.objects.filter(id=data.get("walletId")).get()
        instance = super().to_internal_value(data)
        instance["wallet"] = wallet
        self.wallet = wallet
        self.coin_data = data

        return instance

    def save(self, **kwargs):
        if self.coin_exists():
            self.update_existing_coin()
            return

        return super().save(**kwargs)

    def coin_exists(self):
        wallet_coins = self.wallet.coin_set.all()

        for coin in wallet_coins:
            if coin.name == self.coin_data.get("name"):
                self.coin = coin
                return True

        return False

    def update_existing_coin(self):
        self.coin.amount += float(self.coin_data.get("amount"))
        self.coin.save()
