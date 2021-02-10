const UserController = {
  index(request, response) {
    return response.render('private/users/index');
  },
  create(request, response) {
    return response.render('private/users/create');
  },
  update(request, response) {
    return response.render('private/users/update');
  },
};

module.exports = UserController;