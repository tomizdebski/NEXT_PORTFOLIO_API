-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatar" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scores" (
    "id" SERIAL NOT NULL,
    "value" INTEGER NOT NULL,
    "lessonId" INTEGER NOT NULL,

    CONSTRAINT "Scores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lessons" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "photo" TEXT,
    "video" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "instructorId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "localizationId" INTEGER NOT NULL,

    CONSTRAINT "Lessons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Localizations" (
    "id" SERIAL NOT NULL,
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "province" TEXT NOT NULL,

    CONSTRAINT "Localizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BarterLessons" (
    "id" SERIAL NOT NULL,
    "lessonId" INTEGER NOT NULL,
    "lessonExId" INTEGER NOT NULL,

    CONSTRAINT "BarterLessons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersSkills" (
    "userId" INTEGER NOT NULL,
    "skillId" INTEGER NOT NULL,

    CONSTRAINT "UsersSkills_pkey" PRIMARY KEY ("userId","skillId")
);

-- CreateTable
CREATE TABLE "Skills" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "level" INTEGER NOT NULL,

    CONSTRAINT "Skills_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Lessons_name_key" ON "Lessons"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Categories_name_key" ON "Categories"("name");

-- AddForeignKey
ALTER TABLE "Scores" ADD CONSTRAINT "Scores_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lessons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lessons" ADD CONSTRAINT "Lessons_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lessons" ADD CONSTRAINT "Lessons_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lessons" ADD CONSTRAINT "Lessons_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lessons" ADD CONSTRAINT "Lessons_localizationId_fkey" FOREIGN KEY ("localizationId") REFERENCES "Localizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BarterLessons" ADD CONSTRAINT "BarterLessons_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lessons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BarterLessons" ADD CONSTRAINT "BarterLessons_lessonExId_fkey" FOREIGN KEY ("lessonExId") REFERENCES "Lessons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersSkills" ADD CONSTRAINT "UsersSkills_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersSkills" ADD CONSTRAINT "UsersSkills_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
