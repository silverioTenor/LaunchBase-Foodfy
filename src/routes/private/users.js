const { Router } = require('express');

const ProfileController = require('../../app/controllers/ProfileController');
const UserController = require('../../app/controllers/UserController');

const UserValidator = require('../../app/validators/UserValidator');

const adminRoutes = Router();

adminRoutes.get('/profile/:id', ProfileController.profile);
// adminRoutes.put('/profile/:id', ProfileController.put);

adminRoutes.get('/users/', UserController.index);
adminRoutes.get('/users/create/', UserController.create);
adminRoutes.get('/users/update/:id', UserController.update);
adminRoutes.post('/users/', UserValidator.post, UserController.post);
adminRoutes.put('/users/', UserValidator.put, UserController.put);

module.exports = adminRoutes;