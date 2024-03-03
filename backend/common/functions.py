from wallets.platforms.mexc import Mexc
from wallets.platforms.bybit import Bybit


def get_platform_class(platform):
    if platform == "mexc":
        return Mexc
    elif platform == "bybit":
        return Bybit
