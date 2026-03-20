/*
  Warnings:

  - You are about to drop the column `media` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `mediaType` on the `Message` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Message" DROP COLUMN "media",
DROP COLUMN "mediaType";
