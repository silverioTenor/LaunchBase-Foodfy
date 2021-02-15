const User = require('../models/User');

const ProfileController = {
  async profile(request, response) {
    try {
      const { id } = request.params;

      const userDB = new User();
      const user = await userDB.findOne({ where: { id } });

      user.firstName = user.name.split(' ')[0];

      return response.render('private/users/profile', { user });
    } catch (err) {
      console.log(err);

      return response.render('session/login', {
        toast: {
          status: 'error',
          message: 'Usuário não encontrado!'
        }
      });
    }
  },
};

module.exports = ProfileController;