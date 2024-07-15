const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: String,
    author: String,
    fullName:String,
    password: String,
    profilePic: String,
    college: String
})

module.exports = mongoose.model('studentSchema', studentSchema);