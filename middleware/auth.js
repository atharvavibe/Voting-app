const jwt = require('jsonwebtoken');
const user = require('../model/user');

exports.authenticate = async (req, res, next) => {
    try{
        const token = req.header('Authorization');
        const userId = jwt.verify(token, 'secret');
        console.log('userId>>>>'+userId.userId);
        const User = await user.findByPk(userId.userId);
        req.user = User;
        next();
    }catch(err){
        console.log(err);
        return res.status(404).json({message: 'Authentication error', success: false});
    }
}