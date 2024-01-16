import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../services/apiService";
import { useFormData } from "../utils/formData";
import {
  getWalletCoins,
  calculate24HCHange,
  calculateWalletBalance,
} from "../utils/wallet";
import Coins from "./Coins";

const WalletDetails = () => {
  const [walletBalance, setWalletBalance] = useState(0);
  const [wallet24HChange, setWallet24HChange] = useState(0);
  const [wallet, setWallet] = useState();
  const [coins, setCoins] = useState();
  const { walletId } = useParams();
  const { formData, setFormData, handleInputChange } = useFormData({
    walletId: walletId,
    name: "",
    amount: 0,
  });
  const coinFormRef = useRef();

  const getWallet = async () => {
    const data = await api.get(`/wallets/${walletId}/`);

    return data.data;
  };

  const setWalletInfo = async () => {
    const wallet = await getWallet();
    setWallet(wallet);

    if (wallet.coins.length <= 0) {
      return;
    }

    const coins = await getWalletCoins(wallet);
    const balance = calculateWalletBalance(coins);
    const change = calculate24HCHange(coins, balance);

    setCoins(coins);
    setWalletBalance(balance);
    setWallet24HChange(change);
  };

  const handleAddCoinClick = (e) => {
    coinFormRef.current.classList.toggle("!hidden");
  };

  const handleCoinFormSubmit = async (e) => {
    e.preventDefault();

    const response = api.post("/coins/", formData);
  };

  useEffect(() => {
    setWalletInfo();
  }, []);

  return (
    <div className="flex flex-col gap-6  text-white">
      <div className="container flex flex-col justify-between relative bg-neutral-900 rounded-2xl">
        <Link to="/wallets">
          <i className="fa-solid fa-arrow-left text-white "></i>
        </Link>
        {wallet && wallet.platform === "custom" ? (
          <div>
            <p
              className="underline cursor-pointer"
              onClick={handleAddCoinClick}
            >
              Add a coin
            </p>
            <form
              className="absolute top-8 right-0 form !hidden border border-neutral-800"
              onSubmit={handleCoinFormSubmit}
              ref={coinFormRef}
            >
              <input
                type="text"
                name="name"
                placeholder="Name"
                required
                onChange={handleInputChange}
              />
              <input
                type="number"
                name="amount"
                placeholder="Amount"
                min="1"
                required
                onChange={handleInputChange}
              />
              <button type="submit" className="button text-black">
                Add Coin
              </button>
            </form>
          </div>
        ) : null}
        <div className="flex justify-around text-center py-10">
          <div>
            <p className="text-xl">Unique Coins</p>
            <p className="text-2xl">{wallet ? wallet.coins.length : 0}</p>
          </div>
          <div>
            <p className="text-xl">Wallet Balance</p>
            <p className="text-2xl">${walletBalance}</p>
          </div>
          <div>
            <p className="text-xl">24 Hour Change</p>
            <p className="text-2xl">{wallet24HChange}%</p>
          </div>
        </div>
      </div>
      {coins && <Coins coins={coins} />}
    </div>
  );
};

export default WalletDetails;