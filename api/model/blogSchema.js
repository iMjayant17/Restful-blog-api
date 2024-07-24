const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    author:String,
    authorId: String,
    title: String,
    description: String
})


module.exports = mongoose.model('blogSchema', blogSchema);