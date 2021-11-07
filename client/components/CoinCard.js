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
  coinPrice,
}) {
  return (
    <div className="flex flex-row h-14 w-full bg-white hover:bg-gradient-to-r from-red-50 to-purple-50 rounded hover:cursor-pointer">
      <div className="flex h-full items-center justify-center ml-3 px-3 ">
        <img
          className=" flex w-10 h-10 rounded-lg object-contain"
          src={coinImage}
        ></img>
      </div>
      <div className="flex w-full justify-between items-center mr-3">
        <div className="flex w-full flex-col h-full justify-center flex-start">
          <h1>{coinName}</h1>
          <p>({coinSymbol})</p>
        </div>
        <div className="flex w-full flex-col items-start justify-center h-full ">
          <div className="flex">
            <p>PPC(24h):</p>
            <p
              className={
                coinPriceChange24Hr > 0 ? "text-green-400" : "text-red-500"
              }
            >
              {coinPriceChange24Hr.toFixed(2)}%
            </p>
          </div>
          {/* <p>
            Market Cap:{" "}
            {Intl.NumberFormat("en-us", {
              style: "currency",
              currency: "USD",
            }).format(coinMarketCap)}
          </p> */}
          <p>
            Price:{" "}
            {Intl.NumberFormat("en-us", {
              style: "currency",
              currency: "USD",
            }).format(coinPrice)}
          </p>
        </div>
        <div className="flex w-full flex-col h-full items-start justify-center">
          <p>24H High: {coinHigh24hr}</p>
          <p>24H Low: {coinLow24Hr}</p>
        </div>
      </div>
    </div>
  );
}

export default CoinCard;
