/*
  Warnings:

  - You are about to drop the column `email` on the `Skill` table. All the data in the column will be lost.
  - You are about to drop the column `skillDescription` on the `Skill` table. All the data in the column will be lost.
  - You are about to drop the column `skillLevel` on the `Skill` table. All the data in the column will be lost.
  - You are about to drop the column `skillType` on the `Skill` table. All the data in the column will be lost.
  - You are about to drop the column `skillname` on the `Skill` table. All the data in the column will be lost.
  - You are about to drop the column `availability` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `hashpassword` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `profileStatus` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Skill` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Skill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SkillLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT');

-- DropForeignKey
ALTER TABLE "Skill" DROP CONSTRAINT "Skill_email_fkey";

-- DropIndex
DROP INDEX "User_name_key";

-- AlterTable
ALTER TABLE "Skill" DROP COLUMN "email",
DROP COLUMN "skillDescription",
DROP COLUMN "skillLevel",
DROP COLUMN "skillType",
DROP COLUMN "skillname",
ADD COLUMN     "category" TEXT DEFAULT 'tech',
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "availability",
DROP COLUMN "hashpassword",
DROP COLUMN "name",
DROP COLUMN "profileStatus",
ADD COLUMN     "averageRating" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "username" TEXT;

-- CreateTable
CREATE TABLE "UserSkill" (
    "userId" TEXT NOT NULL,
    "skillId" INTEGER NOT NULL,
    "type" "SkillType" NOT NULL,
    "level" "SkillLevel",
    "description" TEXT,

    CONSTRAINT "UserSkill_pkey" PRIMARY KEY ("userId","skillId","type")
);

-- CreateIndex
CREATE UNIQUE INDEX "Skill_name_key" ON "Skill"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "UserSkill" ADD CONSTRAINT "UserSkill_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSkill" ADD CONSTRAINT "UserSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;
