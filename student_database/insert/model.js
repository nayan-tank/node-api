const studentSchema = require('./schema')
const mongoose = require('mongoose')

const Student = new mongoose.model('Student', studentSchema)

module.exports = Student
