/*
  Warnings:

  - A unique constraint covering the columns `[title,language]` on the table `books` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "books_title_language_key" ON "books"("title", "language");
