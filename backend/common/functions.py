from wallets.platforms.mexc import Mexc


def get_platform_class(platform):
    if platform == "mexc":
        return Mexc
