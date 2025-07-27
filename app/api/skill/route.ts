import { PrismaClient } from "@/lib/generated/prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();
export async function GET() {
  const users = await prisma.user.findMany({
    // 1. Only fetch users who have set their profile to public
    where: {
      public: true,
    },
    // 2. Select the specific user fields you need to display
    select: {
      id: true,
      username: true,
      location: true,
      averageRating: true,
      avaTime: true,
      bio: true,
      // 3. Include the list of associated skills for each user
      skills: {
        select: {
          type: true, // 'OFFERED' or 'WANTED'
          level: true, // 'BEGINNER', 'INTERMEDIATE', etc.
          description: true,
          // 4. Also include the actual skill's name
          skill: {
            select: {
              name: true,
              id: true, // Include skill ID if needed
            },
          },
        },
      },
    },
  });
  return NextResponse.json(users);
}
