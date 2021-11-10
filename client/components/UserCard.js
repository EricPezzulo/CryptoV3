import AddIcon from "@mui/icons-material/Add";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

function UserCard({ name, avatar, userID, sessionID }) {
  const [following, setFollowing] = useState(null);
  const [followingID, setFollowingID] = useState(userID);
  const [dummyState, setDummyState] = useState("");
  useEffect(() => {
    const checkFollow = async (userID) => {
      const res = await axios.get(
        `http://localhost:5000/api/users/${sessionID}/following`
      );
      setDummyState(res.data[0]?.following?.userID);
      if (dummyState === userID) {
        setFollowing(true);
      } else {
        setFollowing(false);
      }
    };
    checkFollow();
  }, [following]);
  console.log(dummyState);
  const unfollow = async () => {
    try {
      const res = await axios({
        url: `http://localhost:5000/api/users/${sessionID}/unfollow`,
        method: "PUT",
        data: {
          userID: followingID,
        },
      });
      setFollowing(false);
    } catch (error) {
      console.log(error);
    }
  };
  const follow = async () => {
    try {
      const res = await axios({
        url: `http://localhost:5000/api/users/${sessionID}/follow`,
        method: "PUT",
        data: {
          userID: followingID,
          image: avatar,
        },
      });
      setFollowing(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex px-2 h-14 w-full bg-gradient-to-tr from-gray-200 to-gray-100 rounded-lg justify-between items-center">
      <div className="flex items-center justify-center ">
        <div className="flex h-10 w-10">
          <img className="flex rounded-full" src={avatar} alt="avatar" />
        </div>
        <div className="flex px-2">
          <p className="text-xl font-light">{name}</p>
        </div>

        <p></p>
      </div>
      <div>
        {following && (
          <button type="button" onClick={unfollow}>
            <HighlightOffIcon />
          </button>
        )}
        {!following && (
          <button type="button" onClick={follow}>
            <AddIcon />
          </button>
        )}
      </div>
    </div>
  );
}

export default UserCard;
