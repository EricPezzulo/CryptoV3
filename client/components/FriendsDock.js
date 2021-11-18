import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import { fetcher } from "../utils/helpers";

function FriendsDock({ sessionID }) {
  const [following, setFollowing] = useState([]);
  const { data: userData, userError } = useSWR(
    `http://localhost:5000/api/users/${sessionID}`,
    fetcher
  );
  useEffect(async () => {
    const getUserData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/users/${sessionID}/following`
        );
        setFollowing(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, []);
  return (
    <div className="flex flex-col w-full h-full items-start sm:my-2 sm:flex-row rounded sm:items-center justify-center ">
      <div className="flex min-w-min pr-2">
        <p className="flex font-light text-xl text-white">
          Following ({following.length}):{" "}
        </p>
      </div>
      <div className="flex h-16 items-center justify-center bg-Jet-Gray px-2 rounded-md shadow">
        {following.slice(0, 2).map((i) => {
          return (
            <div className="flex px-1 items-center justify-center">
              <Link href={`/users/${i.userID}`}>
                <img
                  className="w-10 h-10 hover:cursor-pointer rounded-full object-cover"
                  src={i?.image}
                  alt="pic"
                />
              </Link>
            </div>
          );
        })}
      </div>
      <div className="flex min-w-min sm:px-2">
        <p className="text-xl font-light text-white">
          Followers ({userData.followers.length}):{" "}
        </p>
      </div>
      <div className="flex h-16 items-center justify-center bg-Jet-Gray px-2 rounded-md shadow">
        {userData.followers.slice(0, 2).map((i) => {
          return (
            <div className="flex px-1 items-center justify-center">
              <Link href={`/users/${i.userID}`}>
                <img
                  className="flex object-contain w-10 h-10 rounded-full hover:cursor-pointer"
                  src={i.image}
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FriendsDock;
