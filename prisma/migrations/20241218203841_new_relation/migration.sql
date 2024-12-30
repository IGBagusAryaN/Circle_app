/*
  Warnings:

  - You are about to drop the column `threadId` on the `Profile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_threadId_fkey";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "threadId";

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");
