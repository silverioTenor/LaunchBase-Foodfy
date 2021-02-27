const faker = require('faker');
const { hash } = require('bcryptjs');

const User = require('../app/models/User');

class CreateUsersFaker {
  users = [];

  async execute() {
    try {
      while (this.users.length < 5) {
        this.users.push({
          name: faker.name.firstName(),
          email: faker.internet.email(),
          password: await hash('123456', 8),
          is_admin: this.users.length === 0 ? true : false,
        });
      }

      const userDB = new User();
      const usersPromiseID = this.users.map(user => userDB.save(user));
      const usersIDs = await Promise.all(usersPromiseID);

      return usersIDs;
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = CreateUsersFaker;