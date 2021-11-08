import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import CoinInUserProfile from "../../../components/CoinInUserProfile";
import axios from "axios";
import WatchlistContainer from "../../../components/WatchlistContainer";
import Header from "../../../components/Header";
const fetcher = (...args) => fetch(...args).then((res) => res.json());
function index() {
  const { data: session } = useSession();
  const router = useRouter();

  const { data: userData, userError } = useSWR(
    `http://localhost:5000/api/users/${session?.id}`,
    fetcher
  );
  if (userError) return <div>failed</div>;
  if (!userData)
    return (
      <div className="flex flex-col min-h-screen w-full">
        <Header />
        <div className="flex w-full items-center justify-between">
          <h4 className="text-2xl font-light m-5">Loading Watchlists...</h4>
          <div className="mr-3">
            <button
              className="flex bg-blue-600 px-2 py-1 rounded-md text-white"
              onClick={() =>
                signOut({ callbackUrl: `${window.location.origin}` })
              }
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    );

  const fullName = Object.values(userData.name[0]).slice(0, -1).join("");
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <div className="flex w-full items-center justify-between">
        <h4 className="text-2xl font-light m-5">{fullName}'s Watchlists:</h4>
        <div className="mr-3">
          <button
            className="flex bg-blue-600 px-2 py-1 rounded-md text-white"
            onClick={() =>
              signOut({ callbackUrl: `${window.location.origin}` })
            }
          >
            Sign Out
          </button>
        </div>
      </div>

      <div className="flex w-full justify-center">
        <WatchlistContainer />
      </div>
    </div>
  );
}

export default index;
