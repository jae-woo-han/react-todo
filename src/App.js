import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [cash, setCash] = useState(0);
  const [selectedCoinPrice, setSelectedCoinPrice] = useState(0);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((res) => res.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  const onChageCash = (event) => {
    setCash(event.target.value);
  };
  const onChangeCoin = (event) => {
    console.log(event.target.value);
    setSelectedCoinPrice(event.target.value);
  };
  return (
    <div>
      <h1>The Coins!({coins.length})</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <div>
          <input type="text" onChange={onChageCash} value={cash} />

          <select onChange={onChangeCoin}>
            {coins.map((coin) => (
              <option key={coin.id} value={coin.quotes.USD.price}>
                {coin.name}({coin.symbol}) : ${coin.quotes.USD.price} USD
              </option>
            ))}
          </select>
          <div>{Math.floor(cash / selectedCoinPrice)}</div>
        </div>
      )}
    </div>
  );
}

export default App;
