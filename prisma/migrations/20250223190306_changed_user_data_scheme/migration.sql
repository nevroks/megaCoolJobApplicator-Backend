-- AlterTable
CREATE SEQUENCE usersdata_id_seq;
ALTER TABLE "UsersData" ALTER COLUMN "id" SET DEFAULT nextval('usersdata_id_seq'),
ADD CONSTRAINT "UsersData_pkey" PRIMARY KEY ("id");
ALTER SEQUENCE usersdata_id_seq OWNED BY "UsersData"."id";

-- DropIndex
DROP INDEX "UsersData_id_key";
