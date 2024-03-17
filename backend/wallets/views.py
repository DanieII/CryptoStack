from rest_framework import generics
from .serializers import (
    WalletSerializer,
    WalletCreateSerializer,
)
from .models import Wallet


class WalletsView(generics.ListCreateAPIView):
    def get_queryset(self):
        user = self.request.user
        wallets = Wallet.objects.filter(user=user)

        return wallets

    def get_serializer_class(self):
        if self.request.method == "POST":
            return WalletCreateSerializer
        else:
            return WalletSerializer


class WalletView(generics.RetrieveDestroyAPIView):
    serializer_class = WalletSerializer

    def get_queryset(self):
        pk = self.kwargs.get("pk")
        user = self.request.user
        wallet = Wallet.objects.filter(pk=pk, user=user)

        return wallet
