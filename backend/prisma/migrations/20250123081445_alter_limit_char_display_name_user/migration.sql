/*
  Warnings:

  - You are about to alter the column `display_name` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "display_name" SET DATA TYPE VARCHAR(100);
