const BaseController = require('./BaseController');
const Chef = require('../models/Chef');

const CreateFilesService = require('../services/CreateFiles.service');

const ChefController = {
  async index(request, response) {
    try {
      const base_url = `${request.protocol}://${request.headers.host}`;

      const chefs = await BaseController.chefList(base_url);

      return response.render('private/chefs/index', { chefs });
    } catch (err) {
      console.log(err);

      return response.render('private/chefs/index', {
        toast: {
          status: 'error',
          message: 'Sistema indisponível no momento!'
        }
      });
    }
  },
  create(request, response) {
    return response.render('private/chefs/create');
  },
  async post(request, response) {
    try {
      const { name } = request.body;
      const { path } = request.avatar;

      const chefDB = new Chef();
      const chefID = await chefDB.save({ name });

      const createFiles = new CreateFilesService();
      await createFiles.execute({ chef_id: chefID }, path);

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
  },
  show(request, response) {
    return response.render('private/chefs/show');
  },
  update(request, response) {
    return response.render('private/chefs/update');
  },
  put(request, response) {
    return response.render('private/chefs/update');
  },
  delete(request, response) {
    return response.render('private/chefs/update');
  }
}

module.exports = ChefController;