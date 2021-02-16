const Chef = require('../models/Chef');

const CreateFileService = require('../services/CreateFile');

const ChefController = {
  index(request, response) {
    return response.render('private/chefs/index');
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

      const createFile = new CreateFileService();
      await createFile.execute({ chef_id: chefID }, path);

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