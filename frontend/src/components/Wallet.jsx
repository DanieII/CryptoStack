import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import getcapitalizedWord from "../utils/getCapitalizedWord";
import {
  getWalletCoins,
  calculate24HCHange,
  calculateWalletBalance,
} from "../utils/wallet";

const Wallet = ({ wallet, onDelete }) => {
  const [walletBalance, setWalletBalance] = useState(0);
  const [wallet24HChange, setWallet24HChange] = useState("0");
  const navigate = useNavigate();

  const setWalletInfo = async () => {
    if (wallet.coins.length <= 0) {
      return;
    }

    const coins = await getWalletCoins(wallet.coins);
    const balance = calculateWalletBalance(coins);
    const change = calculate24HCHange(coins, balance);

    setWalletBalance(balance);
    setWallet24HChange(change);
  };

  const handleRowClick = () => {
    navigate(`${wallet.id}`);
  };

  useEffect(() => {
    setWalletInfo();
  }, []);

  return (
    <tr
      className="hover:bg-neutral-800 transition-all cursor-pointer"
      onClick={handleRowClick}
    >
      <th className="text-left p-3">{getcapitalizedWord(wallet.platform)}</th>
      <th className="text-right p-3">{wallet.coins.length}</th>
      <th className="text-right p-3">${walletBalance}</th>
      <th
        className={`text-right p-3 ${
          wallet24HChange < 0 ? "text-red-600" : "text-green-600"
        }`}
      >
        {wallet24HChange}%
      </th>
      <th>
        <p className="text-red-600 w-fit mx-auto" onClick={onDelete}>
          Delete <i className="fa-solid fa-trash"></i>
        </p>
      </th>
    </tr>
  );
};

export default Wallet;
