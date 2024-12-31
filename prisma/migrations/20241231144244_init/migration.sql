/*
  Warnings:

  - Added the required column `title` to the `NotesEntry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NotesEntry" ADD COLUMN     "title" TEXT NOT NULL;
