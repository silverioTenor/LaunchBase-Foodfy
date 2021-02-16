const Base = require('./Base');

class FilesManager extends Base {

  constructor() {
    super();
    this.table = 'files_manager';
  }
}

module.exports = FilesManager;