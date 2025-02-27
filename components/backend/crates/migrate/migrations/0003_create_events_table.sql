CREATE TABLE IF NOT EXISTS `events` (
    `uuid`       BLOB(16) NOT NULL,
    `time_begin` DATETIME,
    `time_end`   DATETIME,
    `product`    BLOB(16),
    `instructor` BLOB(16),
    PRIMARY KEY (`uuid`),
    FOREIGN KEY(`product`)    REFERENCES products(`uuid`),
    FOREIGN KEY(`instructor`) REFERENCES instructors(`uuid`)
);
