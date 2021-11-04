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
  // const [coinImage, setCoinImage] = useState("");
  const [coinID, setCoinID] = useState("");
  // const [coinSymbol, setCoinSymbol] = useState("");
  // const [coinName, setCoinName] = useState("");
  // const [coin24H_high, setCoin24H_high] = useState("");
  // const [coin24H_low, setCoin24H_low] = useState("");
  const [description, setDescription] = useState("");
  const [watchlistName, setWatchlistName] = useState("");

  // const [sessionData, setSessionData] = useState();
  // const [userID, setUserID] = useState();
  // const [userEmial, setUserEmail] = useState();
  // const [userData, setUserData] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [selectWatchlist, setSelectWatchlist] = useState("");

  const apiEndpoint = `https://api.coingecko.com/api/v3/coins/${coinURL}`;
  const getData = async () => {
    try {
      const res = await axios.get(apiEndpoint);
      const { data } = res;
      setCoinData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrentUser = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/users/${session?.id}`
      );
      const { data } = res;
      // console.log([data]);
      setCurrentUser(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
    getCurrentUser();
  }, [coinData, currentUser]);

  const createNewWatchlist = async () => {
    try {
      const res = await axios({
        url: `http://localhost:5000/api/users/${session?.id}/addwatchlist`,
        method: "PUT",
        data: {
          watchlistName: watchlistName,
          coins: {
            coin: {
              coinID: coinID,
            },
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
          watchlistName: selectWatchlist,
          coinID: coinID,
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
          <img src={coinData.image?.large} alt="currency logo" />
        </div>
      </div>
      <div className="flex flex-col w-5/6 self-center">
        <p className="flex text-white">Name: {coinData.name}</p>
        <p className="flex text-white">Symbol: {coinData.symbol}</p>
        <p className="flex text-white">
          Comunity score: {coinData.community_score}
        </p>
        <p className="flex text-white">
          {coinData?.description?.en
            ? coinData?.description?.en
            : "no description availible"}
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
            {/* <select onChange={(e) => setSelectWatchlist(e.target.value)}> */}
            {/* {currentUser.map((coin) => {
                return (
                  <>
                    {coin?.watchlists.map((c) => {
                      return (
                        <option key={c.id} value={c.watchlistName}>
                          {c.watchlistName}
                        </option>
                      );
                    })}
                  </>
                );
              })} */}
            {/* </select> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
