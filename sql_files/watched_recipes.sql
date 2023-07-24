CREATE TABLE `recipes_db`.`watched_recipes` (
  `user_id` INT NOT NULL,
  `recipe_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `recipe_id`));

ALTER TABLE `recipes_db`.`watched_recipes` 
CHANGE COLUMN `record_id` `record_id` INT NOT NULL AUTO_INCREMENT FIRST,
DROP PRIMARY KEY,
ADD PRIMARY KEY (`record_id`);
;


INSERT INTO `watched_recipes` (`user_id`, `recipe_id`)
VALUES
    (2, 123123),
    (3, 123123),
    (4, 123123),
    (4, 646138),
    (4, 1697799);

