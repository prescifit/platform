import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/database/db";
import { userProfiles } from "@/database/schema/user_profiles";
import GoogleProvider from "next-auth/providers/google"; 
import { eq } from "drizzle-orm";


export const { 
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  debug: process.env.NODE_ENV === "development",
  adapter: DrizzleAdapter(db),
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" },
  trustHost: true,
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.role = token.role as "instructor" | "trainee";
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    }
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
});
