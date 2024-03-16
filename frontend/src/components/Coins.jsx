import Coin from "./Coin";

const Coins = ({ coins }) => {
  return (
    <div className="container flex flex-col bg-neutral-900 rounded-2xl">
      <table className="text-white w-full sm:mt-2">
        <thead>
          <tr>
            <th className="text-left py-3 sm:p-3">Coin</th>
            <th className="text-right hidden sm:block p-3">Amount</th>
            <th className="text-right py-3 sm:p-3">Holdings</th>
            <th className="text-right hidden sm:block p-3">Last 24h</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <Coin key={coin.name} coin={coin} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Coins;
