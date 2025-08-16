import { PrismaClient } from "@/lib/generated/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/lib/auth";

export async function GET() {
  try {
    const prisma = new PrismaClient();
    const session = await getServerSession(NEXT_AUTH);
    const userId = session?.user?.id;
    const users = await prisma.user.findMany({
      // 1. Only fetch users who have set their profile to public
      where: {
        public: true,
        NOT: userId ? { id: userId } : undefined,
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
            id: true,
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
      orderBy: {
        updatedAt: "desc",
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
