import React, { useState } from "react";
import Header from "../components/Header";
import NewPost from "../components/NewPost";
import PublicIcon from "@mui/icons-material/Public";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import PublicFeed from "../components/PublicFeed";
import FollowingFeed from "../components/FollowingFeed";

function feed() {
  const [showFollowing, setShowFollowing] = useState(false);
  const [showPublic, setShowPublic] = useState(true);

  const handlePublic = () => {
    setShowPublic(true);
    setShowFollowing(false);
  };
  const handleFollowing = () => {
    setShowFollowing(true);
    setShowPublic(false);
  };

  return (
    <div className="bg-Eerie-Black min-h-screen">
      <Header />
      <div className="flex w-full justify-center items-center py-5 text-Ghost-White sm:w-3/4 sm:mx-auto md:w-3/4">
        <div className="flex-col h-full w-full">
          <div className="flex flex-col w-full items-center justify-center">
            <PublicIcon
              className={
                showPublic
                  ? `flex w-full h-10 hover:cursor-pointer text-blue-400`
                  : `flex w-full h-10 hover:cursor-pointer text-Ghost-White`
              }
              onClick={handlePublic}
            />
            <div className="flex w-full justify-center items-center">
              <p>Public</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col h-full w-full">
          <div className="flex flex-col w-full items-center justify-center">
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
            <div className="flex w-full justify-center items-center">
              <p>Following</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center items-center sm:my-2">
        <NewPost />
      </div>
      <div className="flex flex-col items-center justify-center w-full">
        {showFollowing && (
          <div className="flex w-full">
            <FollowingFeed />
          </div>
        )}
        {showPublic && (
          <div className="flex w-full">
            <PublicFeed />
          </div>
        )}
      </div>
    </div>
  );
}

export default feed;
