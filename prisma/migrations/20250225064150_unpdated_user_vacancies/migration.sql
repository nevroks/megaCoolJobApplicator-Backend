/*
  Warnings:

  - A unique constraint covering the columns `[vacancyId]` on the table `UsersVacancies` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "UsersVacancies_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "UsersVacancies_vacancyId_key" ON "UsersVacancies"("vacancyId");

-- AddForeignKey
ALTER TABLE "UsersVacancies" ADD CONSTRAINT "UsersVacancies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UsersData"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
