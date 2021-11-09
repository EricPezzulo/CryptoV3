import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import CoinInUserProfile from "./CoinInUserProfile";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

function WatchlistContainer({ username }) {
  const { data: session } = useSession();
  const [listOfCoins, setListOfCoins] = useState([]);

  const { data: userData, userError } = useSWR(
    `http://localhost:5000/api/users/${session?.id}`,
    fetcher
  );

  const deleteWatchlist = async (watchlistName) => {
    try {
      const res = await axios({
        url: `http://localhost:5000/api/users/${session?.id}/deletewatchlist`,
        method: "PUT",
        data: {
          watchlistName,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  if (userError) return <div>failed</div>;
  if (!userData) return <div>loading data...</div>;

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/users/${session?.id}`)
      .then((res) => setListOfCoins(res.data.watchlists));
  }, [listOfCoins]);

  return (
    <div className="flex flex-wrap justify-center h-full p-3 rounded-md">
      <div className="flex flex-col w-full absolute left-4">
        <p className="text-2xl font-thin">
          {username}'s Watchlist's ({listOfCoins.length})
        </p>
      </div>
      <div className="flex flex-wrap h-full justify-center p-3 mt-10 rounded-md">
        {listOfCoins.map((i) => (
          <div
            key={i._id}
            className="flex flex-col bg-gray-100 p-2 rounded m-2 h-full w-64"
          >
            <p className="text-2xl font-light">{i.watchlistName}</p>
            {i.coins[0].coin.map((coin) => {
              return (
                <div>
                  {/* <p key={coin.coinID}>{coin.coinID}</p> */}
                  <CoinInUserProfile
                    coinID={coin.coinID}
                    name={coin.name}
                    symbol={coin.symbol}
                    watchlistName={i.watchlistName}
                  />
                </div>
              );
            })}
            <button
              type="button"
              onClick={() => deleteWatchlist(i.watchlistName)}
              className="font-light hover:underline"
            >
              Delete Watchlist
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WatchlistContainer;
