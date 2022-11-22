const dbConfig = require('../config/db.config.js');

const Sequlize = require('sequelize');

const sequelize = new Sequlize(dbConfig.DB, dbConfig.USER,dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    }
});

const db = {};

db.Sequlize = Sequlize;
db.sequelize = sequelize;

db.users = require('./user_model.js')(sequelize, Sequlize);
db.accounts = require('./account_model.js')(sequelize, Sequlize);

module.exports = db;