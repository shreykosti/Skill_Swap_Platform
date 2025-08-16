import { PrismaClient } from "@/lib/generated/prisma/client";
import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  username: z.string().min(1, "Name is required"),
  location: z.string().min(1, "Location is required"),
  bio: z.string().min(1, "Bio is required"),
  ispublic: z.boolean(),
  avaTime: z.string().min(1, "Available time is required"),
  linkedIn: z.string().url().optional(),
  github: z.string().url().optional(),
  x: z.string().url().optional(),
  website: z.string().url().optional(),
});

export async function POST(request: NextRequest) {
  try {
    console.log("Sign Up API called");

    const prisma = new PrismaClient();
    const body = await request.json();

    const validation = schema.safeParse(body);
    const {
      email,
      password,
      username,
      location,
      bio,
      ispublic,
      avaTime,
      linkedIn,
      github,
      x,
      website,
    } = body;

    if (!validation.success) {
      return NextResponse.json(
        { message: "wrong input value" },
        { status: 201 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    const existingname = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 201 }
      );
    }

    if (existingname) {
      return NextResponse.json(
        { message: "Name already exists" },
        { status: 201 }
      );
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hash,
        username,
        location,
        bio,
        public: ispublic,
        avaTime,
        linkedIn,
        github,
        twitter: x,
        website,
      },
    });

    if (!newUser) {
      return NextResponse.json(
        { message: "User creation failed" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
