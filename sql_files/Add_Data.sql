INSERT INTO users (username, firstname, lastname, country, password, email)
VALUES ('YossiS', 'Yossi', 'Sasson', 'Sweden', '1234Hash', 'ys@gm.com'),
		('Moses', 'Moshe', 'Gever', 'Egypt', '123456Hash', 'mg@gm.com');

-- DELETE FROM users WHERE id = 1;

INSERT INTO my_recipes (user_id, title, image, readyInMinutes, vegetarian, vegan, glutenFree)
VALUES 
  (3, 'Creamy Mushroom Risotto', 'risotto.jpg', 35, 1, 0, 1),
  (2, 'Grilled Salmon with Lemon', 'salmon.jpg', 25, 0, 0, 1),
  (3, 'Refreshing Fruit Salad', 'fruit-salad.jpg', 15, 1, 1, 1);

INSERT INTO favorite_recipes 
VALUES (2,716195),
(2,655575),
(3,659135);

