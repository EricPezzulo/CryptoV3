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
    <div className="bg-Eerie-Black min-h-screen flex flex-col">
      <Header />
      <div className="flex w-4/5 sm:w-3/5 md:w-3/6 self-center justify-between items-center py-5 text-Ghost-White ">
        <div className="flex flex-col">
          <div className="flex flex-col w-full ">
            <PublicIcon
              className={
                showPublic
                  ? `flex w-full h-14 hover:cursor-pointer text-blue-400`
                  : `flex w-full h-14 hover:cursor-pointer text-Ghost-White`
              }
              onClick={handlePublic}
            />
            <div className="flex w-full justify-center items-center">
              <p>Public</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col">
            <AddReactionIcon
              className={
                showFollowing
                  ? `flex w-full
              h-14 text-blue-400 hover:cursor-pointer`
                  : `flex w-full
              h-14 text-Ghost-White hover:cursor-pointer`
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
