const ChefController = {
  index(request, response) {
    return response.render('private/chefs/index');
  },
  create(request, response) {
    return response.render('private/chefs/create');
  },
  post(request, response) {
    return response.render('private/chefs/create');
  },
  show(request, response) {
    return response.render('private/chefs/show');
  },
  update(request, response) {
    return response.render('private/chefs/update');
  },
  put(request, response) {
    return response.render('private/chefs/update');
  },
  delete(request, response) {
    return response.render('private/chefs/update');
  }
}

module.exports = ChefController;