const db = require('../../config/database');
const Base = require('./Base');

class Recipe extends Base {

  constructor() {
    super();
    this.table = 'recipes';
  }

  async findChefs() {
    try {
      let sql = `SELECT id, name FROM chefs`;

      const results = await db.query(sql);

      if (results.rows.length <= 0) {
        throw new Error(`Chefs not found!`);
      }

      return results.rows;
    } catch (err) {
      throw new Error(`Search error: ${err}`);
    }
  }
}

module.exports = Recipe;