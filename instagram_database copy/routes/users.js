import express from 'express';
const router = express.Router()
import {getAllUsers, getUserById, updateUser, deleteUser, followUser, unfollowUser} from '../controller/user-Controller.js'

// get all users
router.get("/", getAllUsers);
// get a user
router.get("/:id", getUserById);
// update user
router.patch("/:id", updateUser);
// delete user
router.delete("/:id", deleteUser);
// follow user
router.put("/follow/:id", followUser);
// unfollow user
router.put("/unfollow/:id", unfollowUser);

export {router};
