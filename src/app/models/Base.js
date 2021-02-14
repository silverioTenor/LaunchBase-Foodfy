const db = require('../../config/database');

class Base {

  constructor() {
    this.table = this;
  }

  async find() {
    try {
      let sql = `SELECT * FROM ${this.table}`;

      const results = await db.query(sql);
      return results.rows[0];
    } catch (err) {
      throw new Error(`Search error: ${err}`);
    }
  }

  async findOne(filters) {
    try {
      let sql = `SELECT * FROM ${this.table}`;

      Object.keys(filters).map(key => {
        sql += ` ${key}`;

        Object.keys(filters[key]).map(field => {
          sql += ` ${field} = '${filters[key][field]}'`;
        });
      });

      const results = await db.query(sql);
      return results.rows[0];
    } catch (err) {
      throw new Error(`Search error: ${err}`);
    }
  }

  async save(fields) {
    try {
      let keys = [],
        values = [];

      Object.keys(fields).map((key) => {
        keys.push(key);
        values.push(`'${fields[key]}'`);
      });

      const sql = `INSERT INTO ${this.table} (${keys.join(',')}) 
      VALUES (${values.join(',')}) RETURNING id`;

      const results = await db.query(sql);
      return results.rows[0].id;
    } catch (err) {
      throw new Error(`Error saving: ${err}`);
    }
  }

  update() { }

  delete() { }
}

module.exports = Base;