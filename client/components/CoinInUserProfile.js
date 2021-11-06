import React from "react";
import useSWR from "swr";
import axios from "axios";
import { useSession } from "next-auth/react";

const fetcher = (...args) => fetch(...args).then((res) => res.json());
function CoinInUserProfile({ coinID }) {
  const { data: session } = useSession();
  const { data, error } = useSWR(
    `https://api.coingecko.com/api/v3/coins/${coinID}`,
    fetcher
  );
  const removeFromWatchlist = async () => {
    try {
      const res = await axios({
        url: `http://localhost:5000/api/users/${session?.id}/deletecoin`,
        method: "PUT",
        data: {
          watchlistName: "five",
          coins: {
            coin: {
              coinID: coinID,
            },
          },
        },
      });
      console.log("removed");
    } catch (error) {
      console.log(error);
    }
  };
  if (error) return <div>failed to load coin data</div>;
  if (!data || data === "undefined") return <div>loading coin data...</div>;
  return (
    <div className="flex">
      <p className="text-xl text-green-400">{coinID}</p>
      <p>{data.symbol}</p>
      <button type="button" onClick={removeFromWatchlist}>
        remove
      </button>
    </div>
  );
}

export default CoinInUserProfile;
