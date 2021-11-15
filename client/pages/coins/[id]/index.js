import axios from "axios";
import { useState } from "react";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import Header from "../../../components/Header";
import EmojiFlagsIcon from "@mui/icons-material/EmojiFlags";
import { AnimatePresence, motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
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
  const [successMessage, setSuccessMessage] = useState(false);
  const [popUp, setPopUp] = useState(false);

  const { data: userData, userError } = useSWR(
    `http://localhost:5000/api/users/${session?.id}`,
    fetcher
  );

  const { data: coinData, coinError } = useSWR(apiEndpoint, fetcher);

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
      setPopUp(true);
      setTimeout(() => {
        setPopUp(false), setWatchlistName("");
      }, 2500);
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
      setSuccessMessage(true);
      setTimeout(() => setSuccessMessage(false), 2500);

      // console.log(successMessage);
    } catch (error) {
      console.log(error);
    }
  };

  const popUpVarient = {
    hidden: {
      opacity: 0,
      x: 0,
      y: 100,
    },
    visable: {
      opacity: 1,
      x: 0,
      y: 40,
      transition: {
        type: "spring",
        mass: 0.4,
        damping: 8,
      },
    },
    exit: {
      opacity: 0,
      x: 0,
      y: 100,
      transition: {
        type: "spring",
        mass: 0.4,
        damping: 8,
      },
    },
  };
  if (userError || coinError) {
    return (
      <div className="flex flex-col w-full min-h-screen">
        <Header />
        <div className="flex w-full items-center justify-center h-full">
          <p className="text-3xl font-light">failed to get coin data</p>
        </div>
      </div>
    );
  }
  if (!coinData) {
    return (
      <div className="flex flex-col w-full min-h-screen">
        <Header />
        <div className="flex w-full items-center justify-center h-full">
          <p className="text-3xl font-light">Loading Coin Data...</p>
        </div>
      </div>
    );
  }
  if (!userData) {
    return (
      <div className="flex flex-col w-full min-h-screen">
        <Header />
        <div className="flex flex-col w-full h-full  justify-center items-center">
          <div className="flex py-10">
            <img src={coinData.image?.large} alt="currency logo" />
          </div>
        </div>
        <div className="flex flex-col w-5/6 self-center bg-gray-100 rounded p-5">
          <p className="flex text-lg font-light">
            Name:&nbsp;{" "}
            <p className="text-green-400 text-lg font-normal">
              {coinData.name}
            </p>
          </p>
          <p className="flex text-lg font-light">
            Symbol:&nbsp; <p className="text-lg">({coinData.symbol})</p>
          </p>
          <p className="flex text-lg font-light">
            Community Score:&nbsp;{" "}
            <p className="text-lg">{coinData.community_score}</p>
          </p>
          <p className="flex text-lg font-light">
            Current Price: &nbsp;
            <p className="flex font-normal">
              {Intl.NumberFormat("en-us", {
                style: "currency",
                currency: "USD",
              }).format(coinData.market_data.current_price.usd)}
            </p>
          </p>
          <p
            dangerouslySetInnerHTML={{
              __html: coinData?.description?.en
                ? coinData?.description?.en
                : "no desc",
            }}
            className="flex text-lg font-light "
          >
            Description: &nbsp;
            {coinData?.description?.en
              ? coinData?.description?.en
              : "no description availible"}
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Header />
      <div className="flex flex-col w-full h-full  justify-center items-center">
        <div className="flex py-10">
          <img src={coinData.image?.large} alt="currency logo" />
        </div>
      </div>
      <div className="flex flex-col w-5/6 self-center bg-gray-100 rounded p-5">
        <p className="flex text-lg font-light">
          Name:&nbsp;{" "}
          <p className="text-green-400 text-lg font-normal">{coinData.name}</p>
        </p>
        <p className="flex text-lg font-light">
          Symbol:&nbsp; <p className="text-lg">({coinData.symbol})</p>
        </p>
        <p className="flex text-lg font-light">
          Community Score:&nbsp;{" "}
          <p className="text-lg">{coinData.community_score}</p>
        </p>
        <p className="flex text-lg font-light">
          Current Price: &nbsp;
          <p className="flex font-normal">
            {Intl.NumberFormat("en-us", {
              style: "currency",
              currency: "USD",
            }).format(coinData.market_data.current_price.usd)}
          </p>
        </p>
        <p
          className="flex flex-col text-lg font-light"
          dangerouslySetInnerHTML={{
            __html: coinData?.description?.en
              ? coinData?.description?.en
              : "no desc avalible",
          }}
        ></p>
        <div className="flex p-5 w-full items-center justify-between">
          <div className="flex items-center justify-between w-full">
            <input
              className="bg-gray-200 flex w-64 rounded px-1 font-light outline-none text-xl py-1"
              placeholder="watchlist name"
              type="text"
              value={watchlistName}
              onChange={(e) => setWatchlistName(e.target.value)}
            />
            <div className="flex">
              <button
                type="button"
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
              <option>--Choose Watchlist--</option>
              {userData?.watchlists.map((coin) => {
                return (
                  <>
                    <option key={coin._id} value={coin.watchlistName}>
                      {coin.watchlistName}
                    </option>
                    );
                  </>
                );
              })}
            </select>
            <button
              type="button"
              onClick={addCoinToWatchlist}
              className="text-xl font-light bg-blue-400 text-white px-2 py-1 rounded"
            >
              Add to Watchlist
            </button>

            <AnimatePresence>
              {popUp && (
                <motion.div
                  variants={popUpVarient}
                  initial="hidden"
                  animate="visable"
                  exit="exit"
                  className={`flex absolute top-5 right-5 bg-gray-100 items-center h-10 justify-between rounded`}
                >
                  <div className="flex bg-yellow-300 items-center justify-center h-full w-10  rounded-l">
                    <EmojiFlagsIcon className="text-white" />
                  </div>
                  <p className="flex text-xl font-light px-2">
                    Created new watchlist:
                    <p className="text-green-400">&nbsp;{watchlistName}</p>!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div>
            <AnimatePresence>
              {successMessage && (
                <motion.div
                  variants={popUpVarient}
                  initial="hidden"
                  animate="visable"
                  exit="exit"
                  className={`flex absolute top-5 right-5 bg-gray-100 items-center h-10 justify-between rounded`}
                >
                  <div className="flex bg-yellow-300 items-center justify-center h-full w-10  rounded-l">
                    <EmojiFlagsIcon className="text-white" />
                  </div>
                  <p className="flex text-lg font-light px-2">
                    Added&nbsp;
                    <p className="text-blue-400"> {coinData.name} </p>
                    &nbsp;to&nbsp;
                    <p className="text-green-400"> {selectWatchlist} </p>!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
