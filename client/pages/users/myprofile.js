import { useEffect, useState } from "react";
import useSWR from "swr";
import axios from "axios";
import WatchlistContainer from "../../components/WatchlistContainer";
import Header from "../../components/Header";
import FriendsDock from "../../components/FriendsDock";
import { useSession } from "next-auth/react";
import MyProfilePosts from "../../components/MyProfilePosts";

function myprofile() {
  const { data: session } = useSession();

  if (!session)
    return (
      <div className="bg-Eerie-Black min-h-screen">
        <Header />
        <div className="flex h-full items-center w-full">
          <div className="flex rounded-full object-contain w-32 h-32 m-5 p-1 drop-shadow-2xl border bg-Davys-Gray animate-pulse border-gray-300" />
          <div className="flex h-full items-center justify-center ml-2 pt-2 sm:pt-0">
            {/* <FriendsDock sessionID={session?.id} /> */}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row">
          <div className="flex w-full h-full justify-center">
            <div className="flex-col items-center justify-center w-full h-full mx-10 px-2 my-2 rounded animate-pulse bg-Jet-Gray">
              <div className="flex-col h-full w-full items-center justify-center">
                <div className="flex w-full h-12 bg-Davys-Gray my-2 rounded"></div>
                <div className="flex w-full h-12 bg-Davys-Gray my-2 rounded"></div>
                <div className="flex w-full h-12 bg-Davys-Gray my-2 rounded"></div>
                <div className="flex w-full h-12 bg-Davys-Gray my-2 rounded"></div>
              </div>
            </div>
          </div>
          <div className="hidden sm:flex w-full h-full justify-center">
            <div className="flex-col items-center justify-center w-full h-full mx-10 px-2 my-2 rounded animate-pulse bg-Jet-Gray">
              <div className="flex-col h-full w-full items-center justify-center">
                <div className="flex w-full h-12 bg-Davys-Gray my-2 rounded"></div>
                <div className="flex w-full h-12 bg-Davys-Gray my-2 rounded"></div>
                <div className="flex w-full h-12 bg-Davys-Gray my-2 rounded"></div>
                <div className="flex w-full h-12 bg-Davys-Gray my-2 rounded"></div>
              </div>
            </div>
          </div>
          <div className="hidden sm:flex w-full h-full justify-center">
            <div className="flex-col items-center justify-center w-full h-full mx-10 px-2 my-2 rounded animate-pulse bg-Jet-Gray">
              <div className="flex-col h-full w-full items-center justify-center">
                <div className="flex w-full h-12 bg-Davys-Gray my-2 rounded"></div>
                <div className="flex w-full h-12 bg-Davys-Gray my-2 rounded"></div>
                <div className="flex w-full h-12 bg-Davys-Gray my-2 rounded"></div>
                <div className="flex w-full h-12 bg-Davys-Gray my-2 rounded"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full items-center">
          <h2 className="text-2xl font-thin text-white">
            My Posts (loading...)
          </h2>
          <div className=" flex w-full sm:w-3/4 md:w-2/4 sm:mt-5 sm:rounded pt-2">
            <div className="flex w-full flex-col">
              <div className="flex bg-Eerie-Black-dark flex-col w-full shadow sm:rounded items-center min-h-54 max-h-96 overflow-auto sm:p-2 sm:border-none border-t border-Davys-Gray">
                <div className="flex bg-Jet-Gray w-full justify-between p-2 sm:rounded border-Davys-Gray sm:border-none duration-100 sm:my-1">
                  <div>
                    <div className="flex w-12 h-12 rounded-full bg-Davys-Gray animate-pulse"></div>
                  </div>
                  <div className="w-full px-3">
                    <div className="flex w-full justify-between">
                      <div className="w-8 h-3 rounded bg-Davys-Gray animate-pulse"></div>
                      <div className="font-light w-16 h-3 bg-Davys-Gray rounded animate-pulse"></div>
                    </div>
                    <div className="flex w-full justify-between font-light">
                      <div className="font-light w-16 h-3 bg-Davys-Gray animate-pulse my-2 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex bg-Eerie-Black-dark flex-col w-full shadow sm:rounded items-center min-h-54 max-h-96 overflow-auto sm:p-2 sm:border-none border-t border-Davys-Gray">
                <div className="flex bg-Jet-Gray w-full justify-between p-2 sm:rounded border-Davys-Gray sm:border-none duration-100 sm:my-1">
                  <div>
                    <div className="flex w-12 h-12 rounded-full bg-Davys-Gray animate-pulse"></div>
                  </div>
                  <div className="w-full px-3">
                    <div className="flex w-full justify-between">
                      <div className="w-8 h-3 rounded bg-Davys-Gray animate-pulse"></div>
                      <div className="font-light w-16 h-3 bg-Davys-Gray rounded animate-pulse"></div>
                    </div>
                    <div className="flex w-full justify-between font-light">
                      <div className="font-light w-16 h-3 bg-Davys-Gray animate-pulse my-2 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  // const fullName = Object.values(userData.name[0]).slice(0, -1).join("");

  return (
    <div className="flex flex-col bg-Eerie-Black min-h-screen">
      <Header />
      <div className="flex h-full items-center w-full">
        <img
          src={session?.image}
          className="flex rounded-full object-contain w-32 h-32 m-5 p-1 drop-shadow-2xl border border-gray-300"
        />
        <div className="flex h-full items-center justify-center ml-2 pt-2 sm:pt-0">
          <FriendsDock
            sessionID={session?.id}
            followings={session?.following}
            followers={session?.followers}
          />
        </div>
      </div>
      <div className="flex w-full justify-center">
        <WatchlistContainer />
      </div>

      <div className="flex w-full items-center justify-center">
        <MyProfilePosts session={session} />
      </div>
    </div>
  );
}

export default myprofile;
