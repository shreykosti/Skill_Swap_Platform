import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@/lib/generated/prisma/client";
import zod from "zod";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";

const prisma = new PrismaClient();

const userschema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6, "Password must be at least 6 characters"),
});

export const NEXT_AUTH: NextAuthOptions = {
  // Add your NextAuth configuration here
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "email", type: "text", placeholder: "email" },
        password: {
          label: "password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        console.log("auth");
        const { email, password } = credentials || { email: "", password: "" };

        if (!credentials) {
          console.log("No credentials provided");
          return null;
        }

        const validation = userschema.safeParse({ email, password });

        if (!validation.success) {
          console.log("Validation failed:", validation.error);
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: email || "" },
        });

        if (!user) {
          console.log("User not found");
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          password || "",
          user.password
        );

        if (!isPasswordValid) {
          console.log("Incorrect password");
          return null;
        }

        console.log("User:", user);
        return {
          id: user.id,
          email: user.email ?? "",
          username: user.username ?? "",
          location: user.location ?? "",
          avaTime: user.avaTime ?? "",
          public: user.public ?? false,
          bio: user.bio ?? "",
          averageRating: user.averageRating ?? 0,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      if (user) {
        // Initial sign in
        token.username = user.username;
        token.email = user.email ?? "";
        token.location = user.location;
        token.avaTime = user.avaTime;
        token.public = user.public;
        token.bio = user.bio;
        token.averageRating = user.averageRating;
      }
      // 👇 This handles updates from `update()` on the client
      if (trigger === "update" && session) {
        token.username = session.username ?? token.username;
        token.email = session.email ?? token.email;
        token.location = session.location ?? token.location;
        token.avaTime = session.avaTime ?? token.avaTime;
        token.public = session.public ?? token.public;
        token.bio = session.bio ?? token.bio;
        token.averageRating = session.averageRating ?? token.averageRating;
      }

      return token;
    },
    session: ({ session, token }) => {
      session.user.id = token.sub || "";
      session.user.username = token.username;
      session.user.email = token.email || "";
      session.user.location = token.location;
      session.user.avaTime = token.avaTime;
      session.user.public = token.public;
      session.user.bio = token.bio;
      session.user.averageRating = token.averageRating;
      return session;
    },
  },
  pages: {
    signIn: "/f/auth/signin",
  },
};
