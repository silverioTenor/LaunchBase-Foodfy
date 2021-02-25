const Recipe = require('../models/Recipe');
const File = require('../models/File');

const CreateFilesService = require('../services/CreateFiles.service');
const RemoveFilesService = require('../services/RemoveFiles.service');

const { getAllRecipes, getOneRecipe } = require('../utils/keepRecipes');

class RecipeController {

  async index(request, response) {
    try {
      let { page, limit, filter } = request.query;

      page = page || 1;
      limit = limit || 6;
      let offset = limit * (page - 1);

      const params = {
        filter,
        limit,
        offset,
      };

      const base_url = `${request.protocol}://${request.headers.host}`;

      const recipes = await getAllRecipes(base_url, params);

      const pagination = {
        page,
        total: Math.ceil(recipes[0].total / limit),
      };

      return response.render('private/recipes/index', { recipes, pagination, filter });
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
      const {
        chef_id,
        title,
        ingredients,
        steps: preparation,
        description
      } = request.body;

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
      const { id } = request.params;

      const base_url = `${request.protocol}://${request.headers.host}`;

      const recipe = await getOneRecipe(base_url, id);

      const recipeDB = new Recipe();
      const chefs = await recipeDB.findChefs();

      return response.render('private/recipes/update', { recipe, chefs });
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

  async put(request, response) {
    try {
      const {
        id,
        chef_id,
        title,
        ingredients,
        steps: preparation,
        description,
        removedPhotos,
      } = request.body;

      const { newImages } = request.images;

      const recipeDB = new Recipe();
      await recipeDB.update({ id, column: 'id' }, {
        chef_id,
        title,
        ingredients,
        preparation,
        description,
      });

      const recipe = await getOneRecipe('', id);

      const removeFiles = new RemoveFilesService();
      const unRemovedFiles = await removeFiles.execute({
        removedPhotos,
        oldImages: recipe.image
      });

      const newPath = [...unRemovedFiles, ...newImages];

      const path = newPath.filter(p => p !== undefined);

      const filesDB = new File();
      await filesDB.update({
        id: recipe.fm_id,
        column: 'files_manager_id'
      }, { path });

      return response.render('private/recipes/index', {
        toast: {
          status: 'success',
          message: 'Receita atualizada com sucesso!',
        }
      });
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

  async delete(request, response) {
    try {
      const { id } = request.body;

      const recipe = await getOneRecipe('', id);

      const idList = recipe.image.map(img => img.id);
      const removedPhotos = [...idList, ''].join(',');

      const removeFiles = new RemoveFilesService();
      await removeFiles.execute({
        removedPhotos,
        oldImages: recipe.image,
      });

      const recipeDB = new Recipe();
      await recipeDB.delete(id);

      return response.render('private/recipes/index', {
        toast: {
          status: 'success',
          message: 'Receita removida com sucesso!',
        }
      });
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
};

module.exports = RecipeController;