const HomeController = {
  home(request, response) {
    return response.render('public/home');
  },
  recipes(request, response) {
    return response.render('public/recipes');
  },
  about(request, response) {
    return response.render('public/about');
  },
}

module.exports = HomeController;