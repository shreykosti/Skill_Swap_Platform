import {
  PrismaClient,
  SkillType,
  SkillLevel,
  SwapStatus,
  UserSkill,
} from "../lib/generated/prisma"; // or '@prisma/client' if default
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// --- START: FAKE DATA DEFINITIONS ---

const FIRST_NAMES = [
  "Aarav",
  "Vivaan",
  "Aditya",
  "Vihaan",
  "Arjun",
  "Sai",
  "Reyansh",
  "Ayaan",
  "Krishna",
  "Ishaan",
  "Anika",
  "Diya",
  "Saanvi",
  "Zara",
  "Kiara",
  "Myra",
  "Aadya",
  "Anvi",
  "Pari",
  "Riya",
];
const LAST_NAMES = [
  "Sharma",
  "Patel",
  "Singh",
  "Kumar",
  "Gupta",
  "Mehta",
  "Shah",
  "Joshi",
  "Reddy",
  "Verma",
];
const LOCATIONS = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Ahmedabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Jaipur",
  "Lucknow",
];

const SKILLS = [
  { name: "Python Programming", category: "tech" },
  { name: "JavaScript & React", category: "tech" },
  { name: "UI/UX Design", category: "design" },
  { name: "Digital Marketing", category: "business" },
  { name: "Content Writing", category: "creative" },
  { name: "Graphic Design (Adobe Suite)", category: "design" },
  { name: "Data Analysis with Pandas", category: "tech" },
  { name: "Public Speaking", category: "soft_skill" },
  { name: "Yoga & Wellness Instruction", category: "health" },
  { name: "Guitar Lessons (Acoustic)", category: "creative" },
  { name: "Node.js & Express", category: "tech" },
  { name: "SQL & Database Management", category: "tech" },
  { name: "Photography Basics", category: "creative" },
  { name: "Financial Planning", category: "business" },
  { name: "Advanced Excel", category: "business" },
];

// --- END: FAKE DATA DEFINITIONS ---

const getRandom = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];
const getRandomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

async function main() {
  console.log("🧹 Cleaning up the database...");
  await prisma.swapRequestSkill.deleteMany();
  await prisma.swapRequest.deleteMany();
  await prisma.userSkill.deleteMany();
  await prisma.user.deleteMany();
  await prisma.skill.deleteMany();
  console.log("✅ Database cleaned.");

  console.log(`🌱 Seeding ${SKILLS.length} skills...`);
  await prisma.skill.createMany({ data: SKILLS });
  const allSkills = await prisma.skill.findMany();
  console.log("✅ Skills seeded.");

  console.log("🌱 Seeding 50 users...");
  const createdUsers = [];
  for (let i = 0; i < 50; i++) {
    const firstName = getRandom(FIRST_NAMES);
    const lastName = getRandom(LAST_NAMES);
    const username = `${firstName.toLowerCase()}${lastName.toLowerCase()}${getRandomInt(
      10,
      99
    )}`;
    const hash = await bcrypt.hash("password", 10);
    const user = await prisma.user.create({
      data: {
        email: `${username}@example.com`,
        password: hash,
        username: username,
        location: getRandom(LOCATIONS),
        bio: `Hi, I'm ${firstName}, a professional based in ${getRandom(
          LOCATIONS
        )}. Eager to learn and share skills!`,
        github: `https://github.com/${username}`,
        linkedIn: `https://linkedin.com/in/${username}`,
      },
    });
    createdUsers.push(user);
  }
  console.log("✅ Users seeded.");

  console.log("🌱 Seeding user skills...");
  // highlight-start
  // CHANGED: Using the imported UserSkill type for better type safety
  const userSkillsMap = new Map<
    string,
    { offered: UserSkill[]; wanted: UserSkill[] }
  >();
  // highlight-end
  for (const user of createdUsers) {
    userSkillsMap.set(user.id, { offered: [], wanted: [] });
    const skillsToOfferCount = getRandomInt(2, 4);
    const skillsToWantCount = getRandomInt(1, 3);
    const assignedSkills = new Set<string>();

    for (let i = 0; i < skillsToOfferCount; i++) {
      let skill = getRandom(allSkills);
      while (assignedSkills.has(skill.id)) {
        skill = getRandom(allSkills);
      }
      assignedSkills.add(skill.id);
      const userSkill = await prisma.userSkill.create({
        data: {
          userId: user.id,
          skillId: skill.id,
          type: SkillType.OFFERED,
          level: getRandom([
            SkillLevel.INTERMEDIATE,
            SkillLevel.ADVANCED,
            SkillLevel.EXPERT,
          ]),
          description: `I have solid experience in ${skill.name} and can teach practical applications.`,
        },
      });
      userSkillsMap.get(user.id)!.offered.push(userSkill);
    }

    for (let i = 0; i < skillsToWantCount; i++) {
      let skill = getRandom(allSkills);
      while (assignedSkills.has(skill.id)) {
        skill = getRandom(allSkills);
      }
      assignedSkills.add(skill.id);
      await prisma.userSkill.create({
        data: {
          userId: user.id,
          skillId: skill.id,
          type: SkillType.WANTED,
          level: getRandom([SkillLevel.BEGINNER, SkillLevel.INTERMEDIATE]),
          description: `I'm really interested in learning ${skill.name} from scratch.`,
        },
      });
    }
  }
  console.log("✅ User skills seeded.");

  // in prisma/seed.ts

  console.log("🌱 Seeding swap requests...");
  for (const requester of createdUsers) {
    const swapsToCreate = getRandomInt(5, 8);

    // highlight-start
    // CHANGED: Keep track of responders used for THIS requester to ensure uniqueness
    const usedResponderIds = new Set<string>();
    usedResponderIds.add(requester.id); // A user can't swap with themselves
    // highlight-end

    for (let i = 0; i < swapsToCreate; i++) {
      let responder = getRandom(createdUsers);

      // highlight-start
      // CHANGED: Keep picking until we find a responder that hasn't been used yet
      while (usedResponderIds.has(responder.id)) {
        responder = getRandom(createdUsers);
      }
      // Mark this responder as used for the current requester
      usedResponderIds.add(responder.id);
      // highlight-end

      const requesterSkills = userSkillsMap.get(requester.id);
      const responderSkills = userSkillsMap.get(responder.id);

      if (
        !requesterSkills ||
        !responderSkills ||
        requesterSkills.offered.length === 0 ||
        responderSkills.offered.length === 0
      ) {
        continue;
      }

      const requesterOfferedSkill = getRandom(requesterSkills.offered);
      const responderOfferedSkill = getRandom(responderSkills.offered);

      const reqSkillDetails = await prisma.skill.findUnique({
        where: { id: requesterOfferedSkill.skillId },
      });
      const resSkillDetails = await prisma.skill.findUnique({
        where: { id: responderOfferedSkill.skillId },
      });

      if (!reqSkillDetails || !resSkillDetails) continue;

      await prisma.swapRequest.create({
        data: {
          requesterId: requester.id,
          responderId: responder.id,
          message: `Hi ${responder.username}! I'd love to trade my ${reqSkillDetails.name} skill for your knowledge in ${resSkillDetails.name}.`,
          status: getRandom([
            SwapStatus.PENDING,
            SwapStatus.ACCEPTED,
            SwapStatus.COMPLETED,
            SwapStatus.DECLINED,
          ]),
          skills: {
            create: [
              {
                userSkillId: requesterOfferedSkill.id,
                type: SkillType.OFFERED,
              },
              { userSkillId: responderOfferedSkill.id, type: SkillType.WANTED },
            ],
          },
        },
      });
    }
  }
  console.log("✅ Swap requests seeded.");
}

main()
  .catch((e) => {
    console.error("An error occurred while seeding the database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
