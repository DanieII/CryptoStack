import { useEffect } from "react";
import api from "../services/apiService";
import Coins from "./Coins";
import { useState } from "react";
import { getWalletCoins } from "../utils/wallet";

const TopCoins = () => {
  const [coins, setCoins] = useState([]);
  const topCoinsAmount = 5;

  const combineDuplicateCoins = (coins) => {
    const combinedCoins = coins.reduce((newCoins, currentCoin) => {
      const duplicate = newCoins.find((coin) => coin.id === currentCoin.id);

      if (duplicate) {
        duplicate.amount += currentCoin.amount;
      } else {
        newCoins.push(currentCoin);
      }

      return newCoins;
    }, []);

    return combinedCoins;
  };

  const getCoinHoldings = (coin) => {
    return coin.amount * parseFloat(coin.priceUsd);
  };

  const getTopCoins = (coins) => {
    console.log(coins);
    const topCoins = coins.sort(
      (a, b) => getCoinHoldings(b) - getCoinHoldings(a),
    );

    return topCoins.slice(0, topCoinsAmount);
  };

  useEffect(() => {
    api.get("coins/").then((res) =>
      getWalletCoins(res.data).then((coins) => {
        const combinedCoins = combineDuplicateCoins(coins);
        const topCoins = getTopCoins(combinedCoins);
        setCoins(topCoins);
      }),
    );
  }, []);

  return (
    <div className="container bg-neutral-900 rounded-2xl">
      <p className="text-2xl ml-8">Top Coins</p>
      {coins && <Coins coins={coins} />}
    </div>
  );
};

export default TopCoins;
