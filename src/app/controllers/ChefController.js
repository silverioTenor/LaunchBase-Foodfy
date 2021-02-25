const Chef = require('../models/Chef');
const File = require('../models/File');

const CreateFilesService = require('../services/CreateFiles.service');
const RemoveFilesService = require('../services/RemoveFiles.service');

const { getAllChefs, getOneChef } = require('../utils/keepChefs');
const { getAllRecipes } = require('../utils/keepRecipes');

class ChefController {

  async index(request, response) {
    try {
      let { page, limit, filter } = request.query;

      page = page || 1;
      limit = limit || 9;
      let offset = limit * (page - 1);

      const params = {
        filter,
        limit,
        offset,
      };

      const base_url = `${request.protocol}://${request.headers.host}`;

      const chefs = await getAllChefs(base_url, params);

      const pagination = {
        page,
        total: Math.ceil(chefs[0].total / limit),
      };

      return response.render('private/chefs/index', { chefs, pagination, filter });
    } catch (err) {
      console.log(err);

      return response.render('private/chefs/index', {
        toast: {
          status: 'error',
          message: 'Sistema indisponível no momento!'
        }
      });
    }
  }

  create(request, response) {
    return response.render('private/chefs/create');
  }

  async post(request, response) {
    try {
      const { name } = request.body;
      const { path } = request.avatar;

      const chefDB = new Chef();
      const chef_id = await chefDB.save({ name });

      const createFiles = new CreateFilesService();
      await createFiles.execute({ chef_id }, path);

      return response.render('private/chefs/index', {
        toast: {
          status: 'success',
          message: 'Chef cadastrado com sucesso!'
        }
      });
    } catch (err) {
      console.log(err);

      return response.render('private/chefs/create', {
        chef: request.body,
        toast: {
          status: 'error',
          message: 'Falha ao cadastrar chef!'
        }
      });
    }
  }

  async show(request, response) {
    try {
      const id = Number(request.params.id);

      const base_url = `${request.protocol}://${request.headers.host}`;

      const chef = await getOneChef(base_url, id);

      const recipes = (await getAllRecipes(base_url)).filter(recipe => {
        return recipe.chef_id === id ? recipe : false;
      });

      return response.render('private/chefs/show', { chef, recipes });
    } catch (err) {
      console.log(err);

      return response.render('private/chefs/index', {
        toast: {
          status: 'error',
          message: 'Sistema indisponível no momento!'
        }
      });
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;

      const base_url = `${request.protocol}://${request.headers.host}`;

      const chef = await getOneChef(base_url, id);

      const newChef = {
        ...chef,
        image: [{ ...chef.image }]
      }

      return response.render('private/chefs/update', { chef: newChef });
    } catch (err) {
      console.log(err);

      return response.render('private/chefs/index', {
        toast: {
          status: 'error',
          message: 'Sistema indisponível! Tente novamente mais tarde.'
        }
      });
    }
  }

  async put(request, response) {
    try {
      const { id, name, removedPhotos, avatar } = request.chef;

      const chef = await getOneChef('', id);

      const chefDB = new Chef();
      await chefDB.update({ id, column: 'id' }, { name });

      if (avatar.length > 0) {
        const removeFiles = new RemoveFilesService();
        const unRemovedFiles = await removeFiles.execute({
          removedPhotos,
          oldImages: [chef.image]
        });

        const newPath = [...unRemovedFiles, ...avatar];

        const path = newPath.filter(p => p !== undefined);

        const filesDB = new File();
        await filesDB.update({
          id: chef.fm_id,
          column: 'files_manager_id'
        }, { path });
      }

      return response.render('private/chefs/index', {
        toast: {
          status: 'success',
          message: 'Chef atualizado com sucesso!',
        }
      });
    } catch (err) {
      console.log(err);

      return response.render('private/chefs/update', {
        toast: {
          status: 'error',
          message: 'Erro inesperado! Tente novamente mais tarde.',
        }
      });
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.body;

      const chef = await getOneChef('', id);

      const removeFiles = new RemoveFilesService();
      await removeFiles.execute({
        removedPhotos: `${chef.image.id},`,
        oldImages: [chef.image],
      });

      const chefDB = new Chef();
      await chefDB.delete(id);

      return response.render('private/chefs/index', {
        toast: {
          status: 'success',
          message: 'Chef removido com sucesso!',
        }
      });
    } catch (err) {
      console.log(err);

      return response.render('private/chefs/index', {
        toast: {
          status: 'error',
          message: 'Sistema indisponível no momento!',
        }
      });
    }
  }
}

module.exports = ChefController;