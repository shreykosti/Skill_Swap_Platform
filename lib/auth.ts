import { constructNow } from "date-fns";
import CredentialsProvider from "next-auth/providers/credentials";
import { pages } from "next/dist/build/templates/app-page";
import { PrismaClient } from "@/lib/generated/prisma/client";
import zod from "zod";
import bcrypt from "bcrypt";

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

        const existingUser = await prisma.user.findUnique({
          where: { email: email || "" },
        });

        if (!existingUser) {
          console.log("User not found");
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          password || "",
          existingUser.hashpassword
        );

        if (!isPasswordValid) {
          console.log("Incorrect password");
          return null;
        }

        console.log("User:", existingUser);
        return {
          id: existingUser.id,
          email,
          name: existingUser.name,
          location: existingUser.location,
          availability: existingUser.availability,
          profileStatus: existingUser.profileStatus,
          bio: existingUser.bio,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    jwt: async ({ token, user, trigger, session }: any) => {
      if (user) {
        // Initial sign in
        token.name = user.name;
        token.email = user.email;
        const u = user as any;
        token.location = u.location;
        token.availability = u.availability;
        token.profileStatus = u.profileStatus;
        token.bio = u.bio;
      }

      // 👇 This handles updates from `update()` on the client
      if (trigger === "update") {
        token.name = session.name ?? token.name;
        token.location = session.location ?? token.location;
        token.availability = session.availability ?? token.availability;
        token.profileStatus = session.profileStatus ?? token.profileStatus;
        token.bio = session.bio ?? token.bio;
      }

      return token;
    },
    session: ({ session, token }: any) => {
      session.user.id = token.sub;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.location = token.location;
      session.user.availability = token.availability;
      session.user.profileStatus = token.profileStatus;
      session.user.bio = token.bio;
      return session;
    },
  },
  // pages: {
  //   signIn: "/f/auth/signin",
  // },
};
