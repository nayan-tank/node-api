import { Post } from "../model/Post.js";
import { User } from "../model/User.js";

// get post 
const getPost =  async (req, res) => {
    const post = await Post.findById(req.params.id)
    if(!post){
        return res.status(404).send('Post Not Found!')
    }

    res.status(200).json(post)
}

// create post
const createPost = async (req, res) => {
    try {
        // check userId and postId exists in body or not
        if(req.body.userId == undefined){
            return res.status(422).send('required argument is missing!')
        } 

        const curruser = await User.findById(req.body.userId)
        if(!curruser){
            return res.status(404).send('User Not Found!')
        }

        const newPost = new Post(req.body)
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)

    } catch (error) {
        res.status(400).send(error)
    }
}

// delete post
const deletePost =  async (req, res) => {
    try {
        // check userId and postId exists in body or not
        if(req.body.userId == undefined || req.body.postId == undefined){
            return res.status(422).send('required argument is missing!')
        } 

        // check user exists or not
        const curruser = await User.findById(req.body.userId)
        if(!curruser){
            return res.status(404).send('User Not Found !')
        }

        // check post exists or not 
        const post = await Post.findById(req.body.postId);
        if (!post) {
            return res.status(404).send('Post Not Found !')
        }

        // check user belongs to post or not
        if(post.userId != req.body.userId){
            res.status(401).send("you are not authorized person to delete this post")
        }
        else{
            await Post.findByIdAndDelete(req.body.postId)
            res.status(200).send('post has been deleted !')
        }
        
    } catch (error) {
        res.status(400).send(error)
    }
}

// like post
const likePost =  async (req, res) => {
    try {
        if(req.body.userId == undefined){
            return res.status(422).send('required arguments is missing !')
        }

        const user = await User.findById(req.body.userId)
        if(!user){
            return res.status(404).send("User doesn't exists!")
        }

        const post = await Post.findById(req.params.postId)
        if(!post){
            return res.status(404).send('Post Not Found!')
        }
        else{
            // toggle 
            if(!post.likes.includes(req.body.userId)) {
                await post.updateOne({
                    $push: {likes: req.body.userId},
                    $pull: {dislikes: req.body.userId}}
                )
                res.status(200).send("post has been liked !");
            }
            else{
                res.status(200).send('you already like this post')
            }
        }

    } catch (error) {
        res.status(400).send(error)
    }
}

// dislike post 
const dislikePost = async (req, res) => {
    try {
        if(req.body.userId == undefined){
            return res.status(422).send('required argument is missing!')
        } 
        
        const user = await User.findById(req.body.userId)
        if(!user){
            return res.status(404).send("User doesn't exists!")
        }

        const post = await Post.findById(req.params.postId)
        if(!post){
            return res.status(404).send('Post Not Found!')
        }
        else{
            // toggle 
            if(!post.dislikes.includes(req.body.userId)) {
                await post.updateOne({
                    $push: {dislikes: req.body.userId},
                    $pull: {likes: req.body.userId}}
                )
                res.status(200).json("post has been disliked !");
            }
            else{
                res.status(200).send('you already dislike this post')
            }
        }

    } catch (error) {
        res.status(400).send(error)
    }
}

// exporting
export {getPost, createPost, deletePost, likePost, dislikePost}