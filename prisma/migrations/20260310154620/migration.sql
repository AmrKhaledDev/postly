/*
  Warnings:

  - You are about to drop the column `StoryBg` on the `Story` table. All the data in the column will be lost.
  - The `mediaType` column on the `Story` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Story" DROP COLUMN "StoryBg",
ADD COLUMN     "storyBg" TEXT,
DROP COLUMN "mediaType",
ADD COLUMN     "mediaType" TEXT;

-- DropEnum
DROP TYPE "MEDIA";
