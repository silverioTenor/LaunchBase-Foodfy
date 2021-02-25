const Base = require('./Base');

class File extends Base {

  constructor() {
    super();
    this.table = 'files';
  }
}

module.exports = File;