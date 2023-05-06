import { mongoose } from "mongoose";

const postSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        desc: {
            type: String,
            maxlength: 500
        },
        img: {
            type: String,
        },
        likes: {
            type: Array,
            default: []
        },
        dislikes: {
            type: Array,
            default: []
        },
    },
    {timestamps: true}
)

const Post = mongoose.model('Post', postSchema)

// export
export {Post}