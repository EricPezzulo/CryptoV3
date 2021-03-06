import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import CoinInUserProfile from "./CoinInUserProfile";

function WatchlistContainer() {
  const { data: session } = useSession();
  const [listOfCoins, setListOfCoins] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await axios
        .get(`http://localhost:5000/api/users/${session?.id}`)
        .then((res) => setListOfCoins(res.data.watchlists));
    };
    getData();
  }, [listOfCoins]);

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

  if (!listOfCoins) return <div className="bg-Davys-Gray"> loading </div>;
  return (
    <div className="flex flex-wrap justify-center h-full p-3 rounded-md">
      <div className="flex flex-col w-full">
        <p className="text-2xl font-thin flex absolute left-4 text-white">
          My Watchlist's ({listOfCoins.length}):
        </p>
      </div>
      <div className="flex flex-wrap h-full justify-center p-3 mt-5 sm:mt-10 rounded-md">
        {listOfCoins.map((i, key) => (
          <div
            key={key}
            className="flex flex-col bg-Jet-Gray drop-shadow-lg p-2 rounded m-2 h-full w-64"
          >
            <p className="text-2xl font-light text-white">{i.watchlistName}</p>
            {i.coins[0].coin.map((coin, key) => {
              return (
                <div key={key}>
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
              className="font-light hover:underline text-white"
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
