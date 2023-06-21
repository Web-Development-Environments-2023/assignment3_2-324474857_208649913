const DButils = require("./DButils");

// Function to mark a recipe as favorite for a specific user
async function markAsFavorite(user_id, recipe_id){
    await DButils.execQuery(`INSERT INTO favorite_recipes VALUES ('${user_id}', ${recipe_id})`);
}

// Function to retrieve favorite recipes for a specific user
async function getFavoriteRecipes(user_id){
    const recipes_id = await DButils.execQuery(`SELECT recipe_id FROM favorite_recipes WHERE user_id='${user_id}'`);
    return recipes_id;
}

// Function to check if a recipe has been watched by a specific user
async function getWatchedValue(recipe_id, user_id){
    const result = await DButils.execQuery(`SELECT * FROM watched_recipes WHERE user_id=${user_id} AND recipe_id=${recipe_id}`);
    if(result.length > 0){
        return true;
    } else {
        return false;
    }
}

// Function to check if a recipe has been marked as favorite by a specific user
async function getIsFavoriteValue(recipe_id, user_id){
    const result = await DButils.execQuery(`SELECT * FROM favorite_recipes WHERE user_id=${user_id} AND recipe_id=${recipe_id}`);
    if(result.length > 0){
        return true;
    } else {
        return false;
    }
}

// Exporting the functions to be used in other modules
exports.markAsFavorite = markAsFavorite;
exports.getFavoriteRecipes = getFavoriteRecipes;
exports.getWatchedValue = getWatchedValue;
exports.getIsFavoriteValue = getIsFavoriteValue;
