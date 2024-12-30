/*
  Warnings:

  - You are about to drop the column `fullname` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "fullname" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "fullname";
