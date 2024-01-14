from django.db import models
from wallets.models import Wallet


class Coin(models.Model):
    wallet = models.ForeignKey(Wallet, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    amount = models.FloatField()
