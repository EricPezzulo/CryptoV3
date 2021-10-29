import axios from "axios";
import { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";

export async function getServerSideProps({ query }) {
  const id = query;
  return {
    props: { data: id },
  };
}

function index({ data }) {
  const { data: session } = useSession();
  const coinURL = data.id; // bitcoin
  const [coinData, setCoinData] = useState([]);
  const [coinImage, setCoinImage] = useState("");
  const [coinID, setCoinID] = useState("");
  const [coinSymbol, setCoinSymbol] = useState("");
  const [coinName, setCoinName] = useState("");
  const [coin24H_high, setCoin24H_high] = useState("");
  const [coin24H_low, setCoin24H_low] = useState("");
  const [description, setDescription] = useState("");
  const [watchlistName, setWatchlistName] = useState("");

  const [sessionData, setSessionData] = useState();
  const [userID, setUserID] = useState();
  const [userEmial, setUserEmail] = useState();
  const [userData, setUserData] = useState([]);

  const [selectWatchlist, setSelectWatchlist] = useState("");

  const apiEndpoint = `https://api.coingecko.com/api/v3/coins/${coinURL}`;

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(apiEndpoint);
      const { data } = res;
      console.log(data);
      setCoinData(data);
      setCoinImage(data.image.large);
      setDescription(data.description.en);
      setCoinID(data.id);
      setCoinSymbol(data.symbol);
      setCoinName(data.name);
      setCoin24H_high(data.market_data.high_24h.usd);
      setCoin24H_low(data.market_data.low_24h.usd);
    };

    const getUserData = async () => {
      const res = await axios.get("http://localhost:5000/api/users");
      const { data } = res;
      setUserData(data.data);
      setUserID(data.data[0]._id);
      setUserEmail(data.data[0].email);

      // console.log(data.data[0]._id);
      // console.log(data.data[0]._id);
      // console.log(userData);
      // console.log(session);
    };
    getData();
    getUserData();
  }, []);

  console.log(session?.id);
  // console.log(userData?.[1]?.watchlists?.[1]?.coins[0]);
  console.log(userData);

  // console.log(coinData.id);

  // console.log(session?.user?.email);

  // async function myFunction(req, res) {
  //   const session = await getSession({ req });

  //   console.log(session);
  // }
  // myFunction();
  const createNewWatchlist = async () => {
    try {
      const res = await axios({
        url: `http://localhost:5000/api/users/${session?.id}/addwatchlist`,
        method: "PUT",
        data: {
          watchlistName: watchlistName,
          coins: {
            coinName: coinName,
            coinSymbol: coinSymbol,
            coinID: coinID,
            coinImage: coinImage,
            coin24H_high: coin24H_high,
            coin24H_low: coin24H_low,
          },
        },
      });
      console.log(`${watchlistName} created!`);
    } catch (error) {
      console.log(error);
    }
  };

  const addCoinToWatchlist = async () => {
    try {
      const res = await axios({
        url: `http://localhost:5000/api/users/${session?.id}/addcointowatchlist`,
        method: "PUT",
        data: {
          coinName: coinName,
          coinSymbol: coinSymbol,
          coinID: coinID,
          coinImage: coinImage,
          coin24H_high: coin24H_high,
          coin24H_low: coin24H_low,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-900">
      <div className="flex flex-col w-full h-full items-center">
        <div className="flex mt-10">
          <img src={coinImage} alt="currency logo" />
        </div>
      </div>
      <div className="flex flex-col w-5/6 self-center">
        <p className="flex text-white">Name: {coinData.name}</p>
        <p className="flex text-white">Symbol: {coinData.symbol}</p>
        <p className="flex text-white">
          Comunity score: {coinData.community_score}
        </p>
        <p className="flex text-white">
          {description ? description : "no description availible"}
        </p>
        <div className="flex flex-col p-5">
          <button onClick={createNewWatchlist} className="text-white text-xl">
            Create New WATCHLIST
          </button>
          <input
            type="text"
            onChange={(e) => setWatchlistName(e.target.value)}
          />
        </div>
        <div className="flex flex-col p-5">
          <button onClick={addCoinToWatchlist} className="text-white text-xl">
            add too watchlist
          </button>
          <div className="flex">
            <select onChange={(e) => setSelectWatchlist(e.target.value)}>
              {userData.map((coin) => {
                return (
                  <>
                    {coin?.watchlists.map((c) => {
                      return (
                        <option key={c.id} value={c.watchlists}>
                          {c.watchlistName}
                        </option>
                      );
                    })}
                  </>
                );
              })}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
