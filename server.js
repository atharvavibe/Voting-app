const express = require('express');
const cors = require('cors');

//const axios = require('axios');
const { default: axios } = require('axios');

const sequelize = require('./util/database');

const userRoutes = require('./routes/user');

const User = require('./model/user');
const Vote = require('./model/vote');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/user', userRoutes);

sequelize.sync().then(result => {
    app.listen(3000);
}).catch(err => {
    console.log(err);
});