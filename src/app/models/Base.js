const db = require('../../config/database');

class Base {

  constructor() {
    this.table = this;
  }

  async find(params) {
    try {
      const { limit, offset } = params;

      const totalQuery = `(
        SELECT COUNT(*) FROM ${this.table}
      ) AS total`;

      const sql = `
        SELECT *, ${totalQuery} FROM ${this.table} 
        ORDER BY ${this.table}.updated_at
        LIMIT $1 OFFSET $2
      `;

      const results = await db.query(sql, [limit, offset]);

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
        values = [],
        positions = [];

      Object.keys(fields).map((key, index) => {
        keys.push(key);
        values.push(fields[key]);
        positions.push(`$${++index}`);
      });

      const sql = `INSERT INTO ${this.table} (${keys.join(',')}) 
      VALUES (${positions.join(',')}) RETURNING id`;

      const results = await db.query(sql, values);
      return results.rows[0].id;
    } catch (err) {
      throw new Error(`Error saving: ${err}`);
    }
  }

  async update(val, fields) {
    try {
      const { id, column } = val;

      let lines = [],
        values = [];

      Object.keys(fields).map((key, index) => {
        const line = `${key} = $${++index}`;
        lines.push(line);
        values.push(fields[key]);
      });

      const sql = `UPDATE ${this.table} SET ${lines.join(',')}
      WHERE ${column} = ${id}`;

      return await db.query(sql, values);
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

  async search(params) {
    try {
      const { filter, limit, offset } = params;

      let filterQuery = '',
        totalQuery = `(
        SELECT COUNT(*) FROM ${this.table}
      ) AS total`;

      if (filter) {
        filterQuery = `WHERE ${this.table}.name ILIKE '%${filter}%'`;

        totalQuery = `(
          SELECT COUNT(*) FROM ${this.table}
          ${filterQuery}
        ) AS total`;
      }

      const sql = `
        SELECT ${this.table}.id, ${this.table}.name, ${totalQuery} FROM ${this.table}
        ${filterQuery}
        ORDER BY ${this.table}.id
        LIMIT $1 OFFSET $2
      `;

      const results = await db.query(sql, [limit, offset]);
      return results.rows;
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = Base;