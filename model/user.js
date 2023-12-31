const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const newUser = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,

    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    phonenumber: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    hasVoted: {
        type: Sequelize.BOOLEAN
    }
})

module.exports = newUser;