from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("users/", include("users.urls")),
    path("coins/", include("coins.urls")),
    path("wallets/", include("wallets.urls")),
]
