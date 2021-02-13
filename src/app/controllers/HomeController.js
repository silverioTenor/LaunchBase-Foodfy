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
  chefs(request, response) {
    return response.render('public/chefs/index');
  },
  chefShow(request, response) {
    return response.render('public/chefs/show');
  },
}

module.exports = HomeController;