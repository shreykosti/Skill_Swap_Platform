"use server";

import { PrismaClient } from "@/lib/generated/prisma/client";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/lib/auth";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function deleteSkillAction(formData: FormData) {
  const session = await getServerSession(NEXT_AUTH);
  const user = session?.user;

  const getid = formData.get("id") as string;
  const id = parseInt(getid, 10);

  if (!user?.email) return;

  await prisma.skill.delete({
    where: {
      id,
      email: user.email, // Ensures user owns the skill
    },
  });

  revalidatePath("/f/user/profile"); // Replace with actual path
}
