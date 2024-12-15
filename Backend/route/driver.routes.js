const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const driverController = require('../controllers/driver.controller');

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be at least 3 characters'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters'),
    body('vechile.color').isLength({min:3}).withMessage('Color must be at least 3 characters'),
    body('vechile.plate').isLength({min:3}).withMessage('Plate must be at least 3 characters'),
    body('vechile.capacity').isNumeric().withMessage('Capacity must be a number'),
    body('vechile.vechileType').isIn(['car', 'motorcycle', 'auto']).withMessage('Invalid vechile type'),
],
    driverController.registerDriver
);

module.exports = router;