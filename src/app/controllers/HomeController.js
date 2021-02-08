const HomeController = {
  home(request, response) {
    return response.render('public/home');
  },
  recipes(request, response) {
    return response.render('public/recipes');
  },
  show(request, response) {
    return response.render('public/show');
  },
  about(request, response) {
    return response.render('public/about');
  },
  chefs(request, response) {
    return response.render('public/chefs');
  },
}

module.exports = HomeController;