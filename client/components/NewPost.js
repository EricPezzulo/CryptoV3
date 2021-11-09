import React, { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

function NewPost() {
  const { data: session } = useSession();
  const router = useRouter();
  const [postBody, setPostBody] = useState();
  const sendPost = async () => {
    try {
      const res = await axios({
        url: "http://localhost:5000/api/posts/add",
        method: "POST",
        data: {
          postBody,
          postAuthor: session?.id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col bg-gray-300 w-3/5 rounded p-2">
      <textarea
        onChange={(e) => setPostBody(e.target.value)}
        className="flex w-full h-full bg-gray-100"
        type="text"
      />
      <div className="flex w-full justify-end mt-2">
        <button
          onClick={sendPost}
          className="flex bg-blue-500 rounded-lg px-3 py-1 text-white"
        >
          Post
        </button>
      </div>
    </div>
  );
}

export default NewPost;
