-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` TEXT NOT NULL,
    `created_at` DATETIME(0) NOT NULL,
    `is_secret` TINYINT NOT NULL DEFAULT 0,
    `user_id` INTEGER NOT NULL,
    `post_id` INTEGER NOT NULL,

    INDEX `post_id`(`post_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Post` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(20) NOT NULL,
    `content` TEXT NOT NULL,
    `created_at` DATETIME(0) NOT NULL,
    `is_public` TINYINT NOT NULL DEFAULT 1,
    `user_id` INTEGER NOT NULL,
    `category_id` INTEGER NOT NULL,

    INDEX `category_id`(`category_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Profile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pic` BLOB NULL,
    `bio` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tag` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TagPost` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tag_id` INTEGER NOT NULL,
    `post_id` INTEGER NOT NULL,

    INDEX `post_id`(`post_id`),
    INDEX `tag_id`(`tag_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,
    `birth` DATE NOT NULL,
    `email` VARCHAR(20) NOT NULL,
    `pwd` VARCHAR(20) NOT NULL,
    `is_admin` TINYINT NOT NULL DEFAULT 0,
    `profile_id` INTEGER NOT NULL,

    INDEX `profile_id`(`profile_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `Post`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `post_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `post_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `TagPost` ADD CONSTRAINT `tagpost_ibfk_1` FOREIGN KEY (`tag_id`) REFERENCES `Tag`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `TagPost` ADD CONSTRAINT `tagpost_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `Post`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
