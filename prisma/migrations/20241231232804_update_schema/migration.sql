-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_threadId_fkey";

-- AlterTable
ALTER TABLE "Like" ALTER COLUMN "threadId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "updateAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "Thread"("id") ON DELETE SET NULL ON UPDATE CASCADE;
