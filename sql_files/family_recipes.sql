CREATE TABLE family_recipes (
  user_id INT,
  title VARCHAR(255),
  image VARCHAR(255),
  readyInMinutes INT,
  creator VARCHAR(255),
  ingredients TEXT,
  instructions TEXT,
  when_to_prepare TEXT
);

ALTER TABLE `recipes_db`.`family_recipes` 
CHANGE COLUMN `user_id` `user_id` INT NOT NULL ,
CHANGE COLUMN `title` `title` VARCHAR(255) NOT NULL ,
ADD PRIMARY KEY (`user_id`, `title`);
;

INSERT INTO family_recipes (user_id, title, image, readyInMinutes, creator, ingredients, instructions, when_to_prepare)
VALUES (1, 'Grandma''s Couscous', 'https://example.com/image.jpg', 60, 'Grandma', 'Beef, couscous, tomato sauce', '1. Boil water, 2. Add couscous and let it cook, 3. Cook beef in tomato sauce, 4. Combine couscous and beef mixture', 'Traditionally prepared for family gatherings');

