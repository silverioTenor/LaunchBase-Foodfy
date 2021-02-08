const { Router } = require('express');
const publicRoutes = Router();

const HomeController = require('../../app/controllers/HomeController');

publicRoutes.get('/', HomeController.home);

module.exports = publicRoutes;