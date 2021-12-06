import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Post from "../components/Post";
import NewPost from "../components/NewPost";
import PublicIcon from "@mui/icons-material/Public";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import InfiniteScroll from "react-infinite-scroll-component";
const apiEndpoint = `http://localhost:5000/api/posts`;

function feed() {
  const [postData, setPostData] = useState([]);
  const [followingPosts, setFollowingPosts] = useState([]);
  const [showFollowing, setShowFollowing] = useState(true);
  const [showPublic, setShowPublic] = useState(false);
  const { data: session } = useSession();
  const [hasMore, setHasMore] = useState();
  useEffect(() => {
    const getPosts = async () => {
      const res = await fetch(apiEndpoint);
      const data = await res.json();
      setPostData(data);
      const filteredPostAuthors = session?.following?.map((i) => i.userID);
      const filteredPosts = data.filter((j) =>
        session?.following?.map((i) => i.userID).includes(j.postAuthor)
      );
      setFollowingPosts(filteredPosts);
    };

    getPosts();
  }, [postData]);

  const handlePublic = () => {
    setShowPublic(true);
    setShowFollowing(false);
  };
  const handleFollowing = () => {
    setShowFollowing(true);
    setShowPublic(false);
  };

  if (!postData) return <div>loading</div>;
  const displayFollowing = followingPosts
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
    .reverse();
  const displayPublic = postData
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
    .reverse();

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
