import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    otp:{
        type: String,
    }, 
    verified:{
        type: Boolean,
        enum: [true, false],
        default: false
    },
    phone: {
        type: String,
        required: true
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
    savedBlogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog"
    }]
}, [{timestamps: true}])

export default mongoose.model('User', userSchema);