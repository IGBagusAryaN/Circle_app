/*
  Warnings:

  - A unique constraint covering the columns `[userId,threadId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Like_threadId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Like_userId_threadId_key" ON "Like"("userId", "threadId");
