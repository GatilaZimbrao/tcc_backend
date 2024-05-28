-- DropForeignKey
ALTER TABLE `teacher_extension` DROP FOREIGN KEY `teacher_extension_extensionId_fkey`;

-- DropForeignKey
ALTER TABLE `teacher_extension` DROP FOREIGN KEY `teacher_extension_teacherId_fkey`;

-- AddForeignKey
ALTER TABLE `teacher_extension` ADD CONSTRAINT `teacher_extension_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `teacher`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `teacher_extension` ADD CONSTRAINT `teacher_extension_extensionId_fkey` FOREIGN KEY (`extensionId`) REFERENCES `extension`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
