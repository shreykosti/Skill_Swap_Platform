/*
  Warnings:

  - Changed the type of `type` on the `SwapRequestSkill` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "SwapRequestSkill" DROP COLUMN "type",
ADD COLUMN     "type" "SkillType" NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "github" TEXT DEFAULT '',
ADD COLUMN     "linkedIn" TEXT DEFAULT '',
ADD COLUMN     "twitter" TEXT DEFAULT '',
ADD COLUMN     "website" TEXT DEFAULT '';

-- DropEnum
DROP TYPE "SwapSkillType";
