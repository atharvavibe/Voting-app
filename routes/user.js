const userController = require('../controllers/user');
const voteController = require('../controllers/vote')
const userAuthentication = require('../middleware/auth');

const express = require('express');

const router = express.Router();

router.post('/signup', userController.signup);

router.post('/login', userController.login);

router.post('/vote', userAuthentication.authenticate, voteController.vote);

router.get('/admin',userAuthentication.authenticate, voteController.getVotes);

module.exports = router;