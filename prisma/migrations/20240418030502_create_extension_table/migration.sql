-- CreateTable
CREATE TABLE `extension` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `abstract` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `site` VARCHAR(191) NULL,
    `type` VARCHAR(191) NOT NULL,
    `teacherId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `extension` ADD CONSTRAINT `extension_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `teacher`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
