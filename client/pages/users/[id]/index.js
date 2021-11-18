import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../../components/Header";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import Link from "next/link";
import { nameConverter } from "../../../utils/helpers";
export async function getServerSideProps(context) {
  const res = await fetch(
    `http://localhost:5000/api/users/${context.query.id}`
  );
  const userData = await res.json();
  const posts = await fetch(`http://localhost:5000/api/posts`);
  const userPosts = await posts.json();
  const { id } = context.query;
  return {
    props: { id, userData, userPosts },
  };
}

function index({ id, userData, userPosts }) {
  const { data: session } = useSession();
  const [following, setFollowing] = useState();
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };
  const [isMe, setIsMe] = useState();
  const isFollowing = () => {
    const user = userData?.followers.find((i) => i.userID === session?.id);
    if (user) {
      setFollowing(true);
    } else {
      setFollowing(false);
    }
  };
  const findIsMe = async () => {
    if (id === session?.id) {
      setIsMe(true);
    } else {
      setIsMe(false);
    }
  };

  useEffect(() => {
    isFollowing();
    findIsMe();
  });

  const unfollow = async () => {
    try {
      const res = await axios({
        url: `http://localhost:5000/api/users/${session?.id}/unfollow`,
        method: "PUT",
        data: {
          followingUser: {
            userID: id,
          },
          currentUser: {
            userID: session?.id,
          },
        },
      });
      refreshData();
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
          followingUser: {
            userID: id,
            image: userData.image,
          },
          currentUser: {
            userID: session?.id,
            image: session?.user?.image,
          },
        },
      });
      refreshData();
    } catch (error) {
      console.log(error);
    }
  };

  if (!userData)
    return (
      <div className="flex flex-col min-h-screen w-full">
        <Header />
        <div className="flex w-full items-center justify-between">
          <h4 className="text-2xl font-light m-5">Loading Watchlists...</h4>
        </div>
      </div>
    );

  // const fullName = Object.values(userData.name[0]).slice(0, -1).join("");
  const fullName = nameConverter(userData);

  return (
    <div className="min-h-screen bg-Eerie-Black">
      <Header />
      <div className="flex items-center h-full w-full">
        <img
          src={userData.image}
          className="flex rounded-full object-contain w-32 h-32 m-5 p-1 drop-shadow-2xl border border-gray-300"
        />
        <div className="flex flex-col sm:flex-row h-full items-start sm:items-center justify-center ml-2 pt-2 sm:pt-0">
          <div>
            <p className="text-xl text-white font-light pr-3">
              Following ({userData.following.length}):{" "}
            </p>
          </div>
          <div
            className="flex h-16 items-center justify-center bg-Jet-Gray
           p-2 rounded-md shadow"
          >
            {userData.following.slice(0, 2).map((i) => {
              return (
                <div className="flex px-1">
                  <Link href={`/users/${i.userID}`}>
                    <img
                      className="flex object-contain -10 h-10 rounded-full hover:cursor-pointer"
                      src={i.image}
                    />
                  </Link>
                </div>
              );
            })}
          </div>
          <div className="sm:ml-2">
            <p className="text-xl font-light pr-3 text-white">
              Followers ({userData.followers.length}):{" "}
            </p>
          </div>
          <div className="flex h-16 items-center justify-center bg-Jet-Gray p-2 rounded-md shadow">
            {userData.followers.slice(0, 2).map((i) => {
              return (
                <div className="flex px-1">
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
      </div>
      <h2 className="text-2xl font-thin ml-5 pb-2 sm:pb-0 sm:ml-10 text-white">
        {fullName}
      </h2>
      <div className="flex ml-5 sm:ml-10">
        {isMe && (
          <p className="font-light text-Ghost-White">
            Your public profile view
          </p>
        )}
        {!isMe && (
          <div>
            {following && (
              <button
                type="submit"
                onClick={unfollow}
                className="bg-blue-400 px-2 py-1 rounded-md text-white font-light"
              >
                Following
              </button>
            )}
            {!following && (
              <button
                type="submit"
                onClick={follow}
                className="bg-blue-400 px-2 py-1 rounded-md text-white font-light"
              >
                Follow
              </button>
            )}
          </div>
        )}
      </div>
      <div className="flex w-full justify-center ">
        {/* <WatchlistContainer username={fullName} /> */}
        <div className="flex-col p-5">
          <h3 className="text-xl text-white font-thin ml-2">
            {fullName}'s Watchlists ({userData.watchlists.length}):
          </h3>
          <div className="flex flex-wrap items-center justify-center">
            {userData.watchlists.map((watchlist) => {
              return (
                <div
                  className="flex flex-col my-2 w-44 bg-Jet-Gray rounded mx-2 p-2 drop-shadow-md"
                  key={watchlist._id}
                >
                  <p className="text-2xl font-thin text-white">
                    {watchlist.watchlistName}
                  </p>
                  {watchlist.coins[0].coin.map((i) => {
                    return (
                      <div className="hover:cursor-pointer">
                        <Link href={`/coins/${i.coinID}`}>
                          <p className="text-xl font-thin bg-Davys-Gray my-1 rounded p-1 text-green-400 duration-100 hover:bg-Davys-Gray-light">
                            {i.coinID}
                          </p>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full items-center">
        <h2 className="text-xl text-white font-thin pb-2">
          {fullName}'s Posts (
          {
            userPosts.filter((p) => {
              return p.postAuthor === userData?._id;
            }).length
          }
          )
        </h2>

        <div className="bg-Eerie-Black-dark flex w-full sm:w-3/4 md:w-2/4 sm:rounded drop-shadow-md">
          <div className="flex flex-col w-full items-center min-h-54 max-h-96 overflow-auto sm:p-2">
            {userPosts
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
                      className="flex items-center bg-Jet-Gray text-white sm:border-none border-t border-Davys-Gray w-full sm:rounded sm:my-1 p-2 hover:bg-Davys-Gray"
                    >
                      <img
                        src={userData?.image}
                        className="flex w-12 h-12 rounded-full"
                      />
                      <div className="w-full px-3">
                        <div className="flex w-full justify-between">
                          <p>{fullName}</p>
                          <p className="font-light">
                            {new Date(i.createdAt)
                              .toISOString()
                              .substring(0, 10)}
                          </p>
                        </div>
                        <div className="flex w-full font-light justify-between">
                          <p>{i.postBody}</p>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
