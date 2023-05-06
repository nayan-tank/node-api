// const mongoose = require('mongoose')
import mongoose from 'mongoose'

// established connection 
mongoose.connect('mongodb://localhost:27017/insta_api')
.then(() => {
    console.log('Connected...!')
})
.catch((err) => {
    console.log(err)
})

