import axios from "axios";
import { useState } from "react";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import Header from "../../../components/Header";
import EmojiFlagsIcon from "@mui/icons-material/EmojiFlags";
import { AnimatePresence, motion } from "framer-motion";
import { fetcher } from "../../../utils/helpers";
export async function getServerSideProps({ query }) {
  const id = query;
  return {
    props: { props: id },
  };
}
function index({ props }) {
  const { data: session } = useSession();
  const coinURL = props.id;
  const [coinID, setCoinID] = useState(coinURL);
  const [watchlistName, setWatchlistName] = useState("");
  const [selectWatchlist, setSelectWatchlist] = useState("");
  const apiEndpoint = `https://api.coingecko.com/api/v3/coins/${coinURL}`;
  const [successMessage, setSuccessMessage] = useState(false);
  const [popUp, setPopUp] = useState(false);

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
  if (coinError) {
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
      <div className="flex flex-col w-full h-screen bg-Eerie-Black items-center">
        <Header />
        <div className="flex bg-Jet-Gray animate-pulse h-44 w-44 rounded-full my-10"></div>
        <div className="flex flex-row  bg-Jet-Gray animate-pulse w-3/4 h-64 rounded">
          <div className="flex justify-center">
            <div className="flex">
              <p className="text-white text-xl p-5 font-light">
                Loading coin data...
              </p>
            </div>{" "}
            <div className="flex justify-center mt-5">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-Eerie-Black">
      <Header />
      <div className="flex flex-col w-full h-full justify-center items-center">
        <div className="flex py-10">
          <img src={coinData.image?.large} alt="currency logo" />
        </div>
      </div>
      <div className="flex flex-col w-full sm:w-5/6 self-center sm:bg-Jet-Gray sm:mb-4 rounded p-5">
        <p className="flex text-lg font-light text-white">
          Name:&nbsp;{" "}
          <p className="text-green-400 text-lg font-normal">{coinData.name}</p>
        </p>
        <p className="flex text-lg font-light text-white">
          Symbol:&nbsp;{" "}
          <p className="text-lg text-white">({coinData.symbol})</p>
        </p>
        <p className="flex text-lg font-light text-white">
          Community Score:&nbsp;{" "}
          <p className="text-lg text-white">{coinData.community_score}</p>
        </p>
        <p className="flex text-lg font-light text-white">
          Current Price: &nbsp;
          <p className="flex font-normal text-white">
            {Intl.NumberFormat("en-us", {
              style: "currency",
              currency: "USD",
            }).format(coinData.market_data.current_price.usd)}
          </p>
        </p>
        <p
          className="text-white text-lg font-thin"
          dangerouslySetInnerHTML={{
            __html: coinData?.description?.en
              ? coinData?.description?.en
              : "no description avalible",
          }}
        ></p>
        <div className="flex p-5 w-full items-center justify-between">
          <div className="flex flex-col sm:flex-row items-center justify-between w-full">
            <input
              className="bg-gray-200 flex rounded px-1 font-light outline-none text-xl py-1 w-full sm:max-w-max "
              placeholder="Watchlist Name"
              type="text"
              value={watchlistName}
              onChange={(e) => setWatchlistName(e.target.value)}
            />

            <button
              type="button"
              onClick={createNewWatchlist}
              className="flex text-xl w-full sm:max-w-max my-2 sm:my-0 bg-blue-400 justify-center rounded px-2 py-1 text-white font-light"
            >
              Create New Watchlist
            </button>
          </div>
        </div>
        <div className="flex flex-col p-5 items-center justify-between">
          <div className="flex flex-col sm:flex-row items-center w-full justify-between">
            <select
              className="flex rounded text-xl py-1 w-full sm:max-w-max "
              onChange={(e) => setSelectWatchlist(e.target.value)}
            >
              <option>--Choose Watchlist--</option>
              {session?.watchlists.map((coin) => {
                return (
                  <>
                    <option key={coin._id} value={coin.watchlistName}>
                      {coin.watchlistName}
                    </option>
                  </>
                );
              })}
            </select>
            <button
              type="button"
              onClick={addCoinToWatchlist}
              className="text-xl font-light bg-blue-400 text-white px-2 py-1 rounded w-full sm:max-w-max  my-2 sm:my-0"
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
                  className={`flex absolute top-5 sm:right-5 bg-Davys-Gray items-center min-h-max justify-between rounded`}
                >
                  <div className="flex bg-yellow-300 items-center justify-center h-full w-10  rounded-l">
                    <EmojiFlagsIcon className="text-white" />
                  </div>
                  <span className="flex text-xl font-light px-2 h-full text-white">
                    Created new watchlist:
                    <span className="text-green-400">
                      &nbsp;{watchlistName}
                    </span>
                    !
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex justify-center items-center w-full">
            <AnimatePresence>
              {successMessage && (
                <motion.div
                  variants={popUpVarient}
                  initial="hidden"
                  animate="visable"
                  exit="exit"
                  className={`flex absolute top-5 sm:right-5 bg-Davys-Gray items-center h-10 justify-between rounded`}
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
