const { Pool } = require('pg');

const db = new Pool({
  user: 'postgres',
  password: 'docker',
  host: 'localhost',
  port: '5432',
  database: 'db_foodfy'
});

module.exports = db;