from django.db import models
from django.contrib.auth import get_user_model

UserModel = get_user_model()


class Wallet(models.Model):
    PLATFORM_CHOICES = [("custom", "custom"), ("bybit", "bybit"), ("mexc", "mexc")]
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE)
    platform = models.CharField(max_length=200, choices=PLATFORM_CHOICES)
    api_key = models.CharField(max_length=200, null=True, blank=True)
    api_secret = models.CharField(max_length=200, null=True, blank=True)
