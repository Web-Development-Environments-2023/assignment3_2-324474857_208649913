const axios = require("axios");
const api_domain = "https://api.spoonacular.com/recipes";

/**
 * Get recipe information by its ID
 * @param {*} recipe_id - ID of the recipe
 */
async function getRecipeInformation(recipe_id) {
  return await axios.get(`${api_domain}/${recipe_id}/information`, {
    params: {
      includeNutrition: false,
      apiKey: 'e8e5d590af004de4a54b294a0aa3e81b'//process.env.spoonacular_apiKey
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
async function searchRecipes(query, cuisine, diet, intolerances, number) {
  try {
    const response = await axios.get(`${api_domain}/complexSearch`, {
      params: {
        apiKey: process.env.spoonacular_apiKey, //process.env.spoonacular_apiKey,
        query: query,
        cuisine: cuisine,
        diet: diet,
        intolerances: intolerances,
        includeNutrition: false,
        number: number
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
async function getRecipeDetails(recipe_id) {
  let recipe_info = await getRecipeInformation(recipe_id);
  let { id, title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree } = recipe_info.data;

  return {
    id: id,
    title: title,
    readyInMinutes: readyInMinutes,
    image: image,
    popularity: aggregateLikes,
    vegan: vegan,
    vegetarian: vegetarian,
    glutenFree: glutenFree
  };
}

/**
 * Get detailed information (more extensive than preview) of a recipe
 * @param {*} recipe_id - ID of the recipe
 */
async function getFullRecipeDetails(recipe_id) {
  let recipe_info = await getRecipeInformation(recipe_id);
  let { id, title, readyInMinutes, image, aggregateLikes, vegan, vegetarian,
     glutenFree, extendedIngredients, servings, instructions} = recipe_info.data;

  return {
    id: id,
    title: title,
    readyInMinutes: readyInMinutes,
    image: image,
    popularity: aggregateLikes,
    vegan: vegan,
    vegetarian: vegetarian,
    glutenFree: glutenFree,
    servings: servings,
    extendedIngredients: extendedIngredients,
    instructions: instructions
  };
}

// Export the functions
exports.getRecipeDetails = getRecipeDetails;
exports.getFullRecipeDetails = getFullRecipeDetails;
exports.searchRecipes = searchRecipes;
exports.getRandomRecipes = getRandomRecipes;
exports.getRecipeInformation = getRecipeInformation;
