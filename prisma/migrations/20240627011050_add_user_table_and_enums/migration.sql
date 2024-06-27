/*
  Warnings:

  - You are about to drop the column `languageId` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the `BookGenre` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Genre` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Language` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `language` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Language" AS ENUM ('PORTUGUESE', 'ENGLISH');

-- CreateEnum
CREATE TYPE "Genre" AS ENUM ('ROMANCE', 'FANFIC', 'BUSINESS', 'ADVENTURE', 'HORROR', 'RELIGION', 'HISTORY', 'SELF_HELP', 'CLASSIC', 'BIOGRAPHY');

-- CreateEnum
CREATE TYPE "InteractionType" AS ENUM ('SAVED', 'DOWNLOADED', 'READING', 'READ');

-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_languageId_fkey";

-- DropForeignKey
ALTER TABLE "BookGenre" DROP CONSTRAINT "BookGenre_bookId_fkey";

-- DropForeignKey
ALTER TABLE "BookGenre" DROP CONSTRAINT "BookGenre_genreId_fkey";

-- AlterTable
ALTER TABLE "Author" ADD COLUMN     "avatarUrl" TEXT;

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "languageId",
ADD COLUMN     "genres" "Genre"[],
ADD COLUMN     "language" "Language" NOT NULL;

-- DropTable
DROP TABLE "BookGenre";

-- DropTable
DROP TABLE "Genre";

-- DropTable
DROP TABLE "Language";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserBookInteraction" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,
    "interactionType" "InteractionType" NOT NULL,

    CONSTRAINT "UserBookInteraction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE INDEX "UserBookInteraction_userId_idx" ON "UserBookInteraction"("userId");

-- CreateIndex
CREATE INDEX "UserBookInteraction_bookId_idx" ON "UserBookInteraction"("bookId");

-- CreateIndex
CREATE UNIQUE INDEX "UserBookInteraction_userId_bookId_interactionType_key" ON "UserBookInteraction"("userId", "bookId", "interactionType");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBookInteraction" ADD CONSTRAINT "UserBookInteraction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBookInteraction" ADD CONSTRAINT "UserBookInteraction_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;
