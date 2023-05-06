const createDocument = require('./createDoc');
const express = require('express');
const res = require('express/lib/response');
const Student = require('./model');
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.post('/api', async (req, res) => {
    // createDocument(req.body);
    const s1 = new Student(req.body);
    try {
        await s1.save();
        res.send(req.body);

    } catch (error) {
        console.log(error);
    }
})

app.get('*', (req, res) => {
    res.status(404).send('Page Not Found.')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})
