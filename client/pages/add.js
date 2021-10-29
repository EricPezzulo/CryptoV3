import React, { useState } from "react";
import axios from "axios";

function add() {
  const [watchlistName, setWatchlistName] = useState("");
  const [coinName, setCoinName] = useState("");
  const [coinSymbol, setCoinSymbol] = useState("");
  const [coinID, setCoinID] = useState("");
  const [coinImage, setCoinImage] = useState("");
  const [coin24H_high, setCoin24H_high] = useState("");
  const [coin24H_low, setCoin24H_low] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");

  const addCoin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/watchlists/add", {
        coinName,
        coinSymbol,
        coinID,
        coinImage,
        coin24H_high,
        coin24H_low,
      });
      console.log(`${coinName} has been added to the database`);
    } catch (error) {
      console.log(error);
    }
  };

  const addUser = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/users/add", {
        watchlistName,
        firstName,
        lastName,
        userName,
      });
      console.log(`${firstName} has been added to the database`);
    } catch (error) {
      console.log(error);
    }
  };

  const editWatchlist = async () => {
    try {
      const res = await axios({
        url: "http://localhost:5000/api/users/6179e3905dbf48bba874e8a5/edit",
        method: "PUT",
        data: {
          name: {
            firstName: firstName,
            lastName: lastName,
            userName: userName,
          },
          watchlists: {
            watchlistName: watchlistName,

            coins: {
              coinName: coinName,
              coinSymbol: coinSymbol,
              coinID: coinID,
              coinImage: coinImage,
              coin24H_high: coin24H_high,
              coin24H_low: coin24H_low,
            },
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const newWatchlist = async () => {
    try {
      const res = await axios({
        url: "http://localhost:5000/api/users/617a1c007a264e3a6aaa5f5c/addwatchlist",
        method: "PUT",
        data: {
          watchlistName: watchlistName,
          coins: {
            coinName: coinName,
            coinSymbol: coinSymbol,
            coinID: coinID,
            coinImage: coinImage,
            coin24H_high: coin24H_high,
            coin24H_low: coin24H_low,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col h-full w-full">
      <h1>Add Coin to watchlist</h1>
      <div className="p-5 bg-blue-400">
        {/* <div className="flex flex-col">
          <input
            className="flex my-1 rounded w-3/4"
            type="text"
            placeholder="NAME"
            onChange={(e) => setCoinName(e.target.value)}
          />
          <input
            className="flex my-1 rounded w-3/4"
            type="text"
            placeholder="SYMBOL"
            onChange={(e) => setCoinSymbol(e.target.value)}
          />
          <input
            className="flex my-1 rounded w-3/4"
            type="text"
            placeholder="COINID"
            onChange={(e) => setCoinID(e.target.value)}
          />
          <input
            className="flex my-1 rounded w-3/4"
            type="text"
            placeholder="COINIMAGE"
            onChange={(e) => setCoinImage(e.target.value)}
          />
          <input
            className="flex my-1 rounded w-3/4"
            type="text"
            placeholder="COIN24HHIGH"
            onChange={(e) => setCoin24H_high(e.target.value)}
          />
          <input
            className="flex my-1 rounded w-3/4"
            type="text"
            placeholder="COIN24HLOW"
            onChange={(e) => setCoin24H_low(e.target.value)}
          />
        </div>
        <div>
          <button type="button" onClick={addCoin}>
            ADD
          </button>
        </div> */}

        <div className="flex flex-col bg-blue-400 p-10">
          <input
            className="flex my-1 rounded w-3/4"
            type="text"
            placeholder="FIRST NAME"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            className="flex my-1 rounded w-3/4"
            type="text"
            placeholder="LAST NAME"
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            className="flex my-1 rounded w-3/4"
            type="text"
            placeholder="USERNAME"
            onChange={(e) => setUserName(e.target.value)}
          />

          <input
            className="flex my-1 rounded w-3/4"
            type="text"
            placeholder="watchlist name"
            // onChange={(e) => setWatchlistName(e.target.value)}
          />
          <div>
            <button type="button" onClick={addUser}>
              add user
            </button>
          </div>
          <div>
            <button type="button" onClick={editWatchlist}>
              edit
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col p-10 bg-red-400">
        <h1>Make new Watchlist</h1>
        <div>
          <p>watchlist name:</p>
          <input
            type="text"
            onChange={(e) => setWatchlistName(e.target.value)}
          />
        </div>
        <div>
          <p>coin name:</p>
          <input type="text" onChange={(e) => setCoinName(e.target.value)} />
        </div>
        <div>
          <button type="button" onClick={newWatchlist}>
            add watchlist
          </button>
        </div>
      </div>
    </div>
  );
}

export default add;
