import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useSWR from "swr";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import Header from "../../../components/Header";
import { AnimatePresence, motion } from "framer-motion";

export async function getServerSideProps({ query }) {
  const id = query;
  console.log(id);
  return {
    props: { props: id },
  };
}

const fetcher = (...args) => fetch(...args).then((res) => res.json());
function myprofile({ props }) {
  //   console.log(props.id);
  const userId = props.id;
  const [followingID, setFollowingID] = useState(userId);
  const { data: session } = useSession();
  const [listOfPosts, setListOfPosts] = useState([]);

  const { data: userData, userError } = useSWR(
    `http://localhost:5000/api/users/${userId}`,
    fetcher
  );
  const [following, setFollowing] = useState(null);

  //   const { data: coinData, coinError } = useSWR(
  //     `https://api.coingecko.com/api/v3/coins/${coinID}`,
  //     fetcher
  //   );

  useEffect(async () => {
    await axios
      .get(`http://localhost:5000/api/posts`)
      .then((res) => setListOfPosts(res.data));

    const checkFollow = async (userId) => {
      const res = await axios.get(
        `http://localhost:5000/api/users/${session?.id}/following`
      );
      if (res.data[0]?.following?.userID === userId) {
        setFollowing(true);
      } else {
        setFollowing(false);
      }
    };

    checkFollow();
  }, [following]);

  //   console.log(following);
  const unfollow = async () => {
    try {
      const res = await axios({
        url: `http://localhost:5000/api/users/${session?.id}/unfollow`,
        method: "PUT",
        data: {
          userID: followingID,
        },
      });
      setFollowing(false);
    } catch (error) {
      console.log(error);
    }
  };
  const follow = async () => {
    try {
      const res = await axios({
        url: `http://localhost:5000/api/users/${session?.id}/follow`,
        method: "PUT",
        data: {
          userID: followingID,
          image: userData.image,
        },
      });
      setFollowing(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (userError) return <div>failed</div>;
  if (!userData)
    return (
      <div className="flex flex-col min-h-screen w-full">
        <Header />
        <div className="flex w-full items-center justify-between">
          <h4 className="text-2xl font-light m-5">Loading Watchlists...</h4>
        </div>
      </div>
    );

  const fullName = Object.values(userData.name[0]).slice(0, -1).join("");

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />

      <div className="flex w-32 h-32 mt-5 ml-5">
        <img className="rounded-full" src={userData.image} />
      </div>
      <h2 className="text-2xl font-thin ml-10">{fullName}</h2>
      <div className="flex ml-5">
        {!following && (
          <div>
            <button
              onClick={follow}
              className="bg-blue-400 px-2 py-1 rounded-md text-white font-light"
            >
              Follow
            </button>
          </div>
        )}
        {following && (
          <div>
            <button
              onClick={unfollow}
              className="bg-blue-400 px-2 py-1 rounded-md text-white font-light"
            >
              Following
            </button>
          </div>
        )}
      </div>
      <div className="flex w-full justify-center ">
        {/* <WatchlistContainer username={fullName} /> */}
        <div className="flex-col p-5">
          <h3 className="text-xl font-thin">{fullName}'s watchlists:</h3>
          <div className="flex ">
            {userData.watchlists.map((watchlist) => {
              return (
                <div
                  className="flex flex-col w-44 bg-gray-100 rounded mx-2 p-2 shadow"
                  key={watchlist._id}
                >
                  <p className="text-2xl font-thin">
                    {watchlist.watchlistName}
                  </p>
                  {watchlist.coins[0].coin.map((i) => {
                    return (
                      <>
                        <p className="text-xl font-thin bg-white my-1 rounded p-1 text-green-400">
                          {i.coinID}
                        </p>
                      </>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full items-center">
        <h2 className="text-2xl font-thin">
          {fullName}'s Posts (
          {
            listOfPosts.filter((p) => {
              return p.postAuthor === userData?._id;
            }).length
          }
          )
        </h2>

        <div className="bg-gray-100 flex w-2/4 rounded">
          <div className="flex flex-col w-full items-center min-h-54 max-h-96 overflow-auto p-2">
            {listOfPosts
              .filter((p) => {
                return p.postAuthor === userData?._id;
              })
              .reverse()
              .map((i) => {
                return (
                  <AnimatePresence>
                    <motion.div
                      initial={{ x: 0, y: "-20vh", opacity: 0 }}
                      animate={{
                        x: 0,
                        y: 0,
                        opacity: 1,
                        transition: {
                          type: "spring",
                          damping: 10,
                          mass: 0.4,
                          stiffness: 100,
                        },
                      }}
                      exit={{
                        x: 0,
                        y: -100,
                        opacity: 0,
                        damping: 10,
                        mass: 0.4,
                        stiffness: 100,
                      }}
                      className="flex items-center bg-gray-200 w-full rounded my-1 p-2"
                    >
                      <img
                        src={userData?.image}
                        className="flex w-12 h-12 rounded-full"
                      />
                      <div className="w-full px-3">
                        <div className="flex w-full justify-between">
                          <p>{fullName}</p>
                          <p>
                            {new Date(i.createdAt)
                              .toISOString()
                              .substring(0, 10)}
                          </p>
                        </div>
                        <div className="flex w-full justify-between">
                          <p>{i.postBody}</p>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                );
              })}
          </div>
        </div>
        <div className="flex h-full w-full items-center justify-center">
          {/* <FriendsDock sessionID={session?.id} userdata={userData} /> */}
        </div>
      </div>
    </div>
  );
}

export default myprofile;
