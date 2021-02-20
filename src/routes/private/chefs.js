const { Router } = require('express');
const { upload } = require('../../app/middlewares/upload');

const chefRoutes = Router();

const ChefController = require('../../app/controllers/ChefController');
const ChefValidator = require('../../app/validators/ChefValidator');

const chefController = new ChefController();
const chefValidator = new ChefValidator();

chefRoutes.get('/', chefController.index);
chefRoutes.get('/create', chefController.create);
chefRoutes.get('/show/:id', chefController.show);
chefRoutes.get('/update/:id', chefController.update);
chefRoutes.post('/', upload.array('photo', 1), chefValidator.post, chefController.post);
// chefRoutes.put('/', upload.array('photo', 1), chefValidator.put, chefController.put);
// chefRoutes.delete('/', chefController.create);

module.exports = chefRoutes;