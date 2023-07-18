const Sequelize = require('sequelize');

const sequelize = new Sequelize('voting-app', 'root', '212005',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize