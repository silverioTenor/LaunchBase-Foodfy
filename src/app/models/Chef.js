const Base = require('./Base');

class Chef extends Base {

  constructor() {
    super();
    this.table = 'chefs';
  }
}

module.exports = Chef;