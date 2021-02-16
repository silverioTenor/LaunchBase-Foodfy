const { Router } = require('express');
const { upload } = require('../../app/middlewares/upload');

const ChefController = require('../../app/controllers/ChefController');
const ChefValidator = require('../../app/validators/ChefValidator');

const chefRoutes = Router();

chefRoutes.get('/', ChefController.index);
chefRoutes.get('/create', ChefController.create);
chefRoutes.get('/show', ChefController.show);
chefRoutes.get('/update', ChefController.update);
chefRoutes.post('/', upload.array('photo', 1), ChefValidator.post, ChefController.post);
// chefRoutes.put('/', upload.array('photo', 1), ChefValidator.put, ChefController.put);
// chefRoutes.delete('/', ChefController.create);

module.exports = chefRoutes;