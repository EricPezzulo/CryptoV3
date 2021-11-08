import { useSession } from "next-auth/react";
import Link from "next/link";

function Header() {
  const { data: session } = useSession();

  return (
    <div className="flex w-full items-center bg-gradient-to-r from-red-500 to-purple-400 h-12">
      <div className="flex w-full items-center justify-between mx-2">
        <Link href="/">
          <h1 className="text-white text-2xl font-thin hover:cursor-pointer">
            TheCitadel
          </h1>
        </Link>
        <div className="flex">
          {session && (
            <div className="flex h-10 w-10">
              <Link href={`/users/${session._id}`}>
                <img
                  className="flex rounded-full hover:cursor-pointer hover:scale-105 duration-200"
                  src={session?.user?.image}
                />
              </Link>
            </div>
          )}
          {!session && (
            <div>
              <Link href="/auth/signin">
                <div className="bg-blue-500 py-1 px-2 rounded-md hover:cursor-pointer hover:bg-blue-600 duration-150">
                  <p className="text-white">Sign In</p>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
