import { NextResponse } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/lib/auth";
import { PrismaClient } from "@/lib/generated/prisma/client";

const prisma = new PrismaClient();
const schema = z.object({
  availability: z.string().min(1, "Availability is required"),
});

export async function POST(req: NextResponse) {
  try {
    const session = await getServerSession(NEXT_AUTH);
    const id = session?.user?.id;

    const authCheck = await prisma.user.findUnique({
      where: { id: id || "xx" },
    });

    if (!authCheck) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 201 });
    }

    const body = await req.json();
    const parsedData = schema.safeParse(body);
    if (!parsedData.success) {
      return NextResponse.json(
        { message: "Invalid Availability" },
        { status: 201 }
      );
    }

    if (
      body.availability == "" ||
      body.availability == null ||
      body.availability == undefined ||
      body.availability == session.user?.availability
    ) {
      return NextResponse.json(
        { message: "Availability is not invalid or same" },
        { status: 201 }
      );
    }

    const update = await prisma.user.update({
      where: { id: id || "" },
      data: {
        availability: body.availability,
      },
    });

    if (!update) {
      return NextResponse.json(
        { message: "Failed to update availability" },
        { status: 201 }
      );
    }

    return NextResponse.json(
      { message: "availability updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error updating user availability:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
