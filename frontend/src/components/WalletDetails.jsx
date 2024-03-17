import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/apiService";
import {
  getWalletCoins,
  calculate24HCHange,
  calculateWalletBalance,
} from "../utils/wallet";
import Coins from "./Coins";
import AddCoin from "./AddCoin";

const WalletDetails = () => {
  const [walletBalance, setWalletBalance] = useState(0);
  const [wallet24HChange, setWallet24HChange] = useState(0);
  const [wallet, setWallet] = useState();
  const [coins, setCoins] = useState();
  const [isFetched, setIsFetched] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const { walletId } = useParams();

  const getWallet = async () => {
    try {
      const response = await api.get(`/wallets/${walletId}/`);
      setIsValid(true);
      return response.data;
    } catch (error) {
      setIsValid(false);
      return;
    } finally {
      setIsFetched(true);
    }
  };

  const setWalletInfo = async () => {
    console.log("NEW SET");
    const walletData = await getWallet();

    if (!walletData || walletData.coins.length <= 0) {
      return;
    }

    const coinsData = await getWalletCoins(walletData.coins);
    const balance = calculateWalletBalance(coinsData);
    const change = calculate24HCHange(coinsData, balance);
    setWallet(walletData);
    setCoins(coinsData);
    setWalletBalance(balance);
    setWallet24HChange(change);
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
          {wallet && <AddCoin wallet={wallet} setWalletInfo={setWalletInfo} />}
        </div>
        {isFetched &&
          (isValid ? (
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
          ) : (
            <p className="text-red-600 text-center">
              This wallet could not be accessed
            </p>
          ))}
      </div>
      {coins && <Coins coins={coins} />}
    </div>
  );
};

export default WalletDetails;
