import mongoose from 'mongoose'

var Schema = mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    username: String,
    password: String
})

export default mongoose.model('User', Schema)