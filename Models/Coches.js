const mongoose = require('mongoose')

const CochesSchema = mongoose.Schema({
    nomProprietaire:{type:String, required: true},
    immatriculationVoiture: {type:String, required: true},
    imageVoiture: {type: String, required:true},
    cloudinary_id: {type: String, required:true},
    dateItv:{type:Date}
})

module.exports = mongoose.model("Voiture", CochesSchema)