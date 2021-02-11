const SessionController = {
  loginForm(request, response) {
    return response.render('session/login');
  },
  login(request, response) {
    return
  },
  logout(request, response) {
    return
  },
  forgotForm(request, response) {
    return response.render('session/forgot');
  },
  forgot(request, response) {
    return
  },
  resetForm(request, response) {
    return response.render('session/reset');
  },
  reset(request, response) {
    return
  },
}

module.exports = SessionController;