import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import CoinInUserProfile from "../../../components/CoinInUserProfile";

const fetcher = (...args) => fetch(...args).then((res) => res.json());
function index() {
  const { data: session } = useSession();
  const router = useRouter();

  const { data: userData, userError } = useSWR(
    `http://localhost:5000/api/users/${session?.id}`,
    fetcher
  );

  if (userError) return <div>failed</div>;
  if (!userData) return <div>loading data...</div>;
  console.log(userData);

  const fullName = Object.values(userData.name[0]).slice(0, -1).join("");
  console.log(fullName);
  return (
    <div>
      <div>
        <h1>{fullName}'s Watchlists</h1>
        <button
          onClick={() => signOut({ callbackUrl: `${window.location.origin}` })}
        >
          Sign Out
        </button>
      </div>

      <h2 className="text-2xl"> Your Watchlists:</h2>
      {userData.watchlists.map((i) => (
        <div key={i._id}>
          <p className="text-2xl text-blue-600">{i.watchlistName}</p>
          {i.coins[0].coin.map((coin) => {
            return (
              <div>
                {/* <p key={coin.coinID}>{coin.coinID}</p> */}
                <CoinInUserProfile
                  coinID={coin.coinID}
                  name={coin.name}
                  symbol={coin.symbol}
                />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default index;
