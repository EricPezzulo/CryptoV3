import { useSession, signIn, signOut } from "next-auth/react";
import GitHubIcon from "@mui/icons-material/GitHub";
// import GoogleIcon from "@mui/icons-material/Google";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useRouter } from "next/router";
import Header from "../../components/Header";

export default function SignIn() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user.name} <br />{" "}
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <div className="flex flex-col w-full items-center min-h-screen">
      <Header />
      <div
        className="flex bg-gray-100 rounded
      mt-10 w-1/4 flex-col items-center justify-center"
      >
        <p className="text-2xl font-light">Sign In</p>
        <div className="flex">
          <div className="flex w-full rounded px-3 py-1">
            <div className="flex flex-col">
              <div className="flex px-2 bg-white rounded w-full items-center py-1 cursor-pointer my-1">
                <GitHubIcon
                  className="hover:cursor-pointer text-3xl hover:scale-110 hover:text-blue-600 hover:duration-100 transition-all hover:ease-in-out"
                  onClick={() =>
                    signIn("github", { callbackUrl: "http://localhost:3000" })
                  }
                />
                <p className="px-2">Login with Github</p>
              </div>
              <div className="flex px-2">
                {/* <GoogleIcon onClick={() => signIn("google")} /> */}
              </div>
              <div className="flex">
                <div className="flex px-2 bg-white rounded w-full items-center py-1 cursor-pointer my-1">
                  <TwitterIcon
                    className="hover:cursor-pointer text-3xl hover:scale-110 hover:text-blue-600 hover:duration-100 transition-all hover:ease-in-out"
                    onClick={() =>
                      signIn("twitter", {
                        callbackUrl: "http://localhost:3000",
                      })
                    }
                  />
                  <p className="px-2">Login with Twitter</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
