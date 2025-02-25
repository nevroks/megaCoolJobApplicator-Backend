-- CreateTable
CREATE TABLE "UsersVacancies" (
    "userId" INTEGER NOT NULL,
    "vacancyId" INTEGER NOT NULL,
    "interested" BOOLEAN NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UsersVacancies_userId_key" ON "UsersVacancies"("userId");
