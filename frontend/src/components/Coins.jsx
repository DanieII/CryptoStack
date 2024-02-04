import Coin from "./Coin";

const Coins = ({ coins }) => {
  return (
    <div className="container flex flex-col bg-neutral-900 rounded-2xl">
      <table className="text-white w-full mt-2">
        <thead>
          <tr>
            <th className="text-left p-3">Coin</th>
            <th className="text-right p-3">Amount</th>
            <th className="text-right p-3">Holdings</th>
            <th className="text-right p-3">Last 24h</th>
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
