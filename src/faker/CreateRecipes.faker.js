const faker = require('faker');

const Recipe = require('../app/models/Recipe');

const CreateFilesService = require('../app/services/CreateFiles.service');
const CopyAndSaveFilesFaker = require('./CopyAndSaveFiles.faker');

class CreateRecipesFaker {
  recipes = [];

  async execute({ user_id, chef_id }) {
    try {
      while (this.recipes.length < 1) {
        this.recipes.push({
          user_id,
          chef_id,
          title: faker.commerce.productName(),
          ingredients: ['fdgfdgfdgf', 'df dsof dofdfijd', 'lkvsfdfj d'],
          preparation: ['fdgfdgfdgf', 'df dsof dofdfijd', 'lkvsfdfj d'],
          description: faker.lorem.paragraph(Math.ceil(Math.random() * 5)),
        });
      }

      const recipeDB = new Recipe();
      const copyAndSaveFiles = new CopyAndSaveFilesFaker();
      const createFiles = new CreateFilesService();

      const recipesIDsPromise = this.recipes.map(async chef => recipeDB.save(chef));

      const recipesIDs = await Promise.all(recipesIDsPromise);

      recipesIDs.forEach(async recipe_id => {
        const path = await copyAndSaveFiles.execute([
          'recipe_default1.png',
          'recipe_default2.jpg',
          'recipe_default3.jpg',
          'recipe_default4.jpg'
        ]);

        await createFiles.execute({ recipe_id }, path);
      });
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = CreateRecipesFaker;