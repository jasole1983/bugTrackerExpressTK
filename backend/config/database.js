const config = require('./index');

const db = config.db;
const username = 'bug_tracker_app';
const password = '8u67r4ck3r';
const database = 'bug_tracker';
const host = 'localhost';

module.exports = {
  development: {
    username,
    password,
    database,
    host,
    dialect: 'postgres',
    seederStorage: 'sequelize',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    seederStorage: 'sequelize',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};