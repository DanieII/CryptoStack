from rest_framework import generics
from wallets.models import Wallet
from .serializers import CoinSerializer, CoinCreateSerializer
from .models import Coin


class CoinView(generics.ListCreateAPIView):
    def get_queryset(self):
        user = self.request.user
        user_wallets = Wallet.objects.filter(user=user)
        coins = Coin.objects.filter(wallet__in=user_wallets)

        return coins

    def get_serializer_class(self):
        if self.request.method == "POST":
            return CoinCreateSerializer
        else:
            return CoinSerializer
