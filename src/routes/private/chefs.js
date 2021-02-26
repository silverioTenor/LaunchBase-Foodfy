const { Router } = require('express');
const { upload } = require('../../app/middlewares/upload');

const chefRoutes = Router();

const ChefController = require('../../app/controllers/ChefController');
const ChefValidator = require('../../app/validators/ChefValidator');

const { onlyUsers, onlyAdmin } = require('../../app/middlewares/authenticatedRoutes');

const chefController = new ChefController();
const chefValidator = new ChefValidator();

chefRoutes.get('/', onlyUsers, chefController.index);
chefRoutes.get('/create', onlyUsers, onlyAdmin, chefController.create);
chefRoutes.get('/show/:id', onlyUsers, chefController.show);
chefRoutes.get('/update/:id', onlyUsers, onlyAdmin, chefController.update);
chefRoutes.post('/', upload.array('photo', 1), chefValidator.post, chefController.post);
chefRoutes.put('/', upload.array('photo', 1), chefValidator.put, chefController.put);
chefRoutes.delete('/', chefController.delete);

module.exports = chefRoutes;