-- CreateTable
CREATE TABLE "LessonTest" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "offer" TEXT NOT NULL,
    "instead" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LessonTest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LessonTest_title_key" ON "LessonTest"("title");
