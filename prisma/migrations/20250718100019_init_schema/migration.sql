/*
  Warnings:

  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hashpassword` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SkillType" AS ENUM ('OFFERED', 'WANTED');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
DROP COLUMN "password",
DROP COLUMN "updatedAt",
ADD COLUMN     "availability" TEXT,
ADD COLUMN     "hashpassword" TEXT NOT NULL,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "profileStatus" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "Skill" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "skillname" TEXT NOT NULL,
    "skillType" "SkillType" NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
