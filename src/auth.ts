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
  adapter: DrizzleAdapter(db),
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token }) {
        if (!token.role) {
          const user = await db.query.userProfiles.findFirst({
            where: (u, { eq }) => eq(u.userId, token.sub!),
          });
          token.role = user?.role ?? "user";
        }
        return token;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        
        // Add custom role to session
        const user = await db.query.userProfiles.findFirst({
          where: (users, { eq }) => eq(users.userId, token.sub)
        });
        
        session.user.role = user?.role || "user";
      }
      return session;
    },
  },
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
});
