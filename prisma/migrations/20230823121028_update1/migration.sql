-- DropForeignKey
ALTER TABLE "Lessons" DROP CONSTRAINT "Lessons_localizationId_fkey";

-- DropForeignKey
ALTER TABLE "Lessons" DROP CONSTRAINT "Lessons_studentId_fkey";

-- AlterTable
ALTER TABLE "Lessons" ALTER COLUMN "studentId" DROP NOT NULL,
ALTER COLUMN "localizationId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Lessons" ADD CONSTRAINT "Lessons_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lessons" ADD CONSTRAINT "Lessons_localizationId_fkey" FOREIGN KEY ("localizationId") REFERENCES "Localizations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
