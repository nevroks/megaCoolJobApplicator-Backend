-- CreateTable
CREATE TABLE "UsersData" (
    "id" INTEGER NOT NULL,
    "resume" TEXT NOT NULL,
    "tags" TEXT,
    "userRequirements" TEXT,
    "coverLetterEnding" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "UsersData_id_key" ON "UsersData"("id");
