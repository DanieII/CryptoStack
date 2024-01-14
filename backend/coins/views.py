from rest_framework import generics
from .serializers import CoinSerializer, CoinCreateSerializer
from .models import Coin


class CoinView(generics.ListCreateAPIView):
    queryset = Coin.objects.all()

    def get_serializer_class(self):
        if self.request.method == "POST":
            return CoinCreateSerializer
        else:
            return CoinSerializer
