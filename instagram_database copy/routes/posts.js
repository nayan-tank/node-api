import express from "express";
const router = express.Router()
import { getPost, createPost, deletePost, likePost, dislikePost } from "../controller/post-Controller.js"
// get post 
router.get('/:id', getPost)
// create post
router.post('/', createPost)
// delete post
router.delete('/', deletePost)
// like post
router.put('/like/:postId', likePost)
// dislike post 
router.put('/dislike/:postId', dislikePost)

export {router}