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
      <div className="bg-Eerie-Black min-h-screen">
        <Header />
        <div className="flex h-full items-center w-full">
          <div className="flex rounded-full object-contain w-32 h-32 m-5 p-1 drop-shadow-2xl border bg-Davys-Gray animate-pulse border-gray-300" />
          <div className="flex h-full items-center justify-center ml-2 pt-2 sm:pt-0">
            {/* <FriendsDock sessionID={session?.id} /> */}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row">
          <div className="flex w-full h-full justify-center">
            <div className="flex-col items-center justify-center w-full h-full mx-10 px-2 my-2 rounded animate-pulse bg-Jet-Gray">
              <div className="flex-col h-full w-full items-center justify-center">
                <div className="flex w-full h-12 bg-Davys-Gray my-2 rounded"></div>
                <div className="flex w-full h-12 bg-Davys-Gray my-2 rounded"></div>
                <div className="flex w-full h-12 bg-Davys-Gray my-2 rounded"></div>
                <div className="flex w-full h-12 bg-Davys-Gray my-2 rounded"></div>
              </div>
            </div>
          </div>
          <div className="hidden sm:flex w-full h-full justify-center">
            <div className="flex-col items-center justify-center w-full h-full mx-10 px-2 my-2 rounded animate-pulse bg-Jet-Gray">
              <div className="flex-col h-full w-full items-center justify-center">
                <div className="flex w-full h-12 bg-Davys-Gray my-2 rounded"></div>
                <div className="flex w-full h-12 bg-Davys-Gray my-2 rounded"></div>
                <div className="flex w-full h-12 bg-Davys-Gray my-2 rounded"></div>
                <div className="flex w-full h-12 bg-Davys-Gray my-2 rounded"></div>
              </div>
            </div>
          </div>
          <div className="hidden sm:flex w-full h-full justify-center">
            <div className="flex-col items-center justify-center w-full h-full mx-10 px-2 my-2 rounded animate-pulse bg-Jet-Gray">
              <div className="flex-col h-full w-full items-center justify-center">
                <div className="flex w-full h-12 bg-Davys-Gray my-2 rounded"></div>
                <div className="flex w-full h-12 bg-Davys-Gray my-2 rounded"></div>
                <div className="flex w-full h-12 bg-Davys-Gray my-2 rounded"></div>
                <div className="flex w-full h-12 bg-Davys-Gray my-2 rounded"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full items-center">
          <h2 className="text-2xl font-thin text-white">
            My Posts (loading...)
          </h2>
          <div className=" flex w-full sm:w-3/4 md:w-2/4 sm:mt-5 sm:rounded pt-2">
            <div className="flex w-full flex-col">
              <div className="flex bg-Eerie-Black-dark flex-col w-full shadow sm:rounded items-center min-h-54 max-h-96 overflow-auto sm:p-2 sm:border-none border-t border-Davys-Gray">
                <div className="flex bg-Jet-Gray w-full justify-between p-2 sm:rounded border-Davys-Gray sm:border-none duration-100 sm:my-1">
                  <div>
                    <div className="flex w-12 h-12 rounded-full bg-Davys-Gray animate-pulse"></div>
                  </div>
                  <div className="w-full px-3">
                    <div className="flex w-full justify-between">
                      <div className="w-8 h-3 rounded bg-Davys-Gray animate-pulse"></div>
                      <div className="font-light w-16 h-3 bg-Davys-Gray rounded animate-pulse"></div>
                    </div>
                    <div className="flex w-full justify-between font-light">
                      <div className="font-light w-16 h-3 bg-Davys-Gray animate-pulse my-2 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex bg-Eerie-Black-dark flex-col w-full shadow sm:rounded items-center min-h-54 max-h-96 overflow-auto sm:p-2 sm:border-none border-t border-Davys-Gray">
                <div className="flex bg-Jet-Gray w-full justify-between p-2 sm:rounded border-Davys-Gray sm:border-none duration-100 sm:my-1">
                  <div>
                    <div className="flex w-12 h-12 rounded-full bg-Davys-Gray animate-pulse"></div>
                  </div>
                  <div className="w-full px-3">
                    <div className="flex w-full justify-between">
                      <div className="w-8 h-3 rounded bg-Davys-Gray animate-pulse"></div>
                      <div className="font-light w-16 h-3 bg-Davys-Gray rounded animate-pulse"></div>
                    </div>
                    <div className="flex w-full justify-between font-light">
                      <div className="font-light w-16 h-3 bg-Davys-Gray animate-pulse my-2 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  const fullName = Object.values(userData.name[0]).slice(0, -1).join("");

  if (!listOfPosts)
    return (
      <div className="bg-Eerie-Black min-h-screen">
        <Header />
        <div className="flex h-full items-center w-full">
          <img
            src={userData.image}
            className="flex rounded-full object-contain w-32 h-32 m-5 p-1 drop-shadow-2xl border border-gray-300"
          />
          <div className="flex h-full items-center justify-center ml-2 pt-2 sm:pt-0">
            <FriendsDock sessionID={session?.id} />
          </div>
        </div>
        <div className="flex w-full justify-center">
          <WatchlistContainer username={fullName} />
        </div>
        <div className="flex flex-col w-full items-center">
          <h2 className="text-2xl font-thin text-white">
            My Posts (
            {
              listOfPosts.filter((p) => {
                return p.postAuthor === session?.id;
              }).length
            }
            )
          </h2>
          <div className=" flex w-full sm:w-3/4 md:w-2/4 sm:mt-5 sm:rounded pt-2">
            <div className="flex bg-Eerie-Black-dark flex-col w-full shadow sm:rounded items-center min-h-54 max-h-96 overflow-auto sm:p-2">
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
                        className="flex bg-Jet-Gray w-full justify-between p-2 sm:rounded cursor-pointer hover:bg-Davys-Gray border-t border-Davys-Gray sm:border-none duration-100 text-white sm:my-1"
                      >
                        <img
                          src={session?.user?.image}
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
                          <div className="flex w-full justify-between font-light">
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
  return (
    <div className="bg-Eerie-Black min-h-screen">
      <Header />
      <div className="flex h-full items-center w-full">
        <img
          src={userData.image}
          className="flex rounded-full object-contain w-32 h-32 m-5 p-1 drop-shadow-2xl border border-gray-300"
        />
        <div className="flex h-full items-center justify-center ml-2 pt-2 sm:pt-0">
          <FriendsDock
            sessionID={session?.id}
            followings={session?.following}
            followers={session?.followers}
          />
        </div>
      </div>
      <div className="flex w-full justify-center">
        <WatchlistContainer username={fullName} />
      </div>
      <div className="flex flex-col w-full items-center">
        <h2 className="text-2xl font-thin text-white">
          My Posts (
          {
            listOfPosts.filter((p) => {
              return p.postAuthor === session?.id;
            }).length
          }
          )
        </h2>
        <div className=" flex w-full sm:w-3/4 md:w-2/4 sm:mt-5 sm:rounded pt-2">
          <div className="flex bg-Eerie-Black-dark flex-col w-full shadow sm:rounded items-center min-h-54 max-h-96 overflow-auto sm:p-2">
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
                      className="flex bg-Jet-Gray w-full justify-between p-2 sm:rounded cursor-pointer hover:bg-Davys-Gray border-t border-Davys-Gray sm:border-none duration-100 text-white sm:my-1"
                    >
                      <img
                        src={session?.user?.image}
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
                        <div className="flex w-full justify-between font-light">
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
