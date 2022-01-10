import InfiniteScroll from "react-infinite-scroll-component";
import { motion } from "framer-motion";
import Loader from "./Loader";
import EndMsg from "./EndMsg";
import { useEffect, useState } from "react";
import Post from "./Post";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function FollowingFeed() {
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [followingPosts, setFollowingPosts] = useState([]);
  const [postArr, setPostArr] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/posts?page=${page}&limit=20`
      );
      const { data } = res;
      setPostArr(session?.following?.map((i) => i.userID));
      setFollowingPosts(data);
    };
    fetchPosts();
  }, [followingPosts]);

  const fetchData = async () => {
    const postsFromServer = await fetchPosts();
    setFollowingPosts([...followingPosts, ...postsFromServer]);
    if (postsFromServer.length === 0 || postsFromServer.length < 20) {
      setHasMore(false);
    }
    setPage(page + 1);
  };

  const displayFollowing = (
    <div className="flex-col w-full items-center justify-center">
      <div className="flex flex-col sm:mx-20">
        <InfiniteScroll
          className="flex flex-col w-full justify-center items-center"
          dataLength={followingPosts.length}
          next={fetchData}
          hasMore={hasMore}
          loader={<Loader />}
          endMessage={<EndMsg />}
        >
          {followingPosts
            .filter((post) => postArr.includes(post.postAuthor))
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
  if (!followingPosts) {
    <div>
      <p>loading...</p>
    </div>;
  }
  return <div className="flex w-full">{displayFollowing}</div>;
}
