import { useState } from "react";

const Coin = ({ coin }) => {
  const getCoinLogoLink = (coin) => {
    const symbol = coin.symbol.toLowerCase();
    return `https://assets.coincap.io/assets/icons/${symbol}@2x.png`;
  };

  const calculateHoldings = (coin) => {
    const holdings = coin.amount * coin.priceUsd;
    return holdings.toFixed(2);
  };

  return (
    <tr className="hover:bg-neutral-800 transition-all">
      <th className="text-left p-3">
        <div className="flex gap-3 content-center items-center">
          <img
            className="max-w-10"
            src={getCoinLogoLink(coin)}
            alt={`${coin.name} logo`}
          />
          <div>
            <p>{coin.name}</p>
            <p className="text-neutral-400">{coin.symbol}</p>
          </div>
        </div>
      </th>
      <th className="text-right p-3">{coin.amount}</th>
      <th className="text-right p-3">${calculateHoldings(coin)}</th>
      <th className="text-right p-3">
        {parseFloat(coin.changePercent24Hr).toFixed(2)}%
      </th>
    </tr>
  );
};

export default Coin;
