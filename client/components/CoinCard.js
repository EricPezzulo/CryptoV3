import React from "react";
import { currencyConverter } from "../utils/helpers";
function CoinCard({
  coinName,
  coinSymbol,
  coinID,
  coinImage,
  coinPriceChange24Hr,
  coinHigh24hr,
  coinLow24Hr,
  coinPrice,
}) {
  return (
    <div className="flex min-h-min-16 sm:14 w-full bg-Eerie-Black-dark sm:rounded hover:cursor-pointer hover:bg-Davys-Gray duration-100">
      <div className="flex h-full items-center justify-center sm:ml-3 px-3">
        <img
          className=" flex w-10 h-10 rounded-lg object-contain"
          src={coinImage}
        ></img>
      </div>
      <div className="flex w-full justify-between items-center mr-3">
        <div className="flex w-full flex-col h-full justify-center flex-start">
          <p className="text-white font-light">{coinName}</p>
          <p className="text-white font-light">({coinSymbol})</p>
        </div>
        <div className="flex w-full flex-col items-start justify-center h-full ">
          <div className="flex">
            <p className="text-white font-light">PPC(24h):&nbsp;</p>
            <p
              className={
                coinPriceChange24Hr > 0
                  ? "text-green-400 font-light"
                  : "text-red-500 font-light"
              }
            >
              {coinPriceChange24Hr.toFixed(2)}%
            </p>
          </div>

          <p className="text-white font-light">
            Price: {currencyConverter(coinPrice)}
          </p>
        </div>
        <div className="sm:flex w-full flex-col h-full items-start justify-center hidden">
          <p className="text-white font-light">
            24H High: {currencyConverter(coinHigh24hr)}
          </p>
          <p className="text-white font-light">
            24H Low: {currencyConverter(coinLow24Hr)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CoinCard;
