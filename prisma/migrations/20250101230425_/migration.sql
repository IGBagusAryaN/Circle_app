/*
  Warnings:

  - You are about to drop the column `replyId` on the `Like` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Reply` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `Reply` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `Reply` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Reply` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Thread` table. All the data in the column will be lost.
  - Made the column `threadId` on table `Like` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updateAt` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `Reply` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `Thread` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_replyId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_threadId_fkey";

-- DropForeignKey
ALTER TABLE "Reply" DROP CONSTRAINT "Reply_profileId_fkey";

-- AlterTable
ALTER TABLE "Like" DROP COLUMN "replyId",
ALTER COLUMN "threadId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "updatedAt",
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Reply" DROP COLUMN "image",
DROP COLUMN "isDeleted",
DROP COLUMN "profileId",
DROP COLUMN "updatedAt",
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Thread" DROP COLUMN "updatedAt",
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "Thread"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
