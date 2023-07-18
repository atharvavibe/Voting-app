const User = require('../model/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


exports.signup = async (req, res) => {
    try{
        const {username, password, email, phonenumber} = req.body;
        console.log(req.body);
        const ifUserExists = User.findAll({where: {email: email}});
        if(ifUserExists.length > 0){
            return res.status(404).json({message: 'User Already exist'});

        }else{
            bcrypt.hash(password, 10, async (err, hash) => {
                console.log(err)
                const userData = User.create({username, email, phonenumber, password: hash})
                res.status(200).json({success: true, message: 'User created successfully', data: userData})
            })
        }

    }catch(err){
        console.log(err);
    }
}
const generateAccessToken = (id, username, hasVoted) => {
    return jwt.sign({userId: id, username: username, hasVoted: hasVoted}, 'secret');
}
exports.login = async (req, res) => {
    try{
        const {email, password} = req.body;
        const users = await User.findAll({where: {email}}).then(user => {
           let isAdmin = false;
            if(user.length > 0){
                bcrypt.compare(password, user[0].password, (err, result) => {
                    if(result === true){
                        if(user[0].username === 'admin'){
                            isAdmin = true;
                           return res.status(200).json({success: true ,message: 'admin login successful', token:generateAccessToken(user[0].id, user[0].username, user[0].hasVoted), isAdmin})
                        }
                        return res.status(200).json({success: true, message: 'User logged in successfully!', token:generateAccessToken(user[0].id, user[0].username, user[0].hasVoted), isAdmin})
                    }else{
                        return res.status(400).json({success: false, message: 'Password incorrect'})
                    }
                })
            }else{
                return res.status(400).json({success: false, message: 'User does not exists'})
            }
        })
    }catch(err){
        console.log(err);
    }
}
