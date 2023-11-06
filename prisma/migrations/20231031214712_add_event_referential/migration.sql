-- CreateTable
CREATE TABLE `EventReferential` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(100) NOT NULL,
    `day` VARCHAR(2) NOT NULL,
    `month` VARCHAR(2) NOT NULL,
    `country` VARCHAR(2) NOT NULL,
    `type` ENUM('HOLIDAY', 'SAINT', 'BIRTHDAY') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

/*
  Warnings:

  - A unique constraint covering the columns `[name,ownerId]` on the table `Calendar` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Calendar_name_ownerId_key` ON `Calendar`(`name`, `ownerId`);

-- DropForeignKey
ALTER TABLE `EventsForCalendar` DROP FOREIGN KEY `EventsForCalendar_eventId_fkey`;

-- AddForeignKey
ALTER TABLE `EventsForCalendar` ADD CONSTRAINT `EventsForCalendar_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
