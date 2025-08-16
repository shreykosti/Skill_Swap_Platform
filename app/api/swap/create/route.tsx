import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/lib/auth";
import { PrismaClient, SkillType } from "@/lib/generated/prisma/client";

export async function POST(req: NextRequest) {
  try {
    console.log("in swap request route");
    const session = await getServerSession(NEXT_AUTH);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 201 });
    }

    const prisma = new PrismaClient();

    const body = await req.json();
    console.log("Request body:", body);

    const schema = z.object({
      responderId: z.string().cuid(),
      message: z.string().max(500).optional(),
      skills: z.array(
        z.object({
          id: z.string().cuid(),
          type: z.enum([SkillType.OFFERED, SkillType.WANTED]),
        })
      ),
    });

    const result = schema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ message: "Invalid Input" }, { status: 201 });
    }

    const skillsToCreate = body.skills.map(
      (skill: { id: string; type: SkillType }) => ({
        userSkillId: skill.id, // Map the 'id' from the request to 'userSkillId'
        type: skill.type, // The 'type' (OFFERED/WANTED) maps directly
      })
    );

    const newSwapRequest = await prisma.swapRequest.create({
      data: {
        // --- Core Swap Request Info ---
        requesterId: session.user.id, // The ID of the user sending the request
        responderId: body.responderId, // The ID of the user receiving the request
        message: body.message || " ", // The introductory message for the swap

        // --- Nested Write to Create the Links to Skills ---
        // This 'skills' relation connects to the SwapRequestSkill model
        skills: {
          create: skillsToCreate,
        },
      },
      // Include the created skills in the response for confirmation
      include: {
        skills: true,
      },
    });

    if (newSwapRequest) {
      return NextResponse.json(
        { message: "Request created successfully" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error creating swap request:", error);
    return NextResponse.json(
      { error: "Failed to create swap request" },
      { status: 500 }
    );
  }
}
