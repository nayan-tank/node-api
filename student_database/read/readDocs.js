require('../insert/connection')
const Student = require('../insert/model');

const getDocument = async () => {
    try {
        const result = await Student
        .find()
    
        return result;
        // console.log(result);
    } catch (error) {
        console.log(error);
    }
}

// getDocument();
module.exports = getDocument
