import {User} from '../model/User.js'

// register user
const register = async (req, res) => {
    try {
        let {isAdmin, ...other} = req.body;
        // password = await bcrypt.hash(password, 10)
        // other = {password, ...other}

        const user = new User(other)
        const result = await user.save()
        
        res.send(result)

    } catch (error) {
        res.status(400).send(error.message)
    }

}

// login user
const login = async (req, res) => {
    try {
        const user = await User.findOne({userName: req.body.userName})

        if(req.body.userName == undefined || req.body.password == undefined){
            return res.status(400).send('Username and Password is required !')
        }
        else if(!user){
            return res.status(404).send('User Not Found')
            // return res.status(404).send('Invalid username or password')
        }
        else if(user.password !== req.body.password){
            return res.status(400).send('Invalid Passwod !')
        }
        else{
            res.send('Login Successfuly...!')
        }
        
    } catch (error) {
        res.status(500).send(error)
    }

}

// set admin 
const setAdmin = async (req, res) => {
    try {
        // check required parameter 
        if(req.body.adminId == undefined || req.body.userId == undefined){
            return res.status(422).send('required argument is missing !')
        }
        // check user exists
        const user = await User.findById(req.body.userId)
        if(!user){
            return res.status(404).send('User Not Found!')
        }
        // check passed adminId is actually admin
        const admin = await User.findById(req.body.adminId)
        const isAdmin = admin.isAdmin
        
        if(isAdmin){
            const user = await User.findByIdAndUpdate(req.body.userId, {isAdmin: true}, {new: true});  
            res.status(200).send(user)
        }
        else{
            res.status(401).send('you are not authorized user to set admin')
        }
        
    } catch (error) {
        res.status(400).send(error)
    }

}

// userSchema.pre('save', async function(next){
//     if(this.isModified('password')){
//         this.password = await bcrypt.hash(this.password, 10)
//     }
//     next();
// })

export {register, login, setAdmin}





