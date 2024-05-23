/*
  Warnings:

  - You are about to drop the column `teacherId` on the `extension` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `extension` DROP FOREIGN KEY `extension_teacherId_fkey`;

-- AlterTable
ALTER TABLE `extension` DROP COLUMN `teacherId`;

-- CreateTable
CREATE TABLE `teacher_extension` (
    `teacherId` INTEGER NOT NULL,
    `extensionId` INTEGER NOT NULL,

    PRIMARY KEY (`teacherId`, `extensionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `teacher_extension` ADD CONSTRAINT `teacher_extension_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `teacher`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `teacher_extension` ADD CONSTRAINT `teacher_extension_extensionId_fkey` FOREIGN KEY (`extensionId`) REFERENCES `extension`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
