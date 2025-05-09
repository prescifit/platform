import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    role?: "instructor" | "trainee";
  }
  
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: "instructor" | "trainee";
    } & DefaultSession["user"];
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser {
    role: "instructor" | "trainee";
  }
}
