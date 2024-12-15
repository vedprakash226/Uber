const driverModel = require('../models/driver.model');

module.exports.createDriver = async ({
    firstname, lastname, email, password, color, plate, capacity, vechileType
})=>{
    if(!firstname || !email || !password || !color || !plate || !capacity || !vechileType){
        throw new Error('All fields are required');
    }
    const driver = driverModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password,
        vechile:{
            color,
            plate,
            capacity,
            vechileType
        }
    })

    return driver;
}