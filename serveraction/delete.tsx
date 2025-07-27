"use server";

import { PrismaClient, Skill } from "@/lib/generated/prisma/client";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { SkillLevel, SkillType } from "@/lib/generated/prisma/client";

const prisma = new PrismaClient();

export async function deleteSkillAction(formData: FormData) {
  const session = await getServerSession(NEXT_AUTH);
  const user = session?.user;

  const skillId = formData.get("skillid");
  const skillType = formData.get("type");
  console.log(user?.id, skillId, skillType);

  await prisma.userSkill.delete({
    where: {
      // Use the composite key to find the exact record
      userId_skillId_type: {
        userId: user?.id || "",
        skillId: parseInt(skillId as string, 10), // Ensure skillId is an integer
        type: skillType as SkillType, // Ensure type is a valid SkillType
      },
    },
  });

  revalidatePath("/f/user/profile"); // Replace with actual path
}
