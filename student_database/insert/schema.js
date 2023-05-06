require('./connection')
const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        default: Date.now,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    cgpa: {
        type: Number,
        required: true
    }
})

module.exports = studentSchema