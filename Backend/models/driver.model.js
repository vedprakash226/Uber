const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const driverSchema  = new Schema({
    fullname:{
        firstname:{
            type: String,
            required: true,
            minlength:[3, 'First name must be at least 3 characters'],
        },
        lastname:{
            type: String,
            minlength:[3, 'Last name must be at least 3 characters'],
        }
    },
    email:{
        type: String, 
        required: true,
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'is invalid'],
    },
    password:{
        type: String,
        required: true,
        select: false,
    },
    socketId:{
        type: String,
    },
    status:{
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',
    },
    vechile:{
        color:{
            type: String,
            required: true,
            minlength:[3, 'Color must be at least 3 characters'],
        },
        plate:{
            type: String,
            required: true,
            minlength:[3, 'Plate must be at least 3 characters'],
        },
        capacity:{
            type:Number,
            required: true,
            min: [1, 'Capacity must be at least 1'],
        },
        vechileType:{
            type: String,
            required: true,
            enum: ['car', 'motorcycle', 'auto'],
        }
    },
    location:{
        lat:{
            type: Number,
        },
        lng:{
            type: Number,
        },
    }
});

driverSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET,{expiresIn: '12h'});
    return token;
};

driverSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
};

driverSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
};

const driverModel = mongoose.model('Driver', driverSchema);

module.exports = driverModel;