import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import useSWR from "swr";

export async function getServerSideProps({ query }) {
  const id = query;
  return {
    props: { props: id },
  };
}
const fetcher = (...args) => fetch(...args).then((res) => res.json());
function index({ props }) {
  const { data: session } = useSession();
  const coinURL = props.id; // bitcoin
  const [coinID, setCoinID] = useState(coinURL);
  const [watchlistName, setWatchlistName] = useState("");
  const [selectWatchlist, setSelectWatchlist] = useState("");
  const apiEndpoint = `https://api.coingecko.com/api/v3/coins/${coinURL}`;

  const { data: userData, userError } = useSWR(
    `http://localhost:5000/api/users/${session?.id}`,
    fetcher
  );
  console.log(userData);

  const { data: coinData, coinError } = useSWR(apiEndpoint, fetcher);
  console.log(coinData);
  if (userError || coinError) {
    return <div>failed</div>;
  }
  if (!userData || !coinData) {
    return <div>Loading</div>;
  }

  userData.watchlists.map((i) => console.log(i));

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
            <select onChange={(e) => setSelectWatchlist(e.target.value)}>
              {userData?.watchlists.map((coin) => {
                return (
                  <>
                    <option key={coin.id} value={coin.watchlistName}>
                      {coin.watchlistName}
                    </option>
                    );
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
