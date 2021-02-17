const BaseController = require('./BaseController');

const HomeController = {
  home(request, response) {
    return response.render('public/home');
  },
  recipes(request, response) {
    return response.render('public/recipes/index');
  },
  recipeShow(request, response) {
    return response.render('public/recipes/show');
  },
  about(request, response) {
    return response.render('public/about');
  },
  async chefs(request, response) {
    try {
      const base_url = `${request.protocol}://${request.headers.host}`;

      const chefs = await BaseController.chefList(base_url);

      return response.render('public/chefs/index', { chefs });
    } catch (err) {
      console.log(err);

      return response.render('public/chefs/index', {
        toast: {
          status: 'error',
          message: 'Sistema indisponível no momento!'
        }
      });
    }
  },
  chefShow(request, response) {
    return response.render('public/chefs/show');
  },
}

module.exports = HomeController;