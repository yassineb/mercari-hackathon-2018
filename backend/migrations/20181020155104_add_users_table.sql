CREATE TABLE users(
    `id` BIGINT(20) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `username` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `creation_time` DATETIME NOT NULL,
    `update_time` DATETIME NOT NULL
);