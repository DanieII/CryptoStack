from rest_framework import generics
from .serializers import WalletSerializer
from rest_framework.response import Response
from .models import Wallet


class WalletCreateView(generics.CreateAPIView):
    serializer_class = WalletSerializer
