const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklistTokenSchema = require('../models/blacklistToken.model');
const driverModel = require('../models/driver.model');

module.exports.authUser = async (req, res, next) => {
    //checking that the user is authenticated or not using the token
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]; //this ? is added to check whether the headers.authorization is present or not
    if(!token){
        return res.status(401).json({message: 'Unauthorized'});
    }

    //checking for the token blacklisted or not
    const isBlacklisted = await blacklistTokenSchema.findOne({token});
    if(isBlacklisted){
        return res.status(401).json({message: 'Unauthorized access'});
    }

    //verifying the token and getting the user
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        req.user = user;
        return next();
    }catch(err){
        return res.status(401).json({message: 'Unauthorized access'});
    }
};

module.exports.authDriver = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({message: 'Unauthorized'});
    }

    const isBlacklisted = await blacklistTokenSchema.findOne({token});
    if(isBlacklisted){
        return res.status(401).json({message: 'Unauthorized access!'});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const driver = await driverModel.findById(decoded._id);

        req.driver = driver;
        return next();
    }catch(err){
        return res.status(401).json({message: 'Unauthorized access!!'});
    }
};