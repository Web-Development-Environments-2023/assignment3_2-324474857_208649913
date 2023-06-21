var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const user_utils = require("./utils/user_utils");
const recipe_utils = require("./utils/recipes_utils");


/**
 * Authenticate all incoming requests by middleware
 */
router.use(async function (req, res, next) {
  if (req.session && req.session.user_id) {
    DButils.execQuery("SELECT user_id FROM users").then((users) => {
      if (users.find((x) => x.user_id === req.session.user_id)) {
        req.user_id = req.session.user_id;
        next();
      }
    }).catch(err => next(err));
  } else {
    res.sendStatus(401);
  }
});


/**
 * This path gets body with recipeId and save this recipe in the favorites list of the logged-in user
 */
router.post('/favorites', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    const recipe_id = req.body.recipeId;
    await user_utils.markAsFavorite(user_id,recipe_id);
    res.status(200).send("The Recipe successfully saved as favorite");
    } catch(error){
    next(error);
  }
})

/**
 * This path returns the favorites recipes that were saved by the logged-in user
 */
router.get('/favorites', async (req, res, next) => {
  try {
    const user_id = req.session.user_id;
    let favorite_recipes = {};
    const recipes_id = await user_utils.getFavoriteRecipes(user_id);
    let recipes_id_array = [];
    recipes_id.map((element) => recipes_id_array.push(element.recipe_id)); // extracting the recipe ids into an array

    // Use Promise.all to wait for all async operations to complete
    const results = await Promise.all(
      recipes_id_array.map((recipe) => recipe_utils.getRecipeDetails(recipe))
    );

    res.status(200).send(results);
  } catch (error) {
    next(error);
  }
});



/**
 * This path returns the recipes that were created by the logged-in user
 */
router.get('/my-recipes', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    const query = `SELECT * from my_recipes where user_id = ${user_id}`;
    const my_recipes = await DButils.execQuery(query);
    res.status(200).send(my_recipes);
  } catch(error){
    next(error); 
  }
});


/* 
Insert into my_recipes a new recipe that the looged in user created
*/
router.post('/my-recipes', async (req, res, next) => {
  try {
    const user_id = req.session.user_id;
    const { title, image, readyInMinutes, vegetarian, vegan, glutenFree, servings, ingredients, instructions } = req.body;
    await DButils.execQuery(
      `INSERT INTO my_recipes (user_id, title, image, readyInMinutes, vegetarian, vegan, glutenFree, servings, ingredients, instructions)
      VALUES ('${user_id}', '${title}', '${image}', '${readyInMinutes}', ${vegetarian}, ${vegan}, ${glutenFree}, '${servings}','${ingredients}','${instructions}')`
    );
    res.sendStatus(201);
  } catch (error) {
    console.log(error)
    next(error);
  }
});


/**
 * This path returns the family recipes that were created by the logged-in user
 */
router.get('/family-recipes', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    const query = `SELECT * from family_recipes where user_id = ${user_id}`;
    const family_recipes = await DButils.execQuery(query);
    res.status(200).send(family_recipes);
  } catch(error){
    next(error); 
  }
});



module.exports = router;
