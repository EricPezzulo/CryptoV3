import AddIcon from "@mui/icons-material/Add";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const res = await fetch(
    `http://localhost:5000/api/users/${context.query.id}`
  );
  const userData = await res.json();
  const { id } = context.query;
  return {
    props: { id, userData },
  };
}

function UserCard({ userData, name, userID }) {
  const router = useRouter();
  const [following, setFollowing] = useState(null);
  const { data: session } = useSession();
  const refreshData = () => {
    router.replace(router.asPath);
  };

  const isFollowing = () => {
    const user = userData?.followers.find((i) => i.userID === session?.id);
    if (user) {
      setFollowing(true);
    } else {
      setFollowing(false);
    }
  };

  useEffect(() => {
    isFollowing();
  });
  const unfollow = async () => {
    try {
      const res = await axios({
        url: `http://localhost:5000/api/users/${userData?._id}/unfollow`,
        method: "PUT",
        data: {
          followingUser: {
            userID: userID,
            image: userData.image,
          },
          currentUser: {
            userID: session?.id,
            image: session?.user?.image,
          },
        },
      });
      refreshData();
    } catch (error) {
      console.log(error);
    }
  };
  const follow = async () => {
    try {
      const res = await axios({
        url: `http://localhost:5000/api/users/${userData?._id}/follow`,
        method: "PUT",
        data: {
          followingUser: {
            userID: userID,
            image: userData.image,
          },
          currentUser: {
            userID: session?.id,
            image: session?.user?.image,
          },
        },
      });
      refreshData();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="group flex px-2 h-auto py-1 w-full bg-Jet-Gray hover:bg-Davys-Gray duration-150 ease-in-out rounded-lg justify-between items-center ">
      <div
        onClick={() => router.push(`/users/${userData._id}`)}
        className="flex items-center justify-center"
      >
        <div className="group-hover:border-gray-300 flex rounded-full border-2 border-gray-600 hover:border-2">
          <Image
            className="flex rounded-full cursor-pointer"
            src={userData.image}
            width={45}
            height={45}
            alt="avatar"
          />
        </div>

        <div className="flex px-2">
          <p className="text-xl text-white font-light cursor-pointer">{name}</p>
        </div>
      </div>

      <div>
        {following && (
          <HighlightOffIcon
            onClick={unfollow}
            className="invisible group-hover:visible text-white cursor-pointer"
          />
        )}
        {!following && (
          <AddIcon
            onClick={follow}
            className="invisible group-hover:visible text-white cursor-pointer"
          />
        )}
      </div>
    </div>
  );
}

export default UserCard;
