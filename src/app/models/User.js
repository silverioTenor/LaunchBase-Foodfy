const Base = require('./Base');

class User extends Base {

  constructor() {
    super();
    this.table = 'users';
  }
}

module.exports = User;