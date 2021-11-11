import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useSWR from "swr";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import Header from "../../../components/Header";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const res = await fetch(
    `http://localhost:5000/api/users/${context.query.id}`
  );
  const userData = await res.json();
  const posts = await fetch(`http://localhost:5000/api/posts`);
  const userPosts = await posts.json();
  const { id } = context.query;
  // const isFollowing = await fetch(
  //   `http://localhost:5000/api/users/${session.id}/following`
  // );
  // { headers }
  // const followData = isFollowing.json();
  return {
    props: { props: { id, userData, userPosts } },
  };
}

function index({ props }) {
  const userId = props.id;
  const [followingID, setFollowingID] = useState(userId);
  const { data: session } = useSession();
  const [following, setFollowing] = useState(null);
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };

  // useEffect(() => {
  //   if (props.userData._id === session?.following[0].userID.id) {
  //     console.log("following");
  //     setFollowing(true);
  //   } else {
  //     console.log("not following");
  //     console.log(props.userData._id);
  //     console.log(session?.following[0].userID.id);
  //     setFollowing(false);
  //   }
  // });

  // console.log(session?.following[0].userID);
  // console.log(props.userData._id);
  // console.log(props.userData);

  // console.log(props.userData.image);
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
      // refreshData();
    } catch (error) {
      console.log(error);
    }
  };
  const follow = async (userData) => {
    try {
      const res = await axios({
        url: `http://localhost:5000/api/users/${session?.id}/follow`,
        method: "PUT",
        data: {
          userID: followingID,
          image: props.userData.image,
        },
      });
      setFollowing(true);
      // refreshData();
    } catch (error) {
      console.log(error);
    }
  };
  console.log(props.userData);
  if (!props.userData)
    return (
      <div className="flex flex-col min-h-screen w-full">
        <Header />
        <div className="flex w-full items-center justify-between">
          <h4 className="text-2xl font-light m-5">Loading Watchlists...</h4>
        </div>
      </div>
    );

  const fullName = Object.values(props.userData.name[0]).slice(0, -1).join("");

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <div className="flex">
        <div className="flex rounded-full  shadow-2xl m-5 p-1">
          <img
            src={props.userData.image}
            className="flex rounded-full object-contain w-32 h-32"
          />
        </div>
      </div>
      <h2 className="text-2xl font-thin ml-10">{fullName}</h2>
      <div className="flex ml-5">
        <div>
          {following && (
            <button
              onClick={unfollow}
              className="bg-blue-400 px-2 py-1 rounded-md text-white font-light"
            >
              Following
            </button>
          )}
          {!following && (
            <button
              onClick={follow}
              className="bg-blue-400 px-2 py-1 rounded-md text-white font-light"
            >
              Follow
            </button>
          )}
        </div>
      </div>
      <div className="flex w-full justify-center ">
        {/* <WatchlistContainer username={fullName} /> */}
        <div className="flex-col p-5">
          <h3 className="text-xl font-thin">{fullName}'s watchlists:</h3>
          <div className="flex ">
            {props.userData.watchlists.map((watchlist) => {
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
            props.userPosts.filter((p) => {
              return p.postAuthor === props.userData?._id;
            }).length
          }
          )
        </h2>

        <div className="bg-gray-100 flex w-2/4 rounded">
          <div className="flex flex-col w-full items-center min-h-54 max-h-96 overflow-auto p-2">
            {props.userPosts
              .filter((p) => {
                return p.postAuthor === props.userData?._id;
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
                        src={props.userData?.image}
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

export default index;
