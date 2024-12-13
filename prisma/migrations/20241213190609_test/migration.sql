/*
  Warnings:

  - You are about to drop the column `username` on the `Author` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[authorName]` on the table `Author` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorName` to the `Author` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_authorId_fkey";

-- DropIndex
DROP INDEX "Author_username_idx";

-- DropIndex
DROP INDEX "Author_username_key";

-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "articleType" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "authorId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Author" DROP COLUMN "username",
ADD COLUMN     "authorName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Author_authorName_key" ON "Author"("authorName");

-- CreateIndex
CREATE INDEX "Author_authorName_idx" ON "Author"("authorName");

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE SET NULL ON UPDATE CASCADE;
