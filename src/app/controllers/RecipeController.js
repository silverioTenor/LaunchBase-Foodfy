const Recipe = require('../models/Recipe');

const CreateFilesService = require('../services/CreateFiles.service');

class RecipeController {

  index(request, response) {
    return response.render('private/recipes/index');
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

  show(request, response) {
    return response.render('private/recipes/show');
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