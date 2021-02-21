const db = require('../../config/database');

const Base = require('./Base');

class File extends Base {

  constructor() {
    super();
    this.table = 'files';
  }

  async save(fields) {
    try {
      const sql = `INSERT INTO ${this.table} (path, files_manager_id) 
      VALUES ($1, $2) RETURNING id`;

      const results = await db.query(sql, fields);
      return results.rows[0].id;
    } catch (err) {
      throw new Error(`Error saving: ${err}`);
    }
  }

  async update(fields) {
    try {
      const sql = `UPDATE ${this.table} SET path = $1 WHERE files_manager_id = $2;`;

      return await db.query(sql, fields);
    } catch (err) {
      throw new Error(`Error updating: ${err}`);
    }
  }
}

module.exports = File;