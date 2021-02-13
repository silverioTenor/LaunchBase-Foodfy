const db = require('../../config/database');

class Base {

  constructor() {
    this.table = this;
  }

  find() { }

  findAll() { }

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
      console.log(`Search error: ${err}`);
    }
  }

  async save(values) {
    try {
      let keys = [];
      values = [];

      Object.keys(values).map((key) => {
        keys.push(key);
        values.push(`${values[key]}`);
      });

      const sql = `INSERT INTO ${this.table} (${keys.join(',')}) 
      VALUES (${values.join(',')}) RETURNING id`;

      const results = await db.query(sql);
      return results.rows[0].id;
    } catch (err) {
      console.log(`Error saving: ${err}`);
    }
  }

  update() { }

  delete() { }
}

module.exports = Base;