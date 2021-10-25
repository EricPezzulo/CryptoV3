import axios from "axios";
import { useEffect, useState } from "react";
import CharacterCard from "../components/CharacterCard";

export default function Home() {
  const [coinData, setCoinData] = useState([]);

  const coinEndpoint =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

  useEffect(async () => {
    const fetchData = async () => {
      try {
        const res = await axios.get(coinEndpoint);
        setCoinData(res.data);
      } catch (error) {
        console.log("A problem has occured while trying to fetch data");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col w-full items-center justify-center min-h-screen py-2">
      <h1 className="text-5xl">Coin List</h1>
      <h3 className="text-2xl">CoinGecko API</h3>

      <div className="flex flex-wrap w-10/12 justify-center items-center h-full rounded-xl bg-gradient-to-br from-purple-200 to-blue-200">
        {coinData.map((coin) => (
          <div key={coin.id} className="flex m-2">
            <CharacterCard
              coinName={coin.name}
              coinSymbol={coin.symbol}
              coinID={coin.id}
              coinImage={coin.image}
              coinPriceChange24Hr={coin.price_change_percentage_24h}
              coinMarketCap={coin.market_cap}
              coinHigh24hr={coin.high_24h}
              coinLow24Hr={coin.low_24h}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
