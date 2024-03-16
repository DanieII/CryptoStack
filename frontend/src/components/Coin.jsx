const Coin = ({ coin }) => {
  const getCoinLogoUrl = (coin) => {
    const symbol = coin.symbol.toLowerCase();
    return `https://assets.coincap.io/assets/icons/${symbol}@2x.png`;
  };

  const calculateHoldings = (coin) => {
    const holdings = coin.amount * coin.priceUsd;
    return holdings.toFixed(2);
  };

  return (
    <tr className="hover:bg-neutral-800 transition-all">
      <th className="text-left py-2 sm:p-3">
        <div className="flex gap-2 sm:gap-3 content-center items-center">
          <img
            className="max-w-10"
            src={getCoinLogoUrl(coin)}
            alt={`${coin.name} logo`}
          />
          <div>
            <p>{coin.name}</p>
            <p className="text-neutral-400">{coin.symbol}</p>
          </div>
        </div>
      </th>
      <th className="text-right hidden sm:block sm:p-3">{coin.amount}</th>
      <th className="text-right py-2 sm:p-3">${calculateHoldings(coin)}</th>
      <th
        className={`text-right hidden sm:block sm:p-3 ${
          coin.changePercent24Hr < 0 ? "text-red-600" : "text-green-600"
        }`}
      >
        {parseFloat(coin.changePercent24Hr).toFixed(2)}%
      </th>
    </tr>
  );
};

export default Coin;
