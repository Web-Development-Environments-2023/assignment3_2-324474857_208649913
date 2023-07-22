var express = require("express");
var router = express.Router();
const recipes_utils = require("./utils/recipes_utils");
const DButils = require("./utils/DButils");

router.get("/", async (req, res, next) => {
  try{
    const user_id = req.session.user_id;
    // Get Random recipes and extract their ids
    const randomRecipes = await recipes_utils.getRandomRecipes(3);
    const recipeIds = randomRecipes.data.recipes.map((recipe) => recipe.id);
    // Get only the relevant recipe details
    const recipeDetails = await Promise.all(recipeIds.map((recipeId) => recipes_utils.getRecipeDetails(recipeId, user_id)));
    res.status(200).send(recipeDetails);
  }catch(error){
    next(error);
  }
});

router.get('/search', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    const query = req.query.query;
    // const number = 1;
    const number = req.query.number;
    const cuisines = req.query.cuisine;
    const diets = req.query.diet;
    const intolerences = req.query.intolerences;
    const search = await recipes_utils.searchRecipes(query,cuisines,diets,intolerences,number);
    const response = [];
    for(let i = 0 ;i<search.length; i++){
      response.push(await recipes_utils.getFullRecipeDetails(search[i].id, user_id));
    }
    res.status(200).send(response);
  }catch(error){
    next(error);
  }
})

router.post('/watched', async (req, res, next) => {
  try{
    const user_id = req.session.user_id;
    const recipe_id = req.body.recipe_id;
    const my_recipes = await DButils.execQuery(`SELECT * from watched_recipes where user_id = ${user_id} and recipe_id=${recipe_id}`);
    if (my_recipes.length > 0){
      res.status(200).send("recipe watched already");
    }
    else{
      const query = 
      `INSERT INTO watched_recipes (user_id, recipe_id)
      VALUES (${user_id}, ${recipe_id})`
      await DButils.execQuery(query);
      res.status(201).send("recipe watched");
    }
   
  }catch(error){
    next(error)
  }
})

// GET request to retrieve the three most recently watched recipes by a specific user
// Response is an array of recipe_id sorted from latest to oldest. 
  router.get('/watched',async (req, res, next) => {
    try{
      const user_id = req.session.user_id;
      const num_of_recipes = 3;
      // const num_of_recipes = 1;
      const last_watched_recipes = await DButils.execQuery(`SELECT * from watched_recipes where user_id = ${user_id} ORDER BY record_id DESC LIMIT ${num_of_recipes}`);
      const response = [];
      for(let i = 0 ;i<last_watched_recipes.length; i++){
        response.push(await recipes_utils.getRecipeDetails(last_watched_recipes[i].recipe_id, user_id, watched=true));
      }
      res.status(200).send(response);
    }catch(error){
      next(error)
    }
  });


/**
 * This path returns a full details of a recipe by its id
 */
router.get("/:recipeId", async (req, res, next) => {
  try {
    const user_id = req.session.user_id;
    const recipeId = req.params.recipeId
    const recipe = await recipes_utils.getFullRecipeDetails(recipeId, user_id);
    res.send(recipe);
  } catch (error) {
    error.status = 404
    error.message = "invalid recipe ID"
    next(error);
  }
});


module.exports = router;
