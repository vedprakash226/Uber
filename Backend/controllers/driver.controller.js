const driverModel = require('../models/driver.model');
const driverService = require('../services/driver.service');
const { validationResult } = require('express-validator');
const blacklistTokenSchema = require('../models/blacklistToken.model');

module.exports.registerDriver = async (req, res,next) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }
    // console.log(req.body);
    const {fullname, email, password, vehicle} = req.body;
    //checking that driver is already present or not
    const isDriverAlreadyExist= await driverModel.findOne({email});
    if(isDriverAlreadyExist){
        return res.status(400).json({message: 'Driver already exist'});
    }
    // console.log(req.body);

    const hashPassword = await driverModel.hashPassword(password);
    const driver = await driverService.createDriver({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashPassword,
        color:vehicle.color,
        plate:vehicle.plate,
        capacity:vehicle.capacity,
        vehicleType:vehicle.vehicleType
    });

    const token = driver.generateAuthToken();
    res.status(201).json({token,driver});
};

module.exports.loginDriver = async (req, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }

    const {email, password} = req.body;
    const driver = await driverModel.findOne({email}).select('+password');
    //checking if the driver exist or not
    if(!driver){
        return res.status(401).json({message: 'Invalid email or password'});
    }
    
    //checking the password authenticity
    const isMatch = await driver.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({message: 'Invalid email or password!'});
    }

    const token = driver.generateAuthToken();
    res.cookie('token',token);
    res.status(200).json({token,driver});

};

module.exports.getDriverProfile = async (req, res, next) => {
    res.status(200).json(req.driver);
};

module.exports.logoutDriver = async(req, res, next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    await blacklistTokenSchema.create({token});

    res.clearCookie('token');

    res.status(200).json({message: 'Logged out successfully'});
};