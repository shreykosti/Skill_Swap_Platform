import { PrismaClient } from "@/lib/generated/prisma/client";
import { NextResponse, NextRequest } from "@/pages/node_modules/next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  username: z.string().min(1, "Name is required"),
});

export async function POST(request: NextRequest) {
  console.log("Sign Up API called");

  const prisma = new PrismaClient();
  const body = await request.json();

  const { email, password, username } = body;
  const validation = schema.safeParse({ email, password, username });

  if (!validation.success) {
    return NextResponse.json({ message: "wrong input value" }, { status: 201 });
  }

  try {
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
      },
    });

    console.log("User created:", newUser);

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
