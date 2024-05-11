const mongoose = require('mongoose')

const AccueilDescription = mongoose.Schema({
    imageIlerdagua: {type: String},
    cloudinary_id: {type: String},
    nomOutil : {type: String}, 
    Description: {type: String},
})

module.exports = mongoose.model('AccueilDescription', AccueilDescription)