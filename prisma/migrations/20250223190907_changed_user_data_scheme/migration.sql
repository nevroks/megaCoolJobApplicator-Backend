/*
  Warnings:

  - The primary key for the `UsersData` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UsersData` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `UsersData` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `UsersData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UsersData" DROP CONSTRAINT "UsersData_pkey",
DROP COLUMN "id",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UsersData_userId_key" ON "UsersData"("userId");
