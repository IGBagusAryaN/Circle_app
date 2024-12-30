/*
  Warnings:

  - Added the required column `threadId` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Profile_userId_key";

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "threadId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "Thread"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
