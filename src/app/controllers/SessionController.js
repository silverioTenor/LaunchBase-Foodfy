const SessionController = {
  loginForm(request, response) {
    return response.render('session/');
  },
  login(request, response) {
    return response.render('session/');
  },
  logout(request, response) {
    return response.render('session/');
  },
  forgot(request, response) {
    return response.render('session/');
  },
  reset(request, response) {
    return response.render('session/reset');
  },
}

module.exports = SessionController;