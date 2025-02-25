/*
  Warnings:

  - You are about to drop the column `salaryCurrency` on the `DetailedDBVacancies` table. All the data in the column will be lost.
  - You are about to drop the column `salaryFrom` on the `DetailedDBVacancies` table. All the data in the column will be lost.
  - You are about to drop the column `salaryTo` on the `DetailedDBVacancies` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DetailedDBVacancies" DROP COLUMN "salaryCurrency",
DROP COLUMN "salaryFrom",
DROP COLUMN "salaryTo";
