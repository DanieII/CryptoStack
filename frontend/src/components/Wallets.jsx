import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import api from "../services/apiService";

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
      <div>
        {wallets.map((wallet) => (
          <div key={wallet.id}>{wallet.platform}</div>
        ))}
      </div>
    </>
  );
};

export default Wallets;
