const db = require('../../config/database');

const Base = require('./Base');

class FilesManager extends Base {

  constructor() {
    super();
    this.table = 'files_manager';
  }

  async find({ id, column }) {
    try {
      const sql = `
        SELECT files_manager.id AS fm_id, files.path FROM ${this.table}
        LEFT JOIN files ON (files_manager.id = files.files_manager_id)
        WHERE ${column} = $1;
      `;

      const results = await db.query(sql, [id]);

      if (results.rows.length <= 0) {
        throw new Error(`Files not found!: ${err}`);
      }

      return results.rows[0];
    } catch (err) {
      throw new Error(`Search error: ${err}`);
    }
  }
}

module.exports = FilesManager;