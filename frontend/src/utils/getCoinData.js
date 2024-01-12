const getCoinData = async (coins) => {
  // const pricesWs = new WebSocket(
  //   "wss://ws.coincap.io/prices?assets=bitcoin,ethereum,monero,litecoin",
  // );
  // pricesWs.onmessage = function (msg) {
  //   console.log(msg.data);
  // };

  const coinNames = coins.reduce(
    (names, coin) => [...names, coin.name.toLowerCase()],
    [],
  );
  const response = await fetch(
    `https://api.coincap.io/v2/assets?ids=${coinNames.join(",")}`,
  );
  const data = await response.json();

  return data;
};

export default getCoinData;
