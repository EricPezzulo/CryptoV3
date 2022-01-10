import React, { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import axios from "axios";
import { useSession } from "next-auth/react";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import { fetcher } from "../utils/helpers";

function CoinInUserProfile({ coinID, watchlistName, dontShow }) {
  const { data: session } = useSession();
  const { data, error } = useSWR(
    `https://api.coingecko.com/api/v3/coins/${coinID}`,
    fetcher
  );
  const removeFromWatchlist = async (coinID) => {
    try {
      const res = await axios({
        url: `http://localhost:5000/api/users/${session?.id}/deletecoin`,
        method: "PUT",
        data: {
          watchlistName,
          coinID,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (error)
    return (
      <div className="flex flex-col bg-white items-center justify-center m-2 p-2 rounded hover:cursor-pointer">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <p className="font-light">Failed to get coin data</p>{" "}
          </div>
        </div>
      </div>
    );
  if (!data || data === "undefined")
    return (
      <div className="flex flex-col bg-Davys-Gray items-center justify-center m-2 p-2 rounded hover:cursor-pointer">
        <div className="flex items-center justify-between w-full">
          <div className="flex  items-center">
            <p className="font-light text-white">Loading data...</p>{" "}
          </div>
        </div>
      </div>
    );

  return (
    <div className="group flex flex-col bg-Davys-Gray items-center justify-center m-2 p-2 rounded hover:bg-Davys-Gray-light hover:cursor-pointer">
      <div className="flex items-center justify-between w-full">
        {" "}
        <Link href={`/coins/${coinID}`}>
          <div className="flex items-baseline">
            <p className="text-xl text-green-400 pr-1 font-light">{coinID}</p>
            <p className="font-light text-white">({data.symbol})</p>{" "}
          </div>
        </Link>
        {!dontShow && (
          <button onClick={() => removeFromWatchlist(coinID)}>
            <DeleteIcon className="invisible group-hover:visible text-Ghost-White transition duration-200 hover:text-gray-400 hover:cursor-pointer" />
          </button>
        )}
      </div>
    </div>
  );
}

export default CoinInUserProfile;
