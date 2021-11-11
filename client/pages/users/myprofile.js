import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import CoinInUserProfile from "../../components/CoinInUserProfile";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import WatchlistContainer from "../../components/WatchlistContainer";
import Header from "../../components/Header";
import Post from "../../components/Post";
import NewPost from "../../components/NewPost";
import { AnimatePresence, motion } from "framer-motion";
import Delete from "@mui/icons-material/Delete";
import FriendsDock from "../../components/FriendsDock";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

function myprofile() {
  const { data: session } = useSession();
  const router = useRouter();
  const [listOfPosts, setListOfPosts] = useState([]);
  const { data: userData, userError } = useSWR(
    `http://localhost:5000/api/users/${session?.id}`,
    fetcher
  );
  const { data: postData, postError } = useSWR(
    `http://localhost:5000/api/posts/`,
    fetcher
  );

  const deletePost = async (_id) => {
    await axios({
      url: `http://localhost:5000/api/posts/${_id}/delete`,
      method: "DELETE",
      data: {
        _id,
      },
    });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/posts`)
      .then((res) => setListOfPosts(res.data));
  }, [listOfPosts]);

  if (userError || postError) return <div>failed</div>;
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

  if (!postData) return <div>no posts</div>;
  // userData.following.map((i) => console.log(i.userID));
  // console.log(session);
  // console.log(listOfPosts.data);
  // console.log(userData);
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <div className="flex">
        <div className="flex rounded-full shadow-2xl m-5 p-1">
          <img
            src={userData.image}
            className="flex rounded-full object-contain w-32 h-32"
          />
        </div>
      </div>
      <div className="flex w-full justify-center">
        <WatchlistContainer username={fullName} />
      </div>
      <div className="flex flex-col w-full items-center">
        <h2 className="text-2xl font-thin">
          My Posts (
          {
            listOfPosts.filter((p) => {
              return p.postAuthor === session?.id;
            }).length
          }
          )
        </h2>
        <div className="flex w-3/5 justify-center py-1">
          <NewPost />
        </div>

        <div className="bg-gray-100 flex w-2/4 rounded">
          <div className="flex flex-col w-full shadow rounded items-center min-h-54 max-h-96 overflow-auto p-2">
            {listOfPosts
              .filter((p) => {
                return p.postAuthor === session?.id;
              })
              .reverse()
              .map((i) => {
                return (
                  <AnimatePresence>
                    <motion.div
                      initial={{ x: 0, y: -100, opacity: 0 }}
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
                        src={session?.user?.image}
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
                          <button
                            type="button"
                            onClick={() => deletePost(i._id)}
                          >
                            <DeleteIcon />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                );
              })}
          </div>
        </div>
        <div className="flex h-full w-full items-center justify-center">
          <FriendsDock sessionID={session?.id} />
        </div>
      </div>
    </div>
  );
}

export default myprofile;
