const { Router } = require('express');

const ProfileController = require('../../app/controllers/ProfileController');
const UserController = require('../../app/controllers/UserController');

const UserValidator = require('../../app/validators/UserValidator');

const adminRoutes = Router();

adminRoutes.get('/profile', ProfileController.profile);

adminRoutes.get('/users/', UserController.index);
adminRoutes.get('/users/create', UserController.create);
adminRoutes.post('/users/create', UserValidator.post, UserController.post);
adminRoutes.get('/users/update', UserController.update);

module.exports = adminRoutes;