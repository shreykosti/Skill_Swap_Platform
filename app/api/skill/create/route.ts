import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/lib/auth";
import { PrismaClient, SkillType } from "@/lib/generated/prisma/client";

const prisma = new PrismaClient();
const schema = z.object({
  name: z.string().min(1, "Skill name is required"),
  type: z.nativeEnum(SkillType),
  level: z.string().min(1, "Skill level is required"),
  description: z.string().min(1, "Skill description is required"),
});


export async function POST(req: NextRequest) {
  const session = await getServerSession(NEXT_AUTH);
  const user = session?.user;

  const body = await req.json();

  const updatedUser = await prisma.user.update({
    // 1. Find the user to update
    where: { id: user?.id },

    // 2. The data to update
    data: {
      // We are adding to the 'skills' relation
      skills: {
        // Create a new UserSkill entry
        create: {
          type: body.type,
          level: body.level,
          description: body.description,
          // 3. Connect to a Skill or create it if it doesn't exist
          skill: {
            connectOrCreate: {
              where: { name: body.name },
              create: { name: body.name, category: "tech" }, // category is optional
            },
          },
        },
      },
    },
    // Optionally include the updated skills list in the response
    include: {
      skills: {
        include: {
          skill: true,
        },
      },
    },
  });

  return NextResponse.json({ message: "hi" }, { status: 200 });
}
