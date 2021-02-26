module.exports = {
  onlyUsers(request, response, next) {
    if (!request.session?.user?.userID) {
      return response.redirect('/session/login');
    }

    next();
  },

  onlyAdmin(request, response, next) {
    if (!request.session?.user?.isAdmin) {
      return response.redirect(`/admin/profile/${request.session.user.userID}`);
    }

    next();
  }
}