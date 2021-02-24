const Recipe = require('../models/Recipe');

const GetFilesService = require('../services/GetFiles.service');

module.exports = {
  async getAllRecipes(base_url) {
    try {
      const recipeDB = new Recipe();
      const recipes = await recipeDB.findRecipesWithChef();

      const recipesWithImagesPromise = recipes.map(async recipe => {
        const values = {
          id: recipe.id,
          column: 'recipe_id'
        };

        const getFiles = new GetFilesService();
        const { images } = await getFiles.execute(values, base_url);

        const newChef = {
          ...recipe,
          image: images[0].path
        };

        return newChef;
      });

      const recipesWithImages = await Promise.all(recipesWithImagesPromise);

      return recipesWithImages;
    } catch (err) {
      throw new Error(err);
    }
  },
  async getOneRecipe(base_url, id) {
    try {
      const chefDB = new Chef();
      const chef = await chefDB.findByID(id);

      const values = {
        id: chef.id,
        column: 'chef_id'
      };

      const getFiles = new GetFilesService();
      const { fm_id, images } = await getFiles.execute(values, base_url);

      const newChef = {
        ...chef,
        image: images[0],
        fm_id,
      };

      return newChef;
    } catch (err) {
      throw new Error(err);
    }
  },
}