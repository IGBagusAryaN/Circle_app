/*
  Warnings:

  - You are about to drop the column `updateAt` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `Reply` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `Thread` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Reply` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Reply" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Thread" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
