import getCoinData from "./getCoinData";

const getWalletCoins = async (coins) => {
  const data = await getCoinData(coins);
  const walletCoins = [];

  for (const coin of coins) {
    const { name, amount } = coin;
    const coinData = data.find((c) => c.symbol === coin.name);

    if (coinData) {
      walletCoins.push({ name, amount, ...coinData });
    }
  }

  return walletCoins;
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
