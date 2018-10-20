CREATE TABLE items(
    `id` BIGINT(20) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `title` VARCHAR(255),
    `image` TEXT,
    `creation_time` DATETIME NOT NULL
);