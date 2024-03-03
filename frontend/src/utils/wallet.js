import getCoinData from "./getCoinData";

const getWalletCoins = async (wallet) => {
  const data = await getCoinData(wallet.coins);
  const coins = [];

  for (const coin of wallet.coins) {
    const { name, amount } = coin;
    const coinData = data.find((c) => c.symbol === coin.name);

    if (coinData) {
      coins.push({ name, amount, ...coinData });
    }
  }

  return coins;
};

const calculate24HCHange = (coins, balance) => {
  const totalValue24HrAgo = coins.reduce((total, coin) => {
    const price24HrAgo =
      parseFloat(coin.priceUsd) /
      (1 + parseFloat(coin.changePercent24Hr) / 100);

    return total + coin.amount * price24HrAgo;
  }, 0);

  const change = ((balance - totalValue24HrAgo) / totalValue24HrAgo) * 100;

  return change.toFixed(2);
};

const calculateWalletBalance = (coins) => {
  let balance = coins.reduce(
    (sum, coin) => sum + parseFloat(coin.amount) * parseFloat(coin.priceUsd),
    0,
  );

  return balance.toFixed(2);
};

export { getWalletCoins, calculate24HCHange, calculateWalletBalance };
