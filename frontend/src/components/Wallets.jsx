import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/apiService";
import Wallet from "./Wallet";

const Wallets = () => {
  const [wallets, setWallets] = useState([]);

  const handleDeleteClick = (walletId) => {
    return (e) => {
      e.stopPropagation();
      api.delete(`/wallets/${walletId}`);
      setWallets((prevWallets) =>
        prevWallets.filter((wallet) => wallet.id !== walletId),
      );
    };
  };

  useEffect(() => {
    api.get("/wallets/").then((response) => setWallets(response.data));
  }, []);

  return (
    <div className="container bg-neutral-900 rounded-2xl text-white">
      {" "}
      <Link className="underline block text-center sm:text-left" to="create">
        Create a wallet
      </Link>
      <table className="w-full mt-2">
        <thead>
          <tr>
            <th className="text-left py-3 sm:p-3">Platform</th>
            <th className="text-right hidden sm:block p-3">Unique Coins</th>
            <th className="text-right py-3 sm:p-3">Balance</th>
            <th className="text-right hidden sm:block p-3">24H Change</th>
          </tr>
        </thead>
        <tbody>
          {wallets.map((wallet) => (
            <Wallet
              key={wallet.id}
              wallet={wallet}
              onDelete={handleDeleteClick(wallet.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Wallets;
