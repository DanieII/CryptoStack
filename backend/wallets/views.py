from rest_framework import generics
from .serializers import WalletSerializer
from rest_framework.response import Response


class WalletCreateView(generics.CreateAPIView):
    serializer_class = WalletSerializer

    def post(self, request, *args, **kwargs):
        # TODO: Save Wallet
        # serializer = WalletSerializer(data=request.data, commit=False)
        pass
