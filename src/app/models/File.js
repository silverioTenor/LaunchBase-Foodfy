const db = require('../../config/database');

const Base = require('./Base');

class File extends Base {

  constructor() {
    super();
    this.table = 'files';
  }

  // async update(fields) {
  //   try {
  //     const sql = `UPDATE ${this.table} SET path = $1 WHERE files_manager_id = $2;`;

  //     return await db.query(sql, fields);
  //   } catch (err) {
  //     throw new Error(`Error updating: ${err}`);
  //   }
  // }
}

module.exports = File;