import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/lib/auth";
import { PrismaClient, SkillType } from "@/lib/generated/prisma/client";

export async function GET() {
  try {
    const session = await getServerSession(NEXT_AUTH);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 201 });
    }
    const prisma = new PrismaClient();
    const [outgoingSwaps, incomingSwaps] = await Promise.all([
      prisma.swapRequest.findMany({
        where: { requesterId: session.user.id },
        orderBy: { createdAt: "desc" },
        include: {
          skills: {
            include: {
              userSkill: {
                include: {
                  skill: true, // 👈 brings in skill name, category, etc.
                },
              },
            },
          },
        },
      }),
      prisma.swapRequest.findMany({
        where: { responderId: session.user.id },
        orderBy: { createdAt: "desc" },
        include: {
          skills: {
            include: {
              userSkill: {
                include: {
                  skill: true, // 👈 same here
                },
              },
            },
          },
        },
      }),
    ]);

    return NextResponse.json({ outgoingSwaps, incomingSwaps });
  } catch (error) {
    console.error("Error fetching swap requests:", error);
    return NextResponse.json(
      { error: "Failed to fetch swap requests" },
      { status: 500 }
    );
  }
}
