import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";
function FriendsDock({ sessionID }) {
  const [following, setFollowing] = useState([]);
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
    <div className="flex w-full h-full my-2 rounded items-center justify-center">
      <div className="flex min-w-min pr-2">
        <h3 className="flex font-light text-xl">
          Following ({following.length}):{" "}
        </h3>
      </div>
      <div className="flex min-w-min max-w-md h-16 bg-gray-100 overflow-x-auto justify-center items-center rounded-md p-3 shadow ml-1">
        {following.map((i) => {
          return (
            <div className="flex items-center justify-center w-full h-full">
              <div className="flex item-center justify-center h-full">
                <Link href={`/users/${i.userID}`}>
                  <img
                    className="w-10 h-10 hover:cursor-pointer rounded-full object-cover"
                    src={i?.image}
                    alt="pic"
                  />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FriendsDock;
