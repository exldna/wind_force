CREATE TABLE IF NOT EXISTS `products` (
    `uuid` BLOB(16)    NOT NULL,
    `name` TEXT UNIQUE NOT NULL,
    PRIMARY KEY (`uuid`)
);
