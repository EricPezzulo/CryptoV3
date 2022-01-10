import AddIcon from "@mui/icons-material/Add";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export async function getServerSideProps(context) {
  const res = await fetch(
    `http://localhost:5000/api/users/${context.query.id}`
  );
  const userData = await res.json();
  const posts = await fetch(`http://localhost:5000/api/posts`);
  const userPosts = await posts.json();
  const { id } = context.query;
  return {
    props: { id, userData },
  };
}

function UserCard({ userData, name, id }) {
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
        url: `http://localhost:5000/api/users/${session?.id}/unfollow`,
        method: "PUT",
        data: {
          followingUser: {
            userID: id,
          },
          currentUser: {
            userID: session?.id,
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
        url: `http://localhost:5000/api/users/${session?.id}/follow`,
        method: "PUT",
        data: {
          followingUser: {
            userID: id,
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
    <Link href={`/users/${userData._id}`}>
      <div className="flex px-2 h-14 w-full bg-Jet-Gray hover:bg-Davys-Gray duration-150 ease-in-out rounded-lg justify-between items-center ">
        <div className="flex items-center justify-center">
          <div className="flex rounded-full border-2 border-gray-600">
            <Image
              className="flex rounded-full cursor-pointer"
              src={userData.image}
              width={45}
              height={45}
              alt="avatar"
            />
          </div>

          <div className="flex px-2">
            <p className="text-xl text-white font-light">{name}</p>
          </div>
        </div>

        <div>
          {following && (
            <HighlightOffIcon className="text-white cursor-pointer" />
          )}
          {!following && <AddIcon className="text-white cursor-pointer" />}
        </div>
      </div>
    </Link>
  );
}

export default UserCard;
