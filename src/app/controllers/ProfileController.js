const ProfileController = {
  profile(request, response) {
    return response.render('private/profile');
  },
};

module.exports = ProfileController;