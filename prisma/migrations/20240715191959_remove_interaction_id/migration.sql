/*
  Warnings:

  - The primary key for the `interactions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `interactions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "interactions" DROP CONSTRAINT "interactions_pkey",
DROP COLUMN "id";
