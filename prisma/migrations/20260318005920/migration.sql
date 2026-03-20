/*
  Warnings:

  - Made the column `content` on table `Message` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "isEdited" BOOLEAN,
ALTER COLUMN "content" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "location" TEXT;
