const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const newVote = sequelize.define('vote', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    candidate: {
        type: Sequelize.STRING,
        allowNull: false,
    }
})

module.exports = newVote;