CREATE TABLE `recipes_db`.`watched_recipes` (
  `user_id` INT NOT NULL,
  `recipe_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `recipe_id`));

INSERT INTO watched VALUES (2,123123),
(3,123123);