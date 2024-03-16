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
import apiCoins from "../utils/apiCoins";
import getcapitalizedWord from "../utils/getCapitalizedWord";

const WalletDetails = () => {
  const [walletBalance, setWalletBalance] = useState(0);
  const [wallet24HChange, setWallet24HChange] = useState(0);
  const [wallet, setWallet] = useState();
  const [coins, setCoins] = useState();
  const { walletId } = useParams();
  const defaultCoinName = "BTC";
  const { formData, setFormData, handleInputChange } = useFormData({
    walletId: walletId,
    name: defaultCoinName,
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

    const coins = await getWalletCoins(wallet.coins);
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

    try {
      await api.post("/coins/", formData);
      setWalletInfo();
    } catch (error) {
      return;
    }
  };

  const getReadableCoinName = (coinName) => {
    return coinName
      .split("-")
      .map((w) => getcapitalizedWord(w))
      .join(" ");
  };

  useEffect(() => {
    setWalletInfo();
  }, []);

  return (
    <div className="flex flex-col gap-6  text-white">
      <div className="container flex flex-col justify-between relative bg-neutral-900 rounded-2xl">
        <div className="flex justify-between">
          <Link to="/wallets">
            <i className="fa-solid fa-arrow-left text-white "></i>
          </Link>
          {wallet?.platform === "custom" ? (
            <div>
              <p
                className="underline cursor-pointer"
                onClick={handleAddCoinClick}
              >
                Add a coin
              </p>
              <form
                className="absolute top-10 right-0 form !hidden border border-neutral-800 w-3/4 sm:w-1/2 md:w-1/3"
                onSubmit={handleCoinFormSubmit}
                ref={coinFormRef}
              >
                <select
                  name="name"
                  defaultValue={defaultCoinName}
                  required
                  onChange={handleInputChange}
                >
                  {Object.entries(apiCoins).map(([symbol, name]) => (
                    <option key={symbol} value={symbol}>
                      {getReadableCoinName(name)}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  step="any"
                  name="amount"
                  placeholder="Amount"
                  min="0"
                  required
                  onChange={handleInputChange}
                />
                <button type="submit" className="button text-black">
                  Add Coin
                </button>
              </form>
            </div>
          ) : null}
        </div>
        <div className="flex justify-around text-center py-10">
          <div className="hidden sm:block">
            <p className="text-xl">Unique Coins</p>
            <p className="text-2xl">{wallet ? wallet.coins.length : 0}</p>
          </div>
          <div>
            <p className="text-xl">Wallet Balance</p>
            <p className="text-2xl">${walletBalance}</p>
          </div>
          <div>
            <p className="text-xl">24 Hour Change</p>
            <p
              className={`text-2xl ${
                wallet24HChange < 0 ? "text-red-600" : "text-green-600"
              }`}
            >
              {wallet24HChange}%
            </p>
          </div>
        </div>
      </div>
      {coins && <Coins coins={coins} />}
    </div>
  );
};

export default WalletDetails;
