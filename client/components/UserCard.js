import AddIcon from "@mui/icons-material/Add";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
function UserCard({ userData }) {
  const [following, setFollowing] = useState(null);
  const { data: session } = useSession();
  const refreshData = () => {
    router.replace(router.asPath);
  };
  console.log(userData);

  // console.log(following);
  // if (userData.id === dummyState)

  const unfollow = async () => {
    try {
      const res = await axios({
        url: `http://localhost:5000/api/users/${session?.id}/unfollow`,
        method: "PUT",
        data: {
          userID: session?.id,
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
        url: `http://localhost:5000/api/users/${session?.id}/follow`,
        method: "PUT",
        data: {
          userID: session?.id,
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
      <Link href={`/users/${userData._id}`}>
        <div className="flex items-center justify-center ">
          <div className="flex h-10 w-10">
            <img
              className="flex rounded-full"
              src={userData.image}
              alt="avatar"
            />
          </div>

          <div className="flex px-2">
            <p className="text-xl font-light">
              {Object.values(userData.name[0]).slice(0, -1).join("")}
            </p>
          </div>
        </div>
      </Link>
      {/* <div>
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
      </div> */}
    </div>
  );
}

export default UserCard;
