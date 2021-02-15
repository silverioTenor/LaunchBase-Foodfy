const db = require('../../config/database');

class Base {

  constructor() {
    this.table = this;
  }

  async find() {
    try {
      let sql = `SELECT id, name, email FROM ${this.table}`;

      const results = await db.query(sql);

      if (results.rows.length <= 0) {
        throw new Error(`${this.table} not found!`);
      }

      return results.rows;
    } catch (err) {
      throw new Error(`Search error: ${err}`);
    }
  }

  async findByID(id) {
    try {
      let sql = `SELECT * FROM ${this.table} WHERE id = ${id}`;

      const results = await db.query(sql);

      if (results.rows.length <= 0) {
        throw new Error(`${this.table} not found!`);
      }

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

  async update(val, fields) {
    try {
      const { id, column } = val;

      let setFields = [];

      Object.keys(fields).map((key) => {
        const line = `${key} = '${fields[key]}'`;
        setFields.push(line);
      });

      const sql = `UPDATE ${this.table} SET ${setFields.join(',')}
      WHERE ${column} = ${id}`;

      return await db.query(sql);
    } catch (err) {
      throw new Error(`Error updating: ${err}`);
    }
  }

  async delete(id) {
    try {
      const sql = `DELETE FROM ${this.table} WHERE id = ${id}`;

      return await db.query(sql);
    } catch (err) {
      throw new Error(`Error deleting: ${err}`);
    }
  }
}

module.exports = Base;