import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    cat: {
        type: String,
        required: true
    },
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }]
}, [{timestamps: true}])

export default mongoose.model('Category', categorySchema);