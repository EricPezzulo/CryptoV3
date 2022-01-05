import { AnimatePresence, motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
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
      height: "124px",
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
    <div className="flex w-full z-100 items-center bg-Eerie-Black-dark h-12">
      <div className="flex w-full items-center justify-between mx-2">
        <Link href="/">
          <h1 className="text-white text-2xl font-thin hover:cursor-pointer">
            TheCitadel
          </h1>
        </Link>
        <div className="flex">
          {session && (
            <div className="flex">
              <Image
                className="flex rounded-full hover:cursor-pointer"
                src={session?.user?.image}
                width={40}
                height={40}
                onClick={() => setOpenMenu(!openMenu)}
              />
              <AnimatePresence>
                {openMenu && (
                  <motion.div
                    className="flex flex-col z-0 absolute right-0 top-12 border border-Davys-Gray-light bg-Davys-Gray-light rounded-bl shadow-xl text-white font-light"
                    variants={menuVarient}
                    initial="hidden"
                    animate="visable"
                    exit="exit"
                  >
                    <Link href={`/users/myprofile`}>
                      <p className="flex cursor-pointer border-b border-Davys-Gray hover:bg-Davys-Gray duration-150 px-5 py-2">
                        My Profile
                      </p>
                    </Link>

                    <Link href={`/feed`}>
                      <p className="flex cursor-pointer border-b border-Davys-Gray hover:bg-Davys-Gray duration-150 px-5 py-2">
                        Feed
                      </p>
                    </Link>

                    <p
                      className="flex cursor-pointer  hover:bg-Davys-Gray duration-150 px-5 py-2"
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
