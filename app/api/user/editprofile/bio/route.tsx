import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/lib/auth";
import { PrismaClient } from "@/lib/generated/prisma/client";

const schema = z.object({
  bio: z.string().min(1, "Bio is required"),
});

export async function POST(req: NextRequest) {
  try {
    const prisma = new PrismaClient();
    const session = await getServerSession(NEXT_AUTH);
    const id = session?.user?.id;

    const authCheck = await prisma.user.findUnique({
      where: { id: session?.user?.id || "xx" },
    });

    if (!authCheck) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 201 });
    }

    const body = await req.json();
    const parsedData = schema.safeParse(body);
    if (!parsedData.success) {
      return NextResponse.json({ message: "Invalid Bio" }, { status: 201 });
    }

    if (
      body.bio == "" ||
      body.bio == null ||
      body.bio == undefined ||
      body.bio == session.user?.bio
    ) {
      return NextResponse.json(
        { message: "Bio is not invalid or same" },
        { status: 201 }
      );
    }

    const update = await prisma.user.update({
      where: { id: id || "" },
      data: {
        bio: body.bio,
      },
    });

    if (!update) {
      return NextResponse.json(
        { message: "Failed to update bio" },
        { status: 201 }
      );
    }

    return NextResponse.json(
      { message: "bio updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error updating user bio:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
