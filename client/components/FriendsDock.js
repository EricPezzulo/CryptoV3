import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function FriendsDock({ sessionID, followings, followers }) {
  return (
    <div className="flex flex-col w-full h-full items-start sm:my-2 sm:flex-row rounded sm:items-center justify-center ">
      <div className="flex min-w-min pr-2">
        <p className="flex font-light text-xl text-white">
          Following ({followings.length}):
        </p>
      </div>
      <div className="flex h-16 items-center justify-center bg-Jet-Gray px-2 rounded-md shadow">
        {followings.slice(0, 2).map((i, key) => {
          return (
            <div key={key} className="flex px-1 items-center justify-center">
              <Link href={`/users/${i.userID}`}>
                <div className="flex border-2 rounded-full border-gray-600">
                  <Image
                    className="hover:cursor-pointer rounded-full object-cover"
                    src={i?.image}
                    width={45}
                    height={45}
                    alt="avatar"
                  />
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      <div className="flex min-w-min sm:px-2">
        <p className="text-xl font-light text-white">
          Followers ({followers.length}):{" "}
        </p>
      </div>
      <div className="flex h-16 items-center justify-center bg-Jet-Gray px-2 rounded-md shadow">
        {followers.slice(0, 2).map((i, key) => {
          return (
            <div key={key} className="flex px-1 items-center justify-center">
              <Link href={`/users/${i.userID}`}>
                <div className="flex border-2 rounded-full border-gray-600">
                  <Image
                    className="flex object-contain w-10 h-10 rounded-full hover:cursor-pointer"
                    src={i.image}
                    width={45}
                    height={45}
                    alt="avatar"
                  />
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FriendsDock;
