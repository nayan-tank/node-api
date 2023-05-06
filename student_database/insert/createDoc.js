const Student = require("./model");

const createDocument = async (fname, lname, degree, cgpa) => {
    try {
        const stu1 = new Student({
            fname, lname, degree, cgpa
        })

        const result = await stu1.save(); 
        console.log(result);

    } catch (error) {
        console.log(error);
    }
}

module.exports = createDocument;