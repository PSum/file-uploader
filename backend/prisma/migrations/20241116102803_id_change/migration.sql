/*
  Warnings:

  - The primary key for the `Entry` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Entry` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `parentId` column on the `Entry` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "Entry" DROP CONSTRAINT "Entry_parentId_fkey";

-- AlterTable
ALTER TABLE "Entry" DROP CONSTRAINT "Entry_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "parentId",
ADD COLUMN     "parentId" INTEGER,
ADD CONSTRAINT "Entry_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Entry"("id") ON DELETE SET NULL ON UPDATE CASCADE;
