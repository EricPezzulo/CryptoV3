import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Post from "../components/Post";
import NewPost from "../components/NewPost";
import PublicIcon from "@mui/icons-material/Public";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../components/Loader";
import EndMsg from "../components/EndMsg";
const apiEndpoint = `http://localhost:5000/api/posts`;

function feed() {
  // const [postData, setPostData] = useState([]);
  const [followingPosts, setFollowingPosts] = useState([]);
  const [showFollowing, setShowFollowing] = useState(true);
  const [showPublic, setShowPublic] = useState(false);
  const { data: session } = useSession();
  // const [hasMore, setHasMore] = useState();
  // useEffect(() => {
  //   const getPosts = async () => {
  //     const res = await fetch(apiEndpoint);
  //     const data = await res.json();
  //     setPostData(data);
  //     const filteredPostAuthors = session?.following?.map((i) => i.userID);
  //     const filteredPosts = data.filter((j) =>
  //       session?.following?.map((i) => i.userID).includes(j.postAuthor)
  //     );
  //     setFollowingPosts(filteredPosts);
  //   };

  //   getPosts();
  // }, [postData]);

  const handlePublic = () => {
    setShowPublic(true);
    setShowFollowing(false);
  };
  const handleFollowing = () => {
    setShowFollowing(true);
    setShowPublic(false);
  };

  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);

  useEffect(() => {
    const getPosts = async () => {
      const res = await fetch(
        `http://localhost:5000/api/posts?page=1&limit=20`
        // For json server use url below
        // `https://jsonplaceholder.typicode.com/comments?_page=1&_limit=20`
      );
      const data = await res.json();
      setItems(data);
      const filteredPostAuthors = session?.following?.map((i) => i.userID);
      const filteredPosts = data.filter((j) =>
        session?.following?.map((i) => i.userID).includes(j.postAuthor)
      );
      setFollowingPosts(filteredPosts);
    };

    getPosts();
  }, []);

  const fetchPosts = async () => {
    const res = await fetch(
      `http://localhost:5000/api/posts?page=${page}&limit=20`
      // For json server use url below
      // `https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=20`
    );
    const data = await res.json();
    return data;
  };

  const fetchData = async () => {
    const postsFromServer = await fetchPosts();

    setItems([...items, ...postsFromServer]);
    setFollowingPosts([...followingPosts, ...postsFromServer]);
    if (postsFromServer.length === 0 || postsFromServer.length < 20) {
      setHasMore(false);
    }
    setPage(page + 1);
  };

  if (!followingPosts) return <div>loading</div>;
  const displayFollowing = (
    <div className="flex-col w-full items-center justify-center">
      <div className="flex flex-col mx-20">
        <InfiniteScroll
          className="flex flex-col w-full justify-center items-center"
          dataLength={followingPosts.length} //This is important field to render the next data
          next={fetchData}
          hasMore={hasMore}
          loader={<Loader />}
          endMessage={<EndMsg />}
        >
          {followingPosts
            .map((i) => {
              return (
                <motion.div
                  initial={{ x: 0, y: -20, opacity: 0 }}
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
                  key={i._id}
                  className="flex w-full sm:w-3/5 sm:my-1"
                >
                  <Post
                    postBody={i.postBody}
                    postCreated={i.createdAt}
                    postAuthor={i.postAuthor}
                  />
                </motion.div>
              );
            })
            .reverse()}
        </InfiniteScroll>
      </div>
    </div>
  );
  const displayPublic = (
    <div className="flex-col w-full items-center justify-center">
      <div className="flex flex-col mx-20">
        <InfiniteScroll
          className="flex flex-col w-full justify-center items-center"
          dataLength={items.length} //This is important field to render the next data
          next={fetchData}
          hasMore={hasMore}
          loader={<Loader />}
          endMessage={<EndMsg />}
        >
          {items.map((i) => {
            return (
              <motion.div
                initial={{ x: 0, y: -20, opacity: 0 }}
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
                key={i._id}
                className="flex w-full sm:w-3/5 sm:my-1"
              >
                <Post
                  postBody={i.postBody}
                  postCreated={i.createdAt}
                  postAuthor={i.postAuthor}
                />
              </motion.div>
            );
          })}
        </InfiniteScroll>
      </div>
    </div>
  );
  console.log(followingPosts);
  return (
    <div className="bg-Eerie-Black min-h-screen">
      <Header />
      <div className="flex w-full justify-center items-center py-5 text-Ghost-White sm:w-3/4 sm:mx-auto md:w-3/4">
        <div className="flex-col h-full w-full">
          <div className="flex w-full">
            <PublicIcon
              className={
                showPublic
                  ? `flex w-full h-10 hover:cursor-pointer text-blue-400`
                  : `flex w-full h-10 hover:cursor-pointer text-Ghost-White`
              }
              onClick={handlePublic}
            />
          </div>
          <div className="flex w-full justify-center items-center">
            <p>Public</p>
          </div>
        </div>
        <div className="flex-col h-full w-full">
          <div className="flex w-full">
            <AddReactionIcon
              className={
                showFollowing
                  ? `flex w-full
              h-10 text-blue-400 hover:cursor-pointer`
                  : `flex w-full
              h-10 text-Ghost-White hover:cursor-pointer`
              }
              onClick={handleFollowing}
            />
          </div>
          <div className="flex w-full justify-center items-center">
            <p>Following</p>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center items-center sm:my-2">
        <NewPost />
      </div>
      <div className="flex flex-col items-center justify-center w-full">
        {showFollowing && <> {displayFollowing}</>}
        {showPublic && (
          <div className="flex flex-col items-center  w-full">
            {displayPublic}
          </div>
        )}
      </div>
    </div>
  );
}

export default feed;
