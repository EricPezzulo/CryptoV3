import axios from "axios";
import { useEffect, useState } from "react";
import CoinCard from "../../../components/CoinCard";

export async function getServerSideProps({ query }) {
  const id = query;
  return {
    props: { data: id },
  };
}

function index({ data }) {
  const coinURL = data.id; // bitcoin
  const [coinData, setCoinData] = useState([]);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const apiEndpoint = `https://api.coingecko.com/api/v3/coins/${coinURL}`;

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(apiEndpoint);
      const { data } = res;
      setCoinData(data);
      setImage(data.image.large);
      setDescription(data.description.en);
    };
    getData();
  }, []);
  console.log(coinData);
  //   console.log(description);
  //   console.log(image);
  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-900">
      <div className="flex flex-col w-full h-full items-center">
        <div className="flex mt-10">
          <img src={image} alt="currency logo" />
        </div>
      </div>
      <div className="flex flex-col w-5/6 self-center">
        <p className="flex text-white">Name: {coinData.name}</p>
        <p className="flex text-white">Symbol: {coinData.symbol}</p>
        <p className="flex text-white">
          Comunity score: {coinData.community_score}
        </p>
        <p className="flex text-white">
          {description ? description : "no description availible"}
        </p>
      </div>
    </div>
  );
}

export default index;
