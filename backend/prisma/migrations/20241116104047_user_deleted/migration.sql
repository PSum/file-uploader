/*
  Warnings:

  - You are about to drop the column `authorId` on the `Entry` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Entry" DROP CONSTRAINT "Entry_authorId_fkey";

-- AlterTable
ALTER TABLE "Entry" DROP COLUMN "authorId";

-- DropTable
DROP TABLE "User";
