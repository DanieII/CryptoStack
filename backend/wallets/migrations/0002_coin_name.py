# Generated by Django 4.2.3 on 2024-01-11 09:59

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("wallets", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="coin",
            name="name",
            field=models.CharField(default="BTC", max_length=200),
            preserve_default=False,
        ),
    ]