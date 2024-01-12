import { useState, useEffect } from "react";
import getcapitalizedWord from "../utils/getCapitalizedWord";
import getCoinData from "../utils/getCoinData";

const Wallet = ({ wallet }) => {
  const [walletBalance, setWalletBalance] = useState(0);
  const [wallet24HChange, setWallet24HChange] = useState("0%");

  const calculate24HCHange = (coins) => {
    let balance24HAgo = 0;

    for (const coin of coins) {
      const coinAmount = parseInt(coin.amount);
      const coinPrice = parseFloat(coin.priceUsd);
      const coin24HChange = parseFloat(coin.changePercent24Hr);

      const priceNow = coinAmount * coinPrice;
      balance24HAgo += priceNow / (1 + coin24HChange / 100);
    }

    const change = (walletBalance - balance24HAgo) / balance24HAgo;

    return `${change.toFixed(2)}%`;
  };

  const calculateWalletBalance = (coins) => {
    let balance = coins.reduce(
      (sum, coin) => sum + parseFloat(coin.amount) * parseFloat(coin.priceUsd),
      0,
    );

    return `$${balance.toFixed(2)}`;
  };

  const setWalletInfo = async () => {
    if (wallet.coins.length <= 0) {
      return;
    }

    const data = await getCoinData(wallet.coins);
    const coins = [];

    for (const coin of wallet.coins) {
      const { name, amount } = coin;
      const coinData = data.data.find((c) => c.id === coin.name.toLowerCase());

      coins.push({ name, amount, ...coinData });
    }

    setWalletBalance(calculateWalletBalance(coins));
    setWallet24HChange(calculate24HCHange(coins));
  };

  useEffect(() => {
    setWalletInfo();
  }, []);

  return (
    <tr>
      <th className="text-left pb-1">{getcapitalizedWord(wallet.platform)}</th>
      <th className="text-right pb-1">{wallet.coins.length}</th>
      <th className="text-right pb-1">{walletBalance}</th>
      <th className="text-right pb-1">{wallet24HChange}</th>
    </tr>
  );
};

export default Wallet;
