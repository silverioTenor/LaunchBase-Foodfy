const { Router } = require('express');
const multer = require('multer');
const uploadConfig = require('../../app/middlewares/upload');

const ProfileController = require('../../app/controllers/ProfileController');
const UserController = require('../../app/controllers/UserController');

const UserValidator = require('../../app/validators/UserValidator');

const adminRoutes = Router();

const upload = multer(uploadConfig);

adminRoutes.get('/profile/:id', ProfileController.profile);
// adminRoutes.put('/profile/:id', ProfileController.put);

adminRoutes.get('/users/', UserController.index);
adminRoutes.get('/users/create/', UserController.create);
adminRoutes.get('/users/update/:id', UserController.update);
adminRoutes.post('/users/', upload.array('photo', 1), UserValidator.post, UserController.post);
adminRoutes.put('/users/', upload.array('photo', 1), UserValidator.put, UserController.put);
adminRoutes.delete('/users/', UserController.delete);

module.exports = adminRoutes;