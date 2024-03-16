from rest_framework import generics
from .serializers import (
    WalletSerializer,
    WalletCreateSerializer,
)
from .models import Wallet


class WalletsView(generics.ListCreateAPIView):
    queryset = Wallet.objects.all()

    def get_serializer_class(self):
        if self.request.method == "POST":
            return WalletCreateSerializer
        else:
            return WalletSerializer


class WalletView(generics.RetrieveDestroyAPIView):
    serializer_class = WalletSerializer

    def get_queryset(self):
        pk = self.kwargs.get("pk")
        return Wallet.objects.filter(pk=pk)
