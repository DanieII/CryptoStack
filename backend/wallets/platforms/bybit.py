from .platform import Platform
from pybit.unified_trading import HTTP
from pybit.exceptions import InvalidRequestError


class Bybit(Platform):
    def get_wallet_coins(api_key, api_secret):
        session = HTTP(api_key=api_key, api_secret=api_secret)
        coins = {}
        account_types = ["FUND", "UNIFIED", "CONTRACT"]

        for account_type in account_types:
            try:
                coins_balance = session.get_coins_balance(
                    accountType=account_type,
                )["result"]["balance"]
            except InvalidRequestError:
                return False

            for coin in coins_balance:
                coin_name = coin["coin"]
                coin_amount = float(coin["walletBalance"])

                if coin_amount > 0:
                    if coin_name not in coins:
                        coins[coin_name] = 0
                    coins[coin_name] += coin_amount

        return coins
