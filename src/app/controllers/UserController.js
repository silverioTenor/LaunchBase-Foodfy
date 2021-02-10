const UserController = {
  create(request, response) {
    return response.render('private/users/create');
  },
  update(request, response) {
    return response.render('private/users/update');
  },
};

module.exports = UserController;