// import { PrismaClient, SkillType, SkillLevel } from "../lib/generated/prisma"; // or '@prisma/client' if default
// const prisma = new PrismaClient();

// async function seedSkills() {
//   const skills = [
//     { name: "React", category: "frontend" },
//     { name: "Node.js", category: "backend" },
//     { name: "Python", category: "language" },
//     { name: "UI/UX Design", category: "design" },
//     { name: "Django", category: "backend" },
//     { name: "JavaScript", category: "language" },
//     { name: "Machine Learning", category: "ai" },
//     { name: "Rust", category: "systems" },
//     { name: "Go", category: "backend" },
//     { name: "Figma", category: "design" },
//   ];

//   await prisma.skill.createMany({
//     data: skills,
//     skipDuplicates: true,
//   });

//   console.log("✅ Skills seeded.");
// }

// async function seedUserSkills() {
//   const users = await prisma.user.findMany();
//   const skills = await prisma.skill.findMany();

//   for (const user of users) {
//     const assignedSkills = skills
//       .sort(() => 0.5 - Math.random())
//       .slice(0, Math.floor(Math.random() * 3) + 1);

//     for (const skill of assignedSkills) {
//       const type = Math.random() < 0.5 ? SkillType.OFFERED : SkillType.WANTED;
//       const level = [
//         SkillLevel.BEGINNER,
//         SkillLevel.INTERMEDIATE,
//         SkillLevel.ADVANCED,
//       ][Math.floor(Math.random() * 3)];

//       try {
//         await prisma.userSkill.create({
//           data: {
//             userId: user.id,
//             skillId: skill.id,
//             type,
//             level,
//             description: `I ${
//               type === SkillType.OFFERED ? "can teach" : "want to learn"
//             } ${skill.name} (${level})`,
//           },
//         });
//       } catch (err) {
//         console.warn(`⚠️ Skipped duplicate skill for ${user.username}`);
//       }
//     }
//   }

//   console.log("✅ UserSkills seeded.");
// }

// async function main() {
//   await seedSkills();
//   await seedUserSkills();
// }

// main()
//   .catch((err) => {
//     console.error("❌ Error seeding:", err);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
