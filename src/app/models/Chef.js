const db = require('../../config/database');

const Base = require('./Base');

class Chef extends Base {

  constructor() {
    super();
    this.table = 'chefs';
  }

  async findChefWithRecipes(id) {
    try {
      const subQuery = `(
        SELECT COUNT(*) FROM recipes
        WHERE chef_id = ${id}
      ) AS total_recipes`;

      let sql = `SELECT chefs.*, ${subQuery} FROM ${this.table}
      LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
      WHERE chefs.id = ${id}`;

      const results = await db.query(sql);

      if (results.rows.length <= 0) {
        throw new Error(`${this.table} not found!`);
      }

      return results.rows[0];
    } catch (err) {
      throw new Error(`Search error: ${err}`);
    }
  }
}

module.exports = Chef;