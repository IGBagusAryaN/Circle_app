/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `Follow` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `Follow` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Follow" DROP COLUMN "deletedAt",
DROP COLUMN "isDeleted";