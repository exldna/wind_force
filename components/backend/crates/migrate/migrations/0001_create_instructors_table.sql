CREATE TABLE IF NOT EXISTS `instructors` (
    `uuid` BLOB(16) NOT NULL,
    `name` TEXT     NOT NULL,
    PRIMARY KEY (`uuid`)
);
