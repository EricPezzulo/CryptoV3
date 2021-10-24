import axios from "axios";
import { useEffect, useState } from "react";
import CharacterCard from "../components/CharacterCard";

export default function Home() {
  const [name, setName] = useState();
  const [gender, setGender] = useState();
  const [status, setStatus] = useState();
  const [image, setImage] = useState();
  const [characterData, setCharacterData] = useState([]);
  const APIendpoint = "https://rickandmortyapi.com/api/character";

  useEffect(async () => {
    const fetchData = async () => {
      try {
        const res = await axios.get(APIendpoint);
        setCharacterData(res.data.results);
        setStatus(res.data.results[0].status);
        setName(res.data.results[0].name);
        setGender(res.data.results[0].gender);
        setImage(res.data.results[0].image);
      } catch (error) {
        console.log("an error as occurred fetching the data");
      }
    };
    fetchData();
  }, []);

  // COINGECKO
  // useEffect(async () => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await axios.get(
  //         "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
  //       );
  //       console.log(res.data[4].id);
  //     } catch (error) {
  //       console.log("an error as occurred fetching the data");
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <div className="flex flex-col w-full items-center justify-center min-h-screen py-2">
      <h1 className="text-5xl">Rick and Morty API</h1>
      <h3 className="text-2xl">Character List</h3>
      <p className="text-base">more stuff</p>

      <div className="flex flex-wrap w-10/12 justify-center items-center h-full overflow-x-scroll rounded-xl bg-gradient-to-br from-purple-200  to-blue-200">
        {characterData.map((character) => (
          <div key={character.id} className="flex m-1">
            <CharacterCard
              name={character.name}
              gender={character.gender}
              status={character.status}
              image={character.image}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
