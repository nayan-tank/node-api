const User = require('./model')
const express = require('express');
const app = express()
const port = 3000

app.use(express.json());

// GET: home page 
app.get('/', (req, res) => {
    res.send('Welcome to API Page!')
})

// GET: get all users
app.get('/user', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
        // console.log(users);

    } catch (error) {
        res.status(500).send(error);
    }
})

// GET: get specific user
app.get('/user/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        
        if(!user){
            return res.status(500).send('User Not Found !')
        }
        res.send(user);
        console.log(user);
        
    } catch (error) {
        res.status(500).send(error);
    }
})

// POST: create new user
app.post('/user', async (req, res) => {
    try {
        const newUser = new User(req.body);
        const result = await newUser.save();
        res.send(result);
        console.log(result);

    } catch (error) {
        res.send(error);
    }
})

// PUT: update user 
app.put('/user/:id', async (req, res) => {
    try {
        let user = await User.findByIdAndUpdate(req.params.id,req.body, {new: true});
    
        if(!user){
            return res.status(500).send('User Not Found !');
        }
    
        res.send(user);
        console.log(user);
        
    } catch (error) {
        res.send(error);
    }
})

// PATCH: partialy update user 
app.patch('/user/:id', async (req, res) => {
    try {
        let user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
    
        if(!user){
            return res.status(500).send('User Not Found !');
        }
      
        res.send(user);
        console.log(user);
        
    } catch (error) {
        res.send(error);
    }
})


// DELETE:  delete user
app.delete('/user/:id', async (req, res) => {
    try {
        const delUser = await User.findByIdAndDelete(req.params.id);

        if(!delUser){
            return res.status(500).send('User Not Found !');
        }

        res.send(delUser);
        console.log(delUser);

    } catch (error) {
        res.send(error);
    }

})

// for All 404 error
app.all('*', (req, res) => {
    res.status(404).send('Page Not Found !');
})

// listing on port no ${port}
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})