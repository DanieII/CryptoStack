import getCoinData from "./getCoinData";

const getWalletCoins = async (wallet) => {
  const data = await getCoinData(wallet.coins);
  const coins = [];

  for (const coin of wallet.coins) {
    const { name, amount } = coin;
    const coinData = data.data.find((c) => c.id === coin.name.toLowerCase());

    coins.push({ name, amount, ...coinData });
  }

  return coins;
};

const calculate24HCHange = (coins, balance) => {
  let balance24HAgo = 0;

  for (const coin of coins) {
    const coinAmount = parseInt(coin.amount);
    const coinPrice = parseFloat(coin.priceUsd);
    const coin24HChange = parseFloat(coin.changePercent24Hr);

    const priceNow = coinAmount * coinPrice;
    balance24HAgo += priceNow / (1 + coin24HChange / 100);
  }

  const change = (balance - balance24HAgo) / balance24HAgo;

  return `${change.toFixed(2)}%`;
};

const calculateWalletBalance = (coins) => {
  let balance = coins.reduce(
    (sum, coin) => sum + parseFloat(coin.amount) * parseFloat(coin.priceUsd),
    0,
  );

  return `$${balance.toFixed(2)}`;
};

export { getWalletCoins, calculate24HCHange, calculateWalletBalance };
