import axios from "axios";
import { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";

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

  const { data: session } = useSession();
  const [sessionData, setSessionData] = useState();
  const [userID, setUserID] = useState();
  const [userEmial, setUserEmail] = useState();
  const [userData, setUserData] = useState();

  const apiEndpoint = `https://api.coingecko.com/api/v3/coins/${coinURL}`;

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(apiEndpoint);
      const { data } = res;
      setCoinData(data);
      setImage(data.image.large);
      setDescription(data.description.en);
    };

    const getUserData = async () => {
      const res = await axios.get("http://localhost:5000/api/users");
      const { data } = res;
      setUserData(data.data);
      setUserID(data.data[0]._id);
      setUserEmail(data.data[1].email);

      // console.log(data.data[0]._id);
      // console.log(data.data[0]._id);
      // console.log(userData);
      // console.log(session);
    };
    getData();
    getUserData();
  }, []);
  // console.log(session);

  // console.log(userID);

  // console.log(session?.user?.email);

  // async function myFunction(req, res) {
  //   const session = await getSession({ req });

  //   console.log(session);
  // }
  // myFunction();
  // const addToWatchlist = async() => {
  //   try {
  //     const res = await axios({
  //       url: `http://localhost:5000/api/users/${}/edit`,
  //       method: "PUT",
  //       data: {
  //         watchlistName: watchlistName,
  //         coins: {
  //           coinName: coinName,
  //           coinSymbol: coinSymbol,
  //           coinID: coinID,
  //           coinImage: coinImage,
  //           coin24H_high: coin24H_high,
  //           coin24H_low: coin24H_low,
  //         },
  //       },
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
        <div className="flex flex-col p-5">
          <button className="text-white text-xl">ADD TO WATCHLIST</button>
        </div>
      </div>
    </div>
  );
}

export default index;
