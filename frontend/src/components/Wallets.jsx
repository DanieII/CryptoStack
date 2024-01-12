import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import api from "../services/apiService";
import Wallet from "./Wallet";

const Wallets = () => {
  const [wallets, setWallets] = useState([]);

  useEffect(() => {
    api.get("/wallets/").then((response) => setWallets(response.data));
  }, []);

  return (
    <>
      <Link className="text-white underline" to="create">
        Create a wallet
      </Link>
      <table className="text-white w-full mt-2">
        <thead>
          <tr>
            <th className="text-left pb-1">Name</th>
            <th className="text-right pb-1">Coins</th>
            <th className="text-right pb-1">Balance</th>
            <th className="text-right pb-1">24H Change</th>
          </tr>
        </thead>
        <tbody>
          {wallets.map((wallet) => (
            <Wallet key={wallet.id} wallet={wallet} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Wallets;
