import {User} from '../model/User.js'

// get all users 
const getAllUsers = async (req, res) => {
    const users = await User.find({});
    res.send(users);
}

// get user ( by id )
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send("User Not Found !");
        }

        const {password, updatedAt, ...other} = user._doc
        res.send(other)
        // res.send(user);
        
    } catch (error) {
        res.status(400).send(error);
    }
}

// update user 
const updateUser = async (req, res) => {
    try {
        let admin = await User.findById(req.params.id)
        !admin ? admin = "" : admin
 
        // console.log(admin)
        // console.log(admin.isAdmin)

        if (req.body.id === req.params.id || admin.isAdmin) {
            const {isAdmin, ...other} = req.body
            const user = await User.findByIdAndUpdate(req.body.id, other, {
                new: true,
            });
            res.send(user);
        } 
        else {
            res.status(400).send("you only update your account");
        }
    } 
    catch (error) {
        res.status(400).send(error);
    }
}

// delete user
const deleteUser = async (req, res) => {
    try {
        let user = await User.findById(req.body.id)
        if(!user){
            return res.status(404).send('User Not Found !')
        }
        
        let admin = await User.findById(req.params.id)
        if (req.body.id == req.params.id || admin.isAdmin) {
            const user = await User.findByIdAndDelete(req.body.id, { new: true });
            res.status(200).send('User has been deleted !');
        } 
        else{
            res.status(400).send("you only delete your account");
        }
    }
    catch (error) {
        res.status(400).send(error);
    }
}

// follow user 
const followUser =  async (req, res) => {
    try {
        if (req.body.id !== req.params.id) {
            const user = await User.findById(req.params.id);
            const curruser = await User.findById(req.body.id);

            if(!user){
                return res.status(404).send("Requested User doesn't exists !")
            }
            else if(!curruser){
                return res.status(404).send("Current User doesn't exists !")
            }
            else if(!user.followers.includes(req.body.id)) {
                await user.updateOne({ $push: { followers: req.body.id } });
                await curruser.updateOne({ $push: { followings: req.params.id } });

                res.status(200).json("user has been followed");
            } 
            else{
                res.status(403).json("you already followed !");
            }
        } 
        else {
            res.status(403).json("you can't follow yourself !");
        } 
    }
    catch (error) {
        res.status(400).json(error.message);
    }
}

// unfollow user 
const unfollowUser = async (req, res) => {
    try {
        if(req.body.id !== req.params.id ) {
            const user = await User.findById(req.params.id);
            const curruser = await User.findById(req.body.id);

            if(!user){
                return res.status(404).send("Requested User doesn't exists !")
            }
            else if(!curruser){
                return res.status(404).send("Current User doesn't exists !")
            }
            else if(user.followers.includes(req.body.id)) {
                await user.updateOne({ $pull: { followers: req.body.id } });
                await curruser.updateOne({ $pull: { followings: req.params.id } });

                res.status(200).json("user has been unfollowed");
            }
            else{
                res.status(403).json("you are not followed this user!");
            }
        } 
        else{
            res.status(403).json("you can't unfollow yourself !");
        }
    } 
    catch (error) {
        res.status(400).json(error);
    }
}

// exporting 
export {getAllUsers, getUserById, updateUser, deleteUser, followUser, unfollowUser}