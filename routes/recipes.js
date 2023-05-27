var express = require("express");
var router = express.Router();
const recipes_utils = require("./utils/recipes_utils");

router.get("/", (req, res) => res.send("im here"));


/**
 * This path returns a full details of a recipe by its id
 */
router.get("/:recipeId", async (req, res, next) => {
  try {
    const recipe = await recipes_utils.getRecipeDetails(req.params.recipeId);
    res.send(recipe);
  } catch (error) {
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
    const response = []
    for(let i = 0 ;i<search.length; i++){
      response.push(await recipes_utils.getRecipeDetails(search[i].id));
    }
    res.status(200).send(res);
  }catch(error){
    next(error);
  }
})

module.exports = router;
