import { NextResponse } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/lib/auth";
import { PrismaClient } from "@/lib/generated/prisma/client";

const prisma = new PrismaClient();
const schema = z.object({
  name: z.string().min(1, "Name is required"),
});

export async function POST(req: NextResponse) {
  try {
    const session = await getServerSession(NEXT_AUTH);
    const id = session?.user?.id;

    const authCheck = await prisma.user.findUnique({
      where: { id: session?.user?.id || "" },
    });

    if (!authCheck) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 201 });
    }

    const body = await req.json();
    const parsedData = schema.safeParse(body);
    if (!parsedData.success) {
      return NextResponse.json({ message: "Invalid Name" }, { status: 201 });
    }

    if (
      body.name == "" ||
      body.name == null ||
      body.name == undefined ||
      body.name == session.user?.name
    ) {
      return NextResponse.json(
        { message: "Name is not invalid or same" },
        { status: 201 }
      );
    }

    const nameCheck = await prisma.user.findUnique({
      where: { name: body.name },
    });

    if (nameCheck) {
      return NextResponse.json(
        { message: "Username already exists" },
        { status: 201 }
      );
    }

    const update = await prisma.user.update({
      where: { id: id || "" },
      data: {
        name: body.name,
      },
    });

    if (!update) {
      return NextResponse.json(
        { message: "Failed to update name" },
        { status: 201 }
      );
    }

    return NextResponse.json(
      { message: "Name updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error updating user name:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
