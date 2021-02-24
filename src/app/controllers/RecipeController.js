const Recipe = require('../models/Recipe');

const CreateFilesService = require('../services/CreateFiles.service');

const { getAllRecipes, getOneRecipe } = require('../utils/keepRecipes');

class RecipeController {

  async index(request, response) {
    try {
      const base_url = `${request.protocol}://${request.headers.host}`;

      const recipes = await getAllRecipes(base_url);

      return response.render('private/recipes/index', { recipes });
    } catch (err) {
      console.log(err);

      return response.render('private/recipes/index', {
        toast: {
          status: 'error',
          message: 'Sistema indisponível no momento!',
        }
      });
    }
  }

  async create(request, response) {
    try {
      const recipeDB = new Recipe();
      const chefs = await recipeDB.findChefs();

      return response.render('private/recipes/create', { chefs });
    } catch (err) {
      console.log(err);

      return response.render('private/recipes/index', {
        toast: {
          status: 'error',
          message: 'Sistema indisponível no momento!'
        }
      });
    }
  }

  async post(request, response) {
    try {
      const { chef_id, title, ingredients, steps: preparation, description } = request.body;

      const user_id = request.session.user.userID;

      const recipeDB = new Recipe();
      const recipe_id = await recipeDB.save({
        user_id,
        chef_id,
        title,
        ingredients,
        preparation,
        description,
      });

      const path = request.files.map(file => file.path);

      const createFiles = new CreateFilesService();
      await createFiles.execute({ recipe_id }, path);

      return response.render('private/recipes/index', {
        toast: {
          status: 'success',
          message: 'Receita criada com sucesso!',
        }
      });
    } catch (err) {
      console.log(err);

      return response.render('private/recipes/index', {
        toast: {
          status: 'error',
          message: 'Sistema indisponível no momento!',
        }
      })
    }
  }

  async show(request, response) {
    try {
      const { id } = request.params;

      const base_url = `${request.protocol}://${request.headers.host}`;

      const recipe = await getOneRecipe(base_url, id);

      return response.render('private/recipes/show', { recipe });
    } catch (err) {
      console.log(err);

      return response.render('private/recipes/show', {
        toast: {
          status: 'error',
          message: 'Sistema indisponível no momento!',
        }
      });
    }
  }

  async update(request, response) {
    try {
      const recipeDB = new Recipe();
      const chefs = await recipeDB.findChefs();

      return response.render('private/recipes/update', { chefs });
    } catch (err) {
      console.log(err);

      return response.render('private/recipes/index', {
        toast: {
          status: 'error',
          message: 'Sistema indisponível no momento!'
        }
      });
    }
  }
};

module.exports = RecipeController;