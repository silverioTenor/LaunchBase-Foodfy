const UserController = {
  index(request, response) {
    return response.render('private/users/index');
  },
  create(request, response) {
    return response.render('private/users/create');
  },
  post(request, response) {
    const { name, email, is_admin } = request.body;
  },
  update(request, response) {
    return response.render('private/users/update');
  },
};

module.exports = UserController;