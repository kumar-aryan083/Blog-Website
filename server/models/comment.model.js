import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    commentContent: {
        type: String,
        required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    dislikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
    },
    edited: {
        type: Boolean,
        default: false
    }
}, [{timestamps: true}])

export default mongoose.model('Comment', commentSchema);