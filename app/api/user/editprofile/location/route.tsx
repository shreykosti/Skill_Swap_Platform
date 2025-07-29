import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/lib/auth";
import { PrismaClient } from "@/lib/generated/prisma/client";

const schema = z.object({
  location: z.string().min(1, "Location is required"),
});

export async function POST(req: NextRequest) {
  try {
    const prisma = new PrismaClient();
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
        { message: "Invalid Input" },
        { status: 201 }
      );
    }

    if (
      body.location == "" ||
      body.location == null ||
      body.location == undefined ||
      body.location == session?.user?.location
    ) {
      return NextResponse.json(
        { message: "Location is not valid or same" },
        { status: 201 }
      );
    }

    const update = await prisma.user.update({
      where: { id: id || "" },
      data: {
        location: body.location,
      },
    });

    if (!update) {
      return NextResponse.json(
        { message: "Failed to update location" },
        { status: 201 }
      );
    }

    return NextResponse.json(
      { message: "location updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error updating user location:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
