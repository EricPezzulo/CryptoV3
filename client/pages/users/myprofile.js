import { useEffect, useState } from "react";
import useSWR from "swr";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import WatchlistContainer from "../../components/WatchlistContainer";
import Header from "../../components/Header";
import NewPost from "../../components/NewPost";
import { AnimatePresence, motion } from "framer-motion";
import FriendsDock from "../../components/FriendsDock";
import { useSession } from "next-auth/react";
import Link from "next/link";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

function myprofile() {
  const { data: session } = useSession();
  const [listOfPosts, setListOfPosts] = useState([]);
  const [postData, setPostData] = useState([]);
  const { data: userData, userError } = useSWR(
    `http://localhost:5000/api/users/${session?.id}`,
    fetcher
  );
  // const { data: postData, postError } = useSWR(
  //   `http://localhost:5000/api/posts/`,
  //   fetcher
  // );

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
    const getPostData = async () => {
      try {
        await axios
          .get("http://localhost:5000/api/posts")
          .then((res) => setListOfPosts(res.data));
      } catch (error) {
        console.log(error);
      }
    };
    getPostData();
  }, [listOfPosts]);

  if (userError) return <div>failed</div>;
  // if (userData || postData)
  if (!userData || !postData)
    return (
      <div className="flex flex-col min-h-screen w-full">
        <Header />
        <div className="flex">
          <div className="flex rounded-full shadow-2xl m-5 p-1">
            <div className="flex rounded-full object-contain w-32 h-32"></div>
          </div>
        </div>
        <div className="flex w-full justify-center">
          <div className="flex flex-wrap h-full justify-center p-3 mt-10 rounded-md">
            <div className="flex flex-col items-center justify-center bg-gray-200 animate-pulse rounded-md w-44 h-60 px-3 mx-2 drop-shadow-md">
              <div className="flex bg-gray-100 pulse h-10 w-full rounded-md my-2"></div>
              <div className="flex bg-gray-100 pulse h-10 w-full rounded-md my-2"></div>
              <div className="flex bg-gray-100 pulse h-10 w-full rounded-md my-2"></div>
              <div className="flex bg-gray-100 pulse h-10 w-full rounded-md my-2"></div>
            </div>
            <div className="flex flex-col items-center justify-center bg-gray-200 animate-pulse rounded-md w-44 h-60 px-3 mx-2 drop-shadow-md">
              <div className="flex bg-gray-100 pulse h-10 w-full rounded-md my-2"></div>
              <div className="flex bg-gray-100 pulse h-10 w-full rounded-md my-2"></div>
              <div className="flex bg-gray-100 pulse h-10 w-full rounded-md my-2"></div>
              <div className="flex bg-gray-100 pulse h-10 w-full rounded-md my-2"></div>
            </div>
            <div className="flex flex-col items-center justify-center bg-gray-200 animate-pulse rounded-md w-44 h-60 px-3 mx-2 drop-shadow-md">
              <div className="flex bg-gray-100 pulse h-10 w-full rounded-md my-2"></div>
              <div className="flex bg-gray-100 pulse h-10 w-full rounded-md my-2"></div>
              <div className="flex bg-gray-100 pulse h-10 w-full rounded-md my-2"></div>
              <div className="flex bg-gray-100 pulse h-10 w-full rounded-md my-2"></div>
            </div>
            <div className="flex flex-col items-center justify-center bg-gray-200 animate-pulse rounded-md w-44 h-60 px-3 mx-2 drop-shadow-md">
              <div className="flex bg-gray-100 pulse h-10 w-full rounded-md my-2"></div>
              <div className="flex bg-gray-100 pulse h-10 w-full rounded-md my-2"></div>
              <div className="flex bg-gray-100 pulse h-10 w-full rounded-md my-2"></div>
              <div className="flex bg-gray-100 pulse h-10 w-full rounded-md my-2"></div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full items-center">
          <h2 className="text-2xl font-thin">My Posts</h2>
          {/* <div className="flex w-3/5 justify-center py-1">
            <NewPost />
          </div> */}

          <div className="bg-gray-200 flex w-2/4 h-64 rounded animate-pulse">
            <div className="flex flex-col w-full shadow rounded items-center min-h-54 max-h-96 overflow-auto p-2"></div>
          </div>
          <div className="flex h-full w-full items-center justify-center">
            {/* <FriendsDock sessionID={session?.id} /> */}
            <div className="flex bg-gray-200 animate-pulse w-44 h-14 rounded-md mt-5"></div>
          </div>
        </div>
      </div>
    );

  const fullName = Object.values(userData.name[0]).slice(0, -1).join("");

  if (!listOfPosts)
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

          <div className="bg-gray-200 h-64 animate-pulse flex w-2/4 rounded">
            <div className="flex flex-col w-full shadow rounded items-center min-h-54 max-h-96 overflow-auto p-2">
              {/* {listOfPosts
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
                })} */}
            </div>
          </div>
          <div className="flex h-full w-full items-center justify-center">
            <FriendsDock sessionID={session?.id} />
          </div>
        </div>
      </div>
    );
  return (
    <div>
      <Header />
      <div className="flex h-full items-center w-full">
        <div className="flex rounded-full m-5 p-1 drop-shadow-2xl bg-gray-100">
          <img
            src={userData.image}
            className="flex rounded-full object-contain w-32 h-32"
          />
        </div>
        <div className="flex h-full items-center justify-center ml-2">
          <FriendsDock sessionID={session?.id} />
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

        <div className="bg-gray-100 flex w-2/4 mt-5 rounded">
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
      </div>
    </div>
  );
}

export default myprofile;
