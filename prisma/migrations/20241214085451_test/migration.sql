/*
  Warnings:

  - The `articleType` column on the `Article` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ArticleType" AS ENUM ('banner', 'topfive', 'regular');

-- AlterTable
ALTER TABLE "Article" DROP COLUMN "articleType",
ADD COLUMN     "articleType" "ArticleType" NOT NULL DEFAULT 'regular';
