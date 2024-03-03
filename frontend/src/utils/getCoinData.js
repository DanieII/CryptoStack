import apiCoins from "./apiCoins";

const getCoinData = async (coins) => {
  // const pricesWs = new WebSocket(
  //   "wss://ws.coincap.io/prices?assets=bitcoin,ethereum,monero,litecoin",
  // );
  // pricesWs.onmessage = function (msg) {
  //   console.log(msg.data);
  // };

  if (coins.length === 0) {
    return [];
  }

  const coinNames = coins.reduce(
    (names, coin) => [...names, apiCoins[coin.name.toUpperCase()]],
    [],
  );
  const response = await fetch(
    `https://api.coincap.io/v2/assets?ids=${coinNames.join(",")}`,
  );
  const data = await response.json();

  return data.data;
};

export default getCoinData;
