-- DropForeignKey
ALTER TABLE "Thread" DROP CONSTRAINT "Thread_profileId_fkey";

-- AlterTable
ALTER TABLE "Thread" ALTER COLUMN "profileId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Thread" ADD CONSTRAINT "Thread_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
