const SessionController = {
  loginForm(request, response) {
    return response.render('session/login');
  },
  login(request, response) {
    return response.render('session/');
  },
  logout(request, response) {
    return response.render('session/');
  },
  forgotForm(request, response) {
    return response.render('session/');
  },
  forgot(request, response) {
    return response.render('session/');
  },
  resetForm(request, response) {
    return response.render('session/reset');
  },
  reset(request, response) {
    return response.render('session/reset');
  },
}

module.exports = SessionController;