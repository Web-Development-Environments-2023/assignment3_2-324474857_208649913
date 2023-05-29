var express = require("express");
var router = express.Router();
const recipes_utils = require("./utils/recipes_utils");

router.get("/", async (req, res, next) => {
  try{
    const randomRecipes = await recipes_utils.getRandomRecipes(3);
    res.status(200).send(randomRecipes.results);
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
    const number = req.query.number;
    const search = await recipes_utils.searchRecipes(query, cuisine, diet, intolerances, number);
    const response = []
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
    const recipe = await recipes_utils.getRecipeDetails(req.params.recipeId);
    res.send(recipe);
  } catch (error) {
    error.status = 404
    error.message = "invalid recipe ID"
    next(error);
  }
});


module.exports = router;
