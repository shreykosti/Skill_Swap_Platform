import { NextResponse, NextRequest } from "@/pages/node_modules/next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/lib/auth";
import { PrismaClient } from "@/lib/generated/prisma/client";

const prisma = new PrismaClient();
const schema = z.object({
  public: z.boolean(),
});

export async function POST(req: NextRequest) {
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
        { message: "Invalid profileStatushi" },
        { status: 201 }
      );
    }

    if (
      body.ispublic == null ||
      body.ispublic == undefined ||
      body.ispublic == session.user?.ispublic
    ) {
      return NextResponse.json(
        { message: "profileStatus is not invalid or same" },
        { status: 201 }
      );
    }

    const update = await prisma.user.update({
      where: { id: id || "" },
      data: {
        public: body.ispublic,
      },
    });

    if (!update) {
      return NextResponse.json(
        { message: "Failed to update profileStatus" },
        { status: 201 }
      );
    }

    return NextResponse.json(
      { message: "profileStatus updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error updating user profileStatus:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
