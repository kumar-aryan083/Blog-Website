import mongoose from 'mongoose'

const homeSchema = mongoose.Schema({
    homeRow: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }]
})

export default mongoose.model('Home', homeSchema);