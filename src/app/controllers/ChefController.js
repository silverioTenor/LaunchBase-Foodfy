const Chef = require('../models/Chef');

const CreateFilesService = require('../services/CreateFiles.service');
const GetFilesService = require('../services/GetFiles.service');

const ChefController = {
  async index(request, response) {
    try {
      const chefDB = new Chef();
      const chefs = await chefDB.find();

      const chefsWithImagesPromise = chefs.map(async chef => {
        const values = {
          id: chef.id,
          column: 'chef_id'
        };

        const getFiles = new GetFilesService();
        const { image } = await getFiles.execute(values);

        const newChef = {
          ...chef,
          image: `${request.protocol}://${request.headers.host}${image}`
        };

        return newChef;
      });

      const chefsWithImages = await Promise.all(chefsWithImagesPromise);

      return response.render('private/chefs/index', { chefs: chefsWithImages });
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