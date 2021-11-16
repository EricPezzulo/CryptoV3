import axios from "axios";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import CoinCard from "../components/CoinCard";
import Link from "next/link";
import Header from "../components/Header";

export default function Home() {
  const [coinData, setCoinData] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [coinsPerPage, setCoinsPerPage] = useState(10);
  const pagesVisited = pageNumber * coinsPerPage;
  const apiEndpoint =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(apiEndpoint);
      const { data } = res;
      setCoinData(data);
    };
    getData();
  }, []);

  const pageCount = Math.ceil(coinData.length / coinsPerPage);

  const pageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  const displayCoins = coinData
    .slice(pagesVisited, pagesVisited + coinsPerPage)
    .map((coin) => {
      return (
        <div
          className={
            "flex w-full sm:p-1 sm:border-none border-t border-Davys-Gray"
          }
          key={coin.id}
        >
          <Link href={`/coins/${coin.id}`}>
            <div className="flex w-full">
              <CoinCard
                coinName={coin.name}
                coinSymbol={coin.symbol}
                coinID={coin.id}
                coinImage={coin.image}
                coinPriceChange24Hr={coin.price_change_percentage_24h}
                coinMarketCap={coin.market_cap}
                coinHigh24hr={coin.high_24h}
                coinLow24Hr={coin.low_24h}
                coinPrice={coin.current_price}
              />
            </div>
          </Link>
        </div>
      );
    });

  const loading = [];
  for (let i = 0; i < 12; i++) {
    loading.push(
      <div className="flex w-full items-center justify-center p-8 bg-gray-200 animate-pulse rounded my-1"></div>
    );
  }

  if (!coinData)
    return (
      <div className="flex flex-col w-full items-center justify-between min-h-screen">
        <Header />
        <div className="flex flex-col w-full h-full justify-center items-center">
          <div className="flex w-10/12 justify-center items-center rounded-md bg-gray-50">
            <div className="flex flex-col w-full items-center justify-center p-2">
              {loading}
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col w-full items-center justify-between min-h-screen bg-Eerie-Black">
      <Header />
      <div className="flex flex-col w-full h-full items-center">
        <div className="flex flex-col sm:w-10/12 justify-center items-center h-full rounded-md bg-Jet-Gray w-full bg-transparent">
          <div>
            <p className="text-white font-thin text-2xl py-2 ">Top 100 Coins</p>
          </div>
          <div className="flex flex-col w-full items-center justify-center">
            <div className="flex flex-col w-full items-center justify-center ">
              {displayCoins}
            </div>
          </div>
        </div>
      </div>
      <div className="relative bottom-0 mt-3 mb-3 flex w-full items-center justify-center">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={pageChange}
          pageRangeDisplayed={1}
          marginPagesDisplayed={1}
          // breakLabel={"..."}
          breakClassName={"hidden"}
          // breakLinkClassName={"flex"}
          containerClassName={
            "flex w-full mx-10 justify-evenly rounded-full bg-Eerie-Black-dark p-1 text-gray-100 items-center sm:w-96 sm:h-12"
          }
          previousLinkClassName={
            "flex items-center justify-center px-2 duration-200 hover:text-white"
          }
          nextLinkClassName={
            "flex items-center justify-center px-2 duration-200 hover:text-white "
          }
          disabledClassName={"flex"}
          activeLinkClassName={
            "flex w-8 h-8 rounded-full items-center justify-center border-gray-400 border text-white"
          }
        />
      </div>
    </div>
  );
}
