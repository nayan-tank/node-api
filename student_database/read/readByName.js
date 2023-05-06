require('../insert/connection')
const Student = require('../insert/model');

const getDocByName = async (fname) => {
    try {
        const result = await Student
        .find({fname})
        console.log(result);
        return result;

    } catch (error) {
        console.log(error);
    }
}

// getDocByName('Nayan');

const getDocById = async (id) => {
    try {
        const result = await Student
        .find({id})
        console.log(result);
        return result;

    } catch (error) {
        console.log(error);
    }
}

getDocById(1)

module.exports = getDocByName
module.exports = getDocById
