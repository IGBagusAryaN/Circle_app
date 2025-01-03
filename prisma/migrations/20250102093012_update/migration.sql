/*
  Warnings:

  - You are about to drop the column `profileId` on the `Thread` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Thread" DROP CONSTRAINT "Thread_profileId_fkey";

-- AlterTable
ALTER TABLE "Thread" DROP COLUMN "profileId";
