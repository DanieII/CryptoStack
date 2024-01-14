from django.urls import path
from .views import WalletView, WalletDetailsView

urlpatterns = [
    path("", WalletView.as_view(), name="wallets"),
    path("<int:pk>/", WalletDetailsView.as_view(), name="wallet_details"),
]
