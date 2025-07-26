// import { PrismaClient } from "@/lib/generated/prisma/client";
// import { NextResponse } from "next/server";
// const prisma = new PrismaClient();
// export async function GET() {
//   const offeredSkills = await prisma.user.findMany({
//     where: {
//       profileStatus: true,
//     },
//     include: {
//       skills: true,
//     },
//   });

//   const data = offeredSkills.map((user) => {
//     return {
//       id: user.id,
//       name: user.name,
//       location: user.location,
//       availability: user.availability,
//       skills: user.skills.map((skill) => ({
//         id: skill.id,
//         name: skill.skillname,
//         level: skill.skillLevel,
//         skillType: skill.skillType,
//       })),
//     };
//   });

//   return NextResponse.json(data);
// }
