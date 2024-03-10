import Balance from "./Balance";
import TopCoins from "./TopCoins";

const Portfolio = () => {
  return (
    <div className="flex flex-col gap-6 text-white">
      <Balance />
      <TopCoins />
    </div>
  );
};

export default Portfolio;
