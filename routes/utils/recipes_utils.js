const axios = require("axios");
const api_domain = "https://api.spoonacular.com/recipes";
const user_utils = require("./user_utils");


/**
 * Get recipe information by its ID
 * @param {*} recipe_id - ID of the recipe
 */
async function getRecipeInformation(recipe_id) {
  return await axios.get(`${api_domain}/${recipe_id}/information`, {
    params: {
      includeNutrition: false,
      apiKey: process.env.spoonacular_apiKey
    }
  });
}

/**
 * Get a random list of recipes
 * @param {*} number - Number of random recipes to retrieve
 */
async function getRandomRecipes(number) {
  return await axios.get(`${api_domain}/random`, {
    params: {
      number: number,
      apiKey: process.env.spoonacular_apiKey
    }
  });
}

/**
 * Search for recipes based on various criteria
 * @param {*} query - Query to search for recipes
 * @param {*} cuisine - Cuisine preference
 * @param {*} diet - Diet preference
 * @param {*} intolerances - Intolerances to consider
 */
async function searchRecipes(query,cuisines,diets, intolerences,number) {
  try {
    const response = await axios.get(`${api_domain}/complexSearch`, {
      params: {
        apiKey: process.env.spoonacular_apiKey,
        query: query,
        number: number,
        cuisines:cuisines,
        diets:diets,
        intolerences:intolerences,
        includeNutrition: false
      }
    });
    return response.data.results;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while searching for recipes.');
  }
}

/**
 * Get preview information of a recipe
 * @param {*} recipe_id - ID of the recipe
 */
async function getRecipeDetails(recipe_id, user_id, watched=false) {
  let recipe_info = await getRecipeInformation(recipe_id);
  let { id, title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree } = recipe_info.data;
  if (user_id != undefined && !watched){
    watched = await user_utils.getWatchedValue(recipe_id, user_id);
  }
  let favorite = false;
  if (user_id != undefined){
    favorite = await user_utils.getIsFavoriteValue(recipe_id, user_id);
  }
  return {
    id: id,
    title: title,
    readyInMinutes: readyInMinutes,
    image: image,
    popularity: aggregateLikes,
    vegan: vegan,
    vegetarian: vegetarian,
    glutenFree: glutenFree, 
    watched: watched,
    favorite: favorite
  };
}

/**
 * Get detailed information (more extensive than preview) of a recipe
 * @param {*} recipe_id - ID of the recipe
 */
async function getFullRecipeDetails(recipe_id, user_id) {
  let recipe_info = await getRecipeInformation(recipe_id);
  let { id, title, readyInMinutes, image, aggregateLikes, vegan, vegetarian,
     glutenFree, extendedIngredients, servings, instructions} = recipe_info.data;
  let watched;
  if (user_id != undefined){
    watched = await user_utils.getWatchedValue(recipe_id, user_id);
  }
  let favorite = false;
  if (user_id != undefined){
    favorite = await user_utils.getIsFavoriteValue(recipe_id, user_id);
  }
  return {
    id: id,
    title: title,
    readyInMinutes: readyInMinutes,
    image: image,
    popularity: aggregateLikes,
    vegan: vegan,
    vegetarian: vegetarian,
    glutenFree: glutenFree,
    watched: watched,
    favorite: favorite,
    servings: servings,
    extendedIngredients: extendedIngredients,
    instructions: instructions,
  };
}

// Export the functions
exports.getRecipeDetails = getRecipeDetails;
exports.getFullRecipeDetails = getFullRecipeDetails;
exports.searchRecipes = searchRecipes;
exports.getRandomRecipes = getRandomRecipes;
exports.getRecipeInformation = getRecipeInformation;
