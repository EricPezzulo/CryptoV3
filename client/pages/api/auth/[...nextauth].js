import NextAuth from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "../../../utils/mongodb";
import TwitterProvider from "next-auth/providers/twitter";
// import { useRouter } from "next/dist/client/router";
export default async function auth(req, res) {
  // const router = useRouter().push("/");
  return await NextAuth(
    req,
    res,
    {
      adapter: MongoDBAdapter({
        db: (await clientPromise).db("watchlists"),
      }),
      providers: [
        GithubProvider({
          clientId: process.env.GITHUB_ID,
          clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          authorizationUrl:
            "https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code",
        }),
        TwitterProvider({
          clientId: process.env.TWITTER_CLIENT_ID,
          clientSecret: process.env.TWITTER_CLIENT_SECRET,
        }),
      ],
      pages: { signIn: "/auth/signin" },
      callbacks: {
        async session({ session, user }) {
          session._id = user._id;
          return Promise.resolve(session);
        },
      },
      database: process.env.MONGO_URI,
    }
    // events:{async signIn(router)}
  );
}
