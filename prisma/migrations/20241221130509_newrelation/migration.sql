/*
  Warnings:

  - You are about to drop the column `threadId` on the `Profile` table. All the data in the column will be lost.
  - Added the required column `profileId` to the `Thread` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_threadId_fkey";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "threadId";

-- AlterTable
ALTER TABLE "Thread" ADD COLUMN     "profileId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Thread" ADD CONSTRAINT "Thread_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
