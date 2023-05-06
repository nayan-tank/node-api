require('./conn')
const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3, trim: true, lowercase: true },
    surname: { type: String, required: true, trim: true, lowercase: true, minlength: 4 },
    email : { 
        type: String, required: true, unique: true, lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is Invalid');
            }
        }
    },
    phone: {
        type: String, required: true, 
        validate(value){
            if(!validator.isMobilePhone(value)){
                throw new Error('Phone is Invalid');
            }
        }
    },
    city: { type: String, required: true, lowercase: true }

})


// model creation 
const User = new mongoose.model('User', userSchema);

// user exporting 
module.exports = User;