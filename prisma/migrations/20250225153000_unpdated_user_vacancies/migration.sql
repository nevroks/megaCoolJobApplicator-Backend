/*
  Warnings:

  - Changed the type of `id` on the `DetailedDBVacancies` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "DetailedDBVacancies" DROP COLUMN "id",
ADD COLUMN     "id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "DetailedDBVacancies_id_key" ON "DetailedDBVacancies"("id");
