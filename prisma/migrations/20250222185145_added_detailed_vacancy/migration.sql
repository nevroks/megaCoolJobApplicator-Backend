/*
  Warnings:

  - You are about to drop the `DetailedVacancies` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "DetailedVacancies";

-- CreateTable
CREATE TABLE "DetailedDBVacancies" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "salary" TEXT,
    "salaryFrom" TEXT,
    "salaryTo" TEXT,
    "salaryCurrency" TEXT,
    "keySkills" TEXT NOT NULL,
    "work_schedule" TEXT NOT NULL,
    "required_experience" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "employment_form" TEXT NOT NULL,
    "area" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "DetailedDBVacancies_id_key" ON "DetailedDBVacancies"("id");
