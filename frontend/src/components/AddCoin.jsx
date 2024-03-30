import { useRef } from "react";
import { useFormData } from "../utils/formData";
import api from "../services/apiService";
import apiCoins from "../utils/apiCoins";
import getcapitalizedWord from "../utils/getCapitalizedWord";

const AddCoin = ({ wallet, setWalletInfo }) => {
  const defaultCoinName = "BTC";
  const { formData, setFormData, handleInputChange } = useFormData({
    walletId: wallet.id,
    name: defaultCoinName,
    amount: 0,
  });
  const coinFormRef = useRef();

  const handleAddCoinClick = (e) => {
    coinFormRef.current.classList.toggle("!hidden");
  };

  const handleCoinFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/coins/", formData);
      await setWalletInfo();
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

  return (
    <>
      {wallet?.platform === "custom" ? (
        <div>
          <p className="underline cursor-pointer" onClick={handleAddCoinClick}>
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
    </>
  );
};

export default AddCoin;
