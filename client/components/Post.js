import React from "react";
import useSWR from "swr";
import Link from "next/link";
import { fetcher, nameConverter } from "../utils/helpers";
import Delete from "@mui/icons-material/Delete";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";

function Post({ postBody, postAuthor, postCreated, deletePost, postID }) {
  const apiEndpoint = `http://localhost:5000/api/users/${postAuthor}`;
  const { data, error } = useSWR(apiEndpoint, fetcher);
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };
  const deleteMyPost = async (postID) => {
    try {
      const res = await axios({
        url: `http://localhost:5000/api/posts/${postID}/delete`,
        method: "DELETE",
        data: postID,
      });
      console.log(`post ${postID} saying "${postBody}" has been deleted!`);
      refreshData();
    } catch (error) {
      console.log("could not remove post ");
    }
  };

  if (error) return <div>failed</div>;
  if (!data) return <div>loading</div>;
  const fullName = nameConverter(data);
  const timestamp = new Date(postCreated).toISOString().substring(0, 10);
  return (
    <div className="group flex bg-Jet-Gray w-full justify-between p-2 sm:rounded cursor-pointer hover:bg-Davys-Gray border-t border-Davys-Gray sm:border-none duration-100">
      <Link href={`/users/${postAuthor}`}>
        <div className="flex w-full">
          <div>
            <Image
              width={55}
              height={55}
              className="flex w-12 h-12 rounded-full"
              src={data.image}
              alt="avatar"
            />
          </div>
          <div className="flex w-full flex-col relative">
            <div className="flex w-full justify-between px-2">
              <p className="text-white font-semibold">{fullName}</p>
              <p className="font-light text-white">{timestamp}</p>
            </div>{" "}
            <div className="absolute bottom-1 right-0">
              {deletePost && (
                <div className="flex items-end flex-end">
                  <button type="button" onClick={() => deleteMyPost(postID)}>
                    <Delete className="text-white mr-1 z-50 invisible group-hover:visible" />
                  </button>
                </div>
              )}
            </div>
            <div className="flex justify-between">
              <div className="flex px-2">
                <p className="text-white font-light break-normal">{postBody}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Post;
