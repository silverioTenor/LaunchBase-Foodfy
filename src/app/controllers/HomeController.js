const HomeController = {
  home(request, response) {
    return response.render('public/home');
  },
}

module.exports = HomeController;