import { SkillCard } from "@/components/SkillCard";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/lib/auth";
import { PrismaClient } from "@/lib/generated/prisma/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
interface Skill {
  id: string;
  name: string;
}

interface UserSkill {
  skill: Skill;
  id: string;
  type: "OFFERED" | "WANTED";
  level: string | null;
  description: string | null;
}

interface User {
  id: string;
  username: string | null;
  location: string | null;
  avaTime: string | null;
  averageRating: number | null;
  bio: string | null;
  skills: UserSkill[] | null;
}
export default async function UserGrid() {
  const session = await getServerSession(NEXT_AUTH);
  const userId = session?.user?.id;
  const prisma = new PrismaClient();
  const skills = await prisma.user.findMany({
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

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {skills.map((user: User) => {
        const skillsOffered = (user.skills ?? [])
          .filter((s: UserSkill) => s.type === "OFFERED")
          .map((s: UserSkill) => ({
            userskillid: s.id.toString(),
            name: s.skill.name,
            description: s.description || null,
            level:
              (s.level as
                | "Beginner"
                | "Intermediate"
                | "Advanced"
                | "Expert") || "Beginner",
          }));

        const skillsWanted = (user.skills ?? [])
          .filter((s: UserSkill) => s.type === "WANTED")
          .map((s: UserSkill) => ({
            userskillid: s.id.toString(),
            description: s.description || null,
            name: s.skill.name,
            level:
              (s.level as
                | "Beginner"
                | "Intermediate"
                | "Advanced"
                | "Expert") || "Beginner",
          }));
        return (
          <SkillCard
            key={user.id}
            id={user.id}
            rating={user.averageRating || 0}
            userName={user.username || "Anonymous"}
            location={user.location || undefined}
            availability={user.avaTime || "Not specified"}
            isOnline={true}
            skillsWanted={skillsWanted}
            skillsOffered={skillsOffered}
            bio={user.bio || undefined}
          />
        );
      })}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <Card className="bg-slate-800 border-slate-700 shadow-lg rounded-xl">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          {/* User Info: Avatar + Name/Location */}
          <div className="flex items-center space-x-3">
            <Skeleton className="h-12 w-12 rounded-full border-2" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[150px] border" />
              <Skeleton className="h-4 w-[100px] border" />
            </div>
          </div>
          {/* Availability */}
          <div className="flex items-center space-x-1">
            <Skeleton className="h-4 w-4 " />
            <Skeleton className="h-4 w-[70px] " />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Skills Offered Section */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-[100px] " />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-5 w-20 rounded-md " />
            <Skeleton className="h-5 w-24 rounded-md " />
            <Skeleton className="h-5 w-16 rounded-md " />
          </div>
        </div>

        {/* Skills Wanted Section */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-[90px]" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-5 w-20 rounded-md" />
            <Skeleton className="h-5 w-28 rounded-md" />
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Skeleton className="h-9 w-full rounded-lg border" />
        </div>
      </CardContent>
    </Card>
  );
}

// A grid of skeleton cards
export function GridSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  );
}
