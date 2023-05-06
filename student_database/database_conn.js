const mongoose = require('mongoose');

// ----------- create connection 
mongoose.connect('mongodb://localhost:27017/student')
.then(() => {
    console.log('connected!');
})
.catch((err) => {
    console.log(err);
})


//------------ create schema 
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

});


// ------------ creating model
// - a mongoose model is a wrapper on the mongoose schema.
// - mongoose model provides an interface to the databse for creating, quering, updating, deleting records etc. 

const Student = new mongoose.model('Student', studentSchema);


// ------------ creating documents 

// const createDocument = async () => {
//     try {
//         const student1 = new Student({
//             fname: "Nayan", 
//             lname: 'Tank',
//             degree: 'BCA',
//             cgpa: 9.5
//         })

//         const result = await student1.save();
//         console.log(result);

//     } catch (error) {
//         console.log(error);
//     }
// };

// createDocument();

const createDocument = async (fname, lname, degree, cgpa) => {
    try {
        const student1 = new Student({
            fname, lname, degree, cgpa
        })

        const result = await student1.save();
        console.log(result);

    } catch (error) {
        console.log(error);
    }
};

createDocument('Tausif', 'Saiyad', 'BCA', 8.5);
createDocument('Chirag', 'Vaghela', 'BCA', 7.5);
createDocument('Nishita', 'Prajapati', 'BCA', 7.9);
createDocument('Mansi', 'Thakkar', 'BCA', 8.6);
createDocument('Heer', 'Panchal', 'BCA', 9.5);
createDocument('Himansu', 'Zaveri', 'BCA', 8.8);
createDocument('Jay', 'Rami', 'BCA', 8.5);

