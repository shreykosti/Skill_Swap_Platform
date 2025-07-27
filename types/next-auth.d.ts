import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      email: string;
      location: string;
      avaTime: string;
      public: boolean;
      bio: string;
      averageRating: number;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    username: string;
    location: string;
    avaTime: string;
    public: boolean;
    bio: string;
    averageRating: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id?: string;
    username: string;
    email: string;
    location: string;
    avaTime: string;
    public: boolean;
    bio: string;
    averageRating: number;
  }
}
