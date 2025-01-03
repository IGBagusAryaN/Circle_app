-- DropForeignKey
ALTER TABLE "Reply" DROP CONSTRAINT "Reply_profileId_fkey";

-- AlterTable
ALTER TABLE "Reply" ALTER COLUMN "profileId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
