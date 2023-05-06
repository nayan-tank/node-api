import express from "express";
const router = express.Router()
import { register, login, setAdmin} from '../controller/auth-Controller.js';

// create new user 
router.post('/register', register);
// login
router.post('/login', login)
// make new admin 
router.patch('/setAdmin', setAdmin) 

// module.exports = router
export { router }