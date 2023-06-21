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

-- Family Recipes data 
-- INSERT INTO family_recipes(user_id, image, `readyInMinutes`, creator, ingredients, instructions, when_to_prepare)
-- VALUES(5, 'enchiladas_img.jpg', 50, 'Uncle Juan', '8 flour tortillas; 2 cups cooked chicken, shredded; 1 cup shredded cheese (e.g., cheddar or Monterey Jack); 1 can enchilada sauce; 1/2 cup diced onions; 1/2 cup diced bell peppers; 1/4 cup chopped fresh cilantro; Sour cream and salsa (optional)', 'Preheat the oven to 375°F; Warm tortillas in a dry skillet or microwave; In a bowl, mix shredded chicken, 1/2 cup of enchilada sauce, onions, bell peppers, and cilantro; Spoon a portion of the chicken mixture onto each tortilla; Roll up the tortillas and place them seam-side down in a baking dish; Pour the remaining enchilada sauce over the rolled tortillas; Sprinkle shredded cheese on top; Bake for 25-30 minutes or until cheese is melted and bubbly; Serve with sour cream and salsa, if desired.', 'Mexican-themed family dinners');
INSERT INTO family_recipes(user_id, title, image, `readyInMinutes`, creator, ingredients, instructions, when_to_prepare)
VALUES(4, 'Apple Pie', 'apple_pie_img.jpeg', 75, 'Cousin Emily', '2 1/2 cups all-purpose flour; 1 cup unsalted butter, cold and cubed; 1/2 teaspoon salt; 1/4 cup ice water; 6 cups peeled and sliced apples; 1 cup granulated sugar; 2 tablespoons all-purpose flour; 1 teaspoon ground cinnamon; 1/4 teaspoon ground nutmeg; 2 tablespoons lemon juice; 2 tablespoons butter, melted', 'In a large bowl, mix flour and salt; Cut in butter until mixture resembles coarse crumbs; Gradually add ice water and knead until dough comes together; Divide dough in half, wrap in plastic wrap, and refrigerate for 30 minutes; In another bowl, combine apples, sugar, flour, cinnamon, nutmeg, and lemon juice; Roll out one dough portion and line a pie dish; Pour apple mixture into the pie shell; Roll out the remaining dough and place it on top of the apples; Pinch the edges to seal; Brush the top crust with melted butter; Bake at 375°F for 45-50 minutes or until golden brown; Let it cool before serving.', 'Friday gatherings');
INSERT INTO family_recipes(user_id, title, image, `readyInMinutes`, creator, ingredients, instructions, when_to_prepare)
VALUES(4, 'Lasagna', 'lasagna_img.jpg', 60, 'Aunt Maria', '1 lb ground beef; 1 onion, chopped; 2 cloves garlic, minced; 1 can crushed tomatoes; 2 cups ricotta cheese; 2 cups shredded mozzarella cheese; 1/2 cup grated Parmesan cheese; 12 lasagna noodles', 'In a large skillet, brown the ground beef with onions and garlic; Add crushed tomatoes and simmer for 20 minutes; In a separate bowl, mix ricotta cheese, mozzarella cheese, and Parmesan cheese; Cook lasagna noodles according to package instructions; Layer the ingredients in a baking dish - noodles, meat sauce, cheese mixture; Repeat the layers; Bake at 375°F for 30 minutes; Let it cool for 10 minutes before serving.', 'Special occasions, like birthdays and holidays');
INSERT INTO family_recipes(user_id, title, image, `readyInMinutes`, creator, ingredients, instructions, when_to_prepare)
VALUES(4, 'Chili Con Carne', 'chili_con_carne_img.jpg', 120, 'Grandpa Carlos', '1 lb ground beef; 1 onion, diced; 3 cloves garlic, minced; 1 red bell pepper, diced; 1 can kidney beans, drained and rinsed; 1 can diced tomatoes; 2 tablespoons tomato paste; 2 tablespoons chili powder; 1 teaspoon ground cumin; 1 teaspoon paprika; Salt and pepper to taste; Optional toppings: shredded cheese, sour cream, chopped green onions', 'In a large pot, brown the ground beef over medium heat; Add onions, garlic, and bell pepper; Cook until vegetables are tender; Stir in kidney beans, diced tomatoes, tomato paste, chili powder, cumin, paprika, salt, and pepper; Simmer on low heat for 1-2 hours, stirring occasionally; Adjust seasoning if needed; Serve hot with optional toppings.', 'Game day gatherings and winter dinners');
