import { AnimatePresence, motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

function Header() {
  const { data: session } = useSession();
  const [openMenu, setOpenMenu] = useState(false);

  const menuVarient = {
    hidden: {
      x: 0,
      y: 0,
      height: 0,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        mass: 0.2,
      },
    },
    visable: {
      x: 0,
      y: 0,
      height: "162px",
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        mass: 0.2,
      },
    },
    exit: {
      x: 0,
      y: 0,
      height: 0,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        mass: 0.2,
      },
    },
  };

  return (
    <div className="flex w-full z-100 items-center bg-gradient-to-r from-red-500 to-purple-400 h-12">
      <div className="flex w-full items-center justify-between mx-2">
        <Link href="/">
          <h1 className="text-white text-2xl font-thin hover:cursor-pointer">
            TheCitadel
          </h1>
        </Link>
        <div className="flex">
          {session && (
            <div className="flex flex-col h-10 w-10">
              <img
                className="flex rounded-full hover:cursor-pointer hover:scale-105 duration-200"
                src={session?.user?.image}
                onClick={() => setOpenMenu(!openMenu)}
              />
              <AnimatePresence>
                {openMenu && (
                  <motion.div
                    className="flex flex-col z-0 absolute right-0 top-12 border border-purple-200 bg-purple-100 rounded-bl shadow-xl"
                    variants={menuVarient}
                    initial="hidden"
                    animate="visable"
                    exit="exit"
                  >
                    <Link href={`/users/${session._id}`}>
                      <p className="flex cursor-pointer border-b border-gray-300 hover:bg-gray-100 duration-150 px-5 py-2">
                        My Profile
                      </p>
                    </Link>
                    <Link href={`/users/${session._id}/settings`}>
                      <p className="flex cursor-pointer border-b border-gray-300 hover:bg-gray-100 duration-150 px-5 py-2">
                        Settings
                      </p>
                    </Link>
                    <Link href={`/feed`}>
                      <p className="flex cursor-pointer border-b border-gray-300 hover:bg-gray-100 duration-150 px-5 py-2">
                        Feed
                      </p>
                    </Link>

                    <p
                      // type="button"
                      className="flex items-center justify-center h-full cursor-pointer border-gray-300 hover:bg-gray-100 duration-150 rounded-bl"
                      onClick={() =>
                        signOut({ callbackUrl: `${window.location.origin}` })
                      }
                    >
                      Sign Out
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
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
