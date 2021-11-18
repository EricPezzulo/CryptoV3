import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Post from "../components/Post";
import NewPost from "../components/NewPost";
import PublicIcon from "@mui/icons-material/Public";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import { motion } from "framer-motion";
const apiEndpoint = `http://localhost:5000/api/posts`;

function feed() {
  const [postData, setPostData] = useState([]);
  useEffect(() => {
    const getPosts = async () => {
      const res = await fetch(apiEndpoint);
      const data = await res.json();
      setPostData(data);
    };
    getPosts();
  }, [postData]);

  if (!postData) return <div>loading</div>;

  return (
    <div className="bg-Eerie-Black min-h-screen">
      <Header />
      <div className="flex w-full justify-center items-center py-5 text-Ghost-White sm:w-3/4 sm:mx-auto md:w-3/4">
        <div className="flex-col h-full w-full">
          <div>
            <PublicIcon className="flex w-full h-10 hover:cursor-pointer" />
          </div>
          <div className="flex w-full justify-center items-center hover:cursor-pointer">
            <p>Public</p>
          </div>
        </div>
        <div className="flex-col h-full w-full">
          <div>
            <AddReactionIcon className="flex w-full h-10 hover:cursor-pointer" />
          </div>
          <div className="flex w-full justify-center items-center hover:cursor-pointer">
            <p>Following</p>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center items-center sm:my-2">
        <NewPost />
      </div>
      <div className="flex flex-col items-center w-full">
        {postData.reverse().map((i) => {
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
      </div>
    </div>
  );
}

export default feed;
