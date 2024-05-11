const mongoose = require('mongoose')
const ContactSchema = mongoose.Schema({
    name: String,
    image: String,
    cloudinary_id: String,
})

module.exports = mongoose.model('Contact', ContactSchema)