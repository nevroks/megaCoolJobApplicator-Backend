-- CreateTable
CREATE TABLE "DetailedVacancies" (
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

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "refreshToken" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DetailedVacancies_id_key" ON "DetailedVacancies"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
