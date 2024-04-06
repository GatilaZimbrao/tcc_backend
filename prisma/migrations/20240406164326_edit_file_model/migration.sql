/*
  Warnings:

  - You are about to drop the column `type` on the `file` table. All the data in the column will be lost.
  - You are about to drop the `education` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `file` DROP COLUMN `type`;

-- DropTable
DROP TABLE `education`;
