const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('movies', 'postgres', 'azmi123', {
    host: 'localhost',
    dialect: 'postgres',
});

module.exports = sequelize;