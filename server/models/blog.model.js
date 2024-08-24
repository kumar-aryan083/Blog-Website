import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    keyword: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    content: {
        type: String,
        required: true
    },
    cat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    dislikes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin"
    }
}, [{timestamps: true}])

export default mongoose.model('Blog', blogSchema);