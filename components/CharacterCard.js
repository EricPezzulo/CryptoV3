import React from "react";

function CharacterCard({
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
    <div className="flex flex-col w-64 bg-gradient-to-tr from-gray-200 to-white h-96 rounded-lg">
      <div className="flex flex-col place-items-start pl-3 pt-2">
        <h1>Name: {coinName}</h1>
        <p>Symbol: {coinSymbol}</p>
        <p>ID: {coinID}</p>
        <p>Price Change %: {coinPriceChange24Hr}</p>
        <p>Market Cap: {coinMarketCap}</p>
        <p>24H High: {coinHigh24hr}</p>
        <p>24H Low: {coinLow24Hr}</p>
      </div>

      <div className="flex w-full justify-center mt-4">
        <img
          className=" flex w-44 h-44 rounded-b-lg object-contain"
          src={coinImage}
        ></img>
      </div>
    </div>
  );
}

export default CharacterCard;
