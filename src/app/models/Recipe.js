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

  async findRecipesWithChef() {
    try {
      let sql = `
        SELECT chefs.name AS chef_name, recipes.* FROM ${this.table}
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
      `;

      const results = await db.query(sql);

      if (results.rows.length <= 0) {
        throw new Error(`${this.table} not found!`);
      }

      return results.rows;
    } catch (err) {
      throw new Error(`Search error: ${err}`);
    }
  }

  async findOneRecipeWithChef(id) {
    try {
      let sql = `
        SELECT chefs.name AS chef_name, recipes.* FROM ${this.table}
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        WHERE recipes.id = ${id};
      `;

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

module.exports = Recipe;