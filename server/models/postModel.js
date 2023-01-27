const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    photo : {
        type : String,
    },
    likes : [{ type : mongoose.Schema.Types.ObjectId, ref: 'User' }],
    postedBy : {
        name :  { type : String},
        _id : { type : mongoose.Schema.Types.ObjectId}
    }
} , {timestamps : true })

module.exports = mongoose.model('Post' , postSchema)