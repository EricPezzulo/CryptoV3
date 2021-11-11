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
  }, [following]);
  // console.log(following[0].userID);
  return (
    <div className="flex flex-col max-w-md h-full my-2 rounded">
      <h3 className="font-light text-lg">Following ({following.length})</h3>
      <div className="flex w-full h-full bg-gray-100 overflow-x-auto justify-center items-center rounded-md p-3 ">
        {following.map((i) => {
          return (
            <div className="flex items-center justify-center w-full h-full">
              <div className="flex item-center justify-center w-full h-full mx-1">
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
