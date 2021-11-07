import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import useSWR from "swr";
import CoinInUserProfile from "./CoinInUserProfile";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

function WatchlistContainer() {
  const { data: session } = useSession();

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
      console.log(userData.watchlists[1].watchlistName);
    } catch (error) {
      console.log(error);
    }
  };
  if (userError) return <div>failed</div>;
  if (!userData) return <div>loading data...</div>;
  // console.log(userData);

  return (
    <div className="flex flex-wrap justify-center h-full p-3 rounded-md">
      {userData.watchlists.map((i) => (
        <div
          key={i._id}
          className="flex flex-col bg-gray-100 p-1 rounded m-2 w-64"
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
            className="font-light"
          >
            Delete Watchlist
          </button>
        </div>
      ))}
    </div>
  );
}

export default WatchlistContainer;
