import axios from "axios";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import CoinCard from "../components/CoinCard";
import Link from "next/link";
import Header from "../components/Header";
import { getSession } from "next-auth/react";

export const getServerSideProps = async (context) => {
  return {
    props: {
      session: await getSession(context),
    },
  };
};

export default function Home({ session }) {
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
  console.log(session);
  const displayCoins = coinData
    .slice(pagesVisited, pagesVisited + coinsPerPage)
    .map((coin) => {
      return (
        <div className={"flex w-full p-2"} key={coin.id}>
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

  const pageCount = Math.ceil(coinData.length / coinsPerPage);

  const pageChange = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <div className="flex flex-col w-full items-center justify-between min-h-screen">
      <Header />
      <div className="flex flex-col w-full h-full items-center">
        <div className="flex  mt-5 w-10/12 justify-center items-center h-full rounded-md bg-gray-50 border-2 border-red-200">
          <div className="flex flex-col w-full items-center justify-center">
            <div className="flex flex-col w-full items-center justify-center p-4">
              {displayCoins}
            </div>
          </div>
        </div>
      </div>
      <div className="relative bottom-0 mt-5 mb-5">
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
            "flex w-96 justify-evenly bg-gradient-to-r from-red-300 to-purple-300 h-12 rounded-full text-gray-100 items-center"
          }
          previousLinkClassName={
            "flex items-center justify-center px-2 duration-200 hover:text-white "
          }
          nextLinkClassName={
            "flex items-center justify-center px-2 duration-200 hover:text-white "
          }
          disabledClassName={"flex"}
          activeLinkClassName={
            "flex w-8 h-8 rounded-full items-center justify-center border-blue-400 border-2 text-white"
          }
        />
      </div>
    </div>
  );
}
