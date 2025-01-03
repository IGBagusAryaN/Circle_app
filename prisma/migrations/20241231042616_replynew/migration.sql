/*
  Warnings:

  - Added the required column `replyId` to the `Like` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileId` to the `Reply` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Like" ADD COLUMN     "replyId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Reply" ADD COLUMN     "image" TEXT,
ADD COLUMN     "isDeleted" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "profileId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_replyId_fkey" FOREIGN KEY ("replyId") REFERENCES "Reply"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
