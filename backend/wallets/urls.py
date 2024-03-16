from django.urls import path
from .views import WalletsView, WalletView

urlpatterns = [
    path("", WalletsView.as_view(), name="wallets"),
    path("<int:pk>/", WalletView.as_view(), name="wallet"),
]
