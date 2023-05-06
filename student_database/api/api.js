const express = require('express')
const getDocById = require('../read/readByName')
const getDocByName = require('../read/readByName')
const getDocument = require('../read/readDocs')

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!!')
    
})

app.get('/api', (req, res) => {
    try {
        const result = getDocument()
        .then((data) => {
            res.send(data)
            console.log(req.query.fname)

        })
        .catch((error) => console.log(error))
        

    } catch (error) {
        console.log(error)
    }
})


// app.get('/api/:fname', (req, res) => {
//     console.log('get called...')
//     try {
//         const result = getDocByName(req.query.fname)
//         .then((data) => {
//             const stu = data.find(s => s.sid === parseInt(req.params.sid));
//             if(!stu) return res.status(404).send('Data Not Found');

//             console.log(stu);
//             res.send(stu)
//         })
//         .catch((error) => console.log(error))
        
//         console.log(result);

//     } catch (error) {
//         console.log(error)
//     }
// })


app.get('/api/:id', (req, res) => {
    console.log('get called...')
    try {
        const result = getDocById(req.param.id)
        .then((data) => {
            const stu = data.find(s => s.id === parseInt(req.params.id));
            if(!stu) return res.status(404).send('Data Not Found');


            console.log("stu: ",stu);
            console.log("params: ", req.params)
            // res.send(stu)
        })
        .catch((error) => console.log(error))

    } catch (error) {
        console.log(error)
    }
})

app.get('*', (req, res) => {
    res.status(404).send('Page Not Found.');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})


