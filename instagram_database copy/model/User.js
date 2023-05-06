import { mongoose } from "mongoose";
import pkg from 'validator';
const validator  = pkg;


mongoose.connect('mongodb://localhost:27017/insta_api')
.then(() => {
    console.log('Connected...!')
})
.catch((err) => {
    console.log(err)
})

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true, 
        minlength: 3,
        unique: true 
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is Invalid !')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    profilePicture: {
        type: String,
        default: ""
    },
    coverPicture: {
        type: String,
        default: ""
    },
    followers: {
        type: Array,
        default: []
    },
    followings: {
        type: Array,
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    desc: {
        type: String,
        maxlength: 50
    },
    city: {
        type: String,
        maxlength: 50
    },
    from: {
        type: String,
        maxlength: 50
    },
    relationship: {
        type: Number,
        enum: [1, 2, 3]
    }
},
{
    timestamps: true
})

const User = mongoose.model('User', userSchema)

export { User }
// module.exports = User
