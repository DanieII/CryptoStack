import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/apiService";
import Wallet from "./Wallet";

const Wallets = () => {
  const [wallets, setWallets] = useState([]);

  useEffect(() => {
    api.get("/wallets/").then((response) => setWallets(response.data));
  }, []);

  return (
    <div className="container bg-neutral-900 rounded-2xl">
      {" "}
      <Link className="text-white underline" to="create">
        Create a wallet
      </Link>
      <table className="text-white w-full mt-2">
        <thead>
          <tr>
            <th className="text-left p-3">Platform</th>
            <th className="text-right p-3">Unique Coins</th>
            <th className="text-right p-3">Balance</th>
            <th className="text-right p-3">24H Change</th>
          </tr>
        </thead>
        <tbody>
          {wallets.map((wallet) => (
            <Wallet key={wallet.id} wallet={wallet} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Wallets;
