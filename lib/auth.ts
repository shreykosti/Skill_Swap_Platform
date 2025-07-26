import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@/lib/generated/prisma/client";
import zod from "zod";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const userschema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6, "Password must be at least 6 characters"),
});

export const NEXT_AUTH = {
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
        const { email, password } = credentials || {};

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
          email,
          username: user.username,
          location: user.location,
          availability: user.avaTime,
          public: user.public,
          bio: user.bio,
          averageRating: user.averageRating,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    jwt: async ({ token, user, trigger, session }: any) => {
      if (user) {
        // Initial sign in
        token.username = user.username;
        token.email = user.email;
        const u = user as any;
        token.location = u.location;
        token.avaTime = u.avaTime;
        token.public = u.public;
        token.bio = u.bio;
        token.averageRating = u.averageRating;
      }
      // 👇 This handles updates from `update()` on the client
      if (trigger === "update") {
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
    session: ({ session, token }: any) => {
      session.user.id = token.sub;
      session.user.username = token.username;
      session.user.email = token.email;
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
