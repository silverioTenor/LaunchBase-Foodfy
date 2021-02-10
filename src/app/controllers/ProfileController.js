const ProfileController = {
  profile(request, response) {
    return response.render('private/users/profile');
  },
};

module.exports = ProfileController;