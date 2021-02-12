const RecipeController = {
  index(request, response) {
    return response.render('private/recipes/index');
  },
  create(request, response) {
    return response.render('private/recipes/create');
  },
  update(request, response) {
    return response.render('private/recipes/update');
  },
};

module.exports = RecipeController;