import React from "react";

function CoinCard({
  coinName,
  coinSymbol,
  coinID,
  coinImage,
  coinPriceChange24Hr,
  coinMarketCap,
  coinHigh24hr,
  coinLow24Hr,
}) {
  return (
    <div className="flex flex-row h-14 w-full bg-gradient-to-tr from-gray-200 to-white  rounded-lg">
      <div className="flex h-full items-center justify-center ml-3 px-3 bg-purple-400">
        <img
          className=" flex w-10 h-10 rounded-lg object-contain"
          src={coinImage}
        ></img>
      </div>
      <div className="flex w-full justify-between items-center mr-3">
        <div className="flex w-full flex-col h-full justify-center flex-start bg-green-300">
          <h1>{coinName}</h1>
          <p>{coinSymbol}</p>
        </div>
        <div className="flex w-full flex-col items-start justify-center h-full bg-blue-500">
          <p
            className={
              coinPriceChange24Hr > 0 ? "text-green-400" : "text-red-500"
            }
          >
            {coinPriceChange24Hr}%
          </p>
          <p>Market Cap: {coinMarketCap}</p>
        </div>
        <div className="flex w-full flex-col h-full items-start justify-center bg-red-300">
          <p>24H High: {coinHigh24hr}</p>
          <p>24H Low: {coinLow24Hr}</p>
        </div>
      </div>
    </div>
  );
}

export default CoinCard;
