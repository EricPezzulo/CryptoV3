import InfiniteScroll from "react-infinite-scroll-component";
import { motion } from "framer-motion";
import Loader from "./Loader";
import EndMsg from "./EndMsg";
import { useEffect, useState } from "react";
import Post from "./Post";
import { useSession } from "next-auth/react";

export default function MyProfilePosts({ session }) {
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);
  const [filteredPosts, setFilteredPosts] = useState([]);
  // const { data: session } = useSession();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const res = await fetch(`http://localhost:5000/api/posts/getuserposts`);
      const data = await res.json();
      const filteredPostAuthors = data.filter(
        (post) => post.postAuthor === session.id
      );
      setItems(filteredPostAuthors);
    };
    getPosts();
  }, []);
  console.log(items);
  const fetchPosts = async () => {
    const res = await fetch(
      `http://localhost:5000/api/posts/getuserposts?user=${session?.id}&page=${page}&limit=10`
    );
    const data = await res.json();
    return data;
  };

  const fetchData = async () => {
    const postsFromServer = await fetchPosts();

    setItems([...items, ...postsFromServer]);
    if (postsFromServer.length === 0 || postsFromServer.length < 20) {
      setHasMore(false);
    }
    setPage(page + 1);
  };

  const displayFollowing = (
    <div className="flex flex-col">
      <div
        id="scrollableDiv"
        className="flex w-full bg-Jet-Gray shadow-lg rounded my-5 h-64 overflow-y-auto overflow-x-hidden"
      >
        <InfiniteScroll
          dataLength={items.length}
          next={fetchData}
          hasMore={hasMore}
          loader={<Loader />}
          endMessage={<EndMsg />}
          className="items-center justify-center"
          scrollableTarget="scrollableDiv"
        >
          <div className="flex flex-col justify-center items-center w-full sm:p-3 ">
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
                  className="flex sm:my-1"
                >
                  <Post
                    postBody={i.postBody}
                    postCreated={i.createdAt}
                    postAuthor={i.postAuthor}
                    deletePost={true}
                    postID={i._id}
                  />
                </motion.div>
              );
            })}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
  if (!items) {
    <div>
      <p>loading...</p>
    </div>;
  }
  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex flex-col items-center">
        <p className="text-white text-xl font-light">
          My Posts({items.length})
        </p>
        <div>{displayFollowing}</div>
      </div>
    </div>
  );
}
