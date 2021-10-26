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
      <div className="flex h-full items-center justify-center pl-3">
        <img
          className=" flex w-10 h-10 rounded-lg object-contain"
          src={coinImage}
        ></img>
      </div>
      <div className="flex w-full justify-between items-center px-3">
        <div className="flex flex-col h-full justify-center flex-start">
          <h1>{coinName}</h1>
          <p>{coinSymbol}</p>
        </div>
        <div className="flex flex-col place-items-start  h-full items-center">
          <p>Price Change %: {coinPriceChange24Hr}</p>
          <p>Market Cap: {coinMarketCap}</p>
        </div>
        <div className="flex flex-col h-full items-center">
          <p>24H High: {coinHigh24hr}</p>
          <p>24H Low: {coinLow24Hr}</p>
        </div>
      </div>
    </div>
  );
}

export default CoinCard;
