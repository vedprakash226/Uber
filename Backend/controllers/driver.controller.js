const driverModel = require('../models/driver.model');
const driverService = require('../services/driver.service');
const { validationResult } = require('express-validator');

module.exports.registerDriver = async (req, res,next) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }

    const {fullname, email, password, vehicle} = req.body;
    //checking that driver is already present or not
    const isDriverAlreadyExist= await driverModel.findOne({email});
    if(isDriverAlreadyExist){
        return res.status(400).json({message: 'Driver already exist'});
    }

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