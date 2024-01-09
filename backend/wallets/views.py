from rest_framework import generics
from .serializers import WalletListSerializer, WalletCreateSerializer
from .models import Wallet


class WalletView(generics.ListCreateAPIView):
    queryset = Wallet.objects.all()

    def get_serializer_class(self):
        if self.request.method == "POST":
            return WalletCreateSerializer
        else:
            return WalletListSerializer
