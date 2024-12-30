/*
  Warnings:

  - Made the column `profileId` on table `Thread` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Thread" DROP CONSTRAINT "Thread_profileId_fkey";

-- AlterTable
ALTER TABLE "Thread" ALTER COLUMN "profileId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Thread" ADD CONSTRAINT "Thread_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
