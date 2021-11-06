import { getSession, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

function Header() {
  const { data: session } = useSession();

  return (
    <div className="flex w-full py-2 items-center bg-gray-500 h-full">
      <div className="flex w-full items-center justify-between mx-2">
        <h1 className="text-white text-3xl font-light">Title</h1>
        <div className="flex">
          {session && (
            <div className="flex h-14 w-14">
              <Link href={`/users/${session._id}`}>
                <img
                  className="flex rounded-full hover:cursor-pointer hover:scale-110 duration-300 transition ease-out"
                  src={session?.user?.image}
                />
              </Link>
            </div>
          )}
          {!session && (
            <div>
              <Link href="/auth/signin">
                <div className="bg-blue-500 py-1 px-2 rounded-md hover:cursor-pointer hover:bg-blue-600 duration-150">
                  <p className="text-white">Sign In</p>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
