const DButils = require("./DButils");

async function markAsFavorite(user_id, recipe_id){
    await DButils.execQuery(`insert into favorite_recipes values ('${user_id}',${recipe_id})`);
}

async function getFavoriteRecipes(user_id){
    const recipes_id = await DButils.execQuery(`select recipe_id from favorite_recipes where user_id='${user_id}'`);
    return recipes_id;
}

async function getWatchedValue(recipe_id, user_id){
    // console.log("Watched val: "+user_id+" , "+recipe_id);
    const result = await DButils.execQuery(`select * from watched_recipes where user_id=${user_id} and recipe_id=${recipe_id}`);
    // console.log(result);
    if(result.length>0){
        return true;
    } else {
        return false;
    }
}

exports.markAsFavorite = markAsFavorite;
exports.getFavoriteRecipes = getFavoriteRecipes;
exports.getWatchedValue = getWatchedValue;