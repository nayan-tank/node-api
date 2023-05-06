const mongoose = require('mongoose')

// established connection 
mongoose.connect('mongodb://localhost:27017/api')
.then(() => {
    console.log('Connected !');
})
.catch((err) => {
    console.log(err)
})

