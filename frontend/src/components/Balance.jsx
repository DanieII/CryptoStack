import { useState, useEffect } from "react";
import { getWalletCoins, calculateWalletBalance } from "../utils/wallet";
import api from "../services/apiService";
import Chart from "chart.js/auto";

const Balance = () => {
  const [balance, setBalance] = useState("0");
  let walletsData = {};

  const calculateBalance = async (wallets) => {
    let totalBalance = 0;

    for (const wallet of wallets) {
      const walletCoins = await getWalletCoins(wallet);
      const walletBalance = parseFloat(calculateWalletBalance(walletCoins));
      totalBalance += walletBalance;

      if (!walletsData.hasOwnProperty(wallet.platform)) {
        walletsData[wallet.platform] = 0;
      }
      walletsData[wallet.platform] += walletBalance;
    }

    return totalBalance.toFixed(2);
  };

  const displayChart = () => {
    const canvas = document.getElementById("line-chart");
    const ctx = canvas.getContext("2d");
    const labels = ["Mexc", "Bybit", "Custom"];
    const data = [];

    for (const label of labels) {
      const balance = walletsData[label.toLowerCase()];

      data.push(balance ? balance : 0);
    }

    Chart.getChart(ctx)?.destroy();

    const chart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: ["#1877F2", "#F7A600", "lightgreen"],
            hoverOffset: 4,
          },
        ],
      },
    });

    return chart;
  };

  useEffect(() => {
    let ignore = false;

    const setData = async () => {
      const response = await api.get("/wallets/");

      if (!ignore) {
        const balance = await calculateBalance(response.data);
        setBalance(balance);
        displayChart();
      }
    };

    setData();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="flex">
      <p className="flex-1 text-3xl my-auto text-center">Balance ${balance}</p>
      <canvas className="flex-1 !w-1/2 !h-1/2" id="line-chart"></canvas>
    </div>
  );
};

export default Balance;
