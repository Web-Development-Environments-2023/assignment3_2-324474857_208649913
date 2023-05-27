var express = require("express");
var router = express.Router();
const recipes_utils = require("./utils/recipes_utils");

router.get("/", async (req, res, next) => {
  try{
    // Get Random recipes and extract their ids
    const randomRecipes = await recipes_utils.getRandomRecipes(3);
    const recipeIds = randomRecipes.data.recipes.map((recipe) => recipe.id);
    // Get only the relevant recipe details
    const recipeDetails = await Promise.all(recipeIds.map((recipeId) => recipes_utils.getRecipeDetails(recipeId)));
    res.status(200).send(recipeDetails);
  }catch(error){
    next(error);
  }
});


router.get('/search', async (req,res,next) => {
  try{
    const query = req.query.query;
    const intolerances = req.query.intolerances;
    const diet = req.query.diet;
    const cuisine = req.query.cuisine;
    const search = await recipes_utils.searchRecipes(query, cuisine, diet, intolerances);
    const response = [];
    for(let i = 0 ;i<search.length; i++){
      response.push(await recipes_utils.getRecipeDetails(search[i].id));
    }
    res.status(200).send(response);
  }catch(error){
    next(error);
  }
})

/**
 * This path returns a full details of a recipe by its id
 */
router.get("/:recipeId", async (req, res, next) => {
  try {
    if(!Number.isInteger(parseInt(req.params.recipeId))){
      throw new Error("Invalid recipe id");
    }
    const recipe = await recipes_utils.getFullRecipeDetails(req.params.recipeId);
    res.send(recipe);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
