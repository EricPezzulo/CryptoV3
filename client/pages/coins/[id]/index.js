import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { useRouter } from "next/router";
import Header from "../../../components/Header";

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
  // console.log(userData);

  const { data: coinData, coinError } = useSWR(apiEndpoint, fetcher);
  // console.log(coinData);
  if (userError || coinError) {
    return <div>failed</div>;
  }
  if (!userData || !coinData) {
    return <div>Loading</div>;
  }

  // userData.watchlists.map((i) => console.log(i));

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
      // useRouter().push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen">
      <Header />
      <div className="flex flex-col w-full h-full items-center">
        <div className="flex mt-10">
          <img src={coinData.image?.large} alt="currency logo" />
        </div>
      </div>
      <div className="flex flex-col w-5/6 self-center">
        <p className="flex">Name: {coinData.name}</p>
        <p className="flex">Symbol: {coinData.symbol}</p>
        <p className="flex">Comunity score: {coinData.community_score}</p>
        <p className="flex ">
          {coinData?.description?.en
            ? coinData?.description?.en
            : "no description availible"}
        </p>
        <div className="flex p-5 w-full items-center justify-between">
          <div className="flex items-center justify-between w-full">
            <input
              className="bg-gray-200 flex w-64 rounded px-1 font-light outline-none text-xl py-1"
              placeholder="watchlist name"
              type="text"
              onChange={(e) => setWatchlistName(e.target.value)}
            />
            <div className="flex">
              <button
                onClick={createNewWatchlist}
                className="text-xl bg-blue-400 flex rounded px-2 py-1 text-white font-light"
              >
                Create New Watchlist
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col p-5">
          <div className="flex w-full justify-between">
            <select
              className="flex rounded"
              onChange={(e) => setSelectWatchlist(e.target.value)}
            >
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
            <button
              onClick={addCoinToWatchlist}
              className="text-xl font-light bg-blue-400 text-white px-2 py-1 rounded"
            >
              add too watchlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
