const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const hbs = require('hbs')

// static path 
// const staticPath = path.join(__dirname, './public')
const staticPath = path.join(__dirname)
const tmpPath = path.join(__dirname, './temp_engine/views')
const partialPath = path.join(__dirname, './temp_engine/partials')

// middleware 
app.use(express.static(staticPath))
app.set('view engine', 'hbs')
app.set('views', tmpPath)
hbs.registerPartial(partialPath)

// routing 
app.get('/', (req, res) => {
    // res.send('Hello World!')
    res.render('index', {
        userName: 'Nayan'
    });
})

app.get('/about', (req, res) => {
    res.sendFile(staticPath + '/about.html')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})

