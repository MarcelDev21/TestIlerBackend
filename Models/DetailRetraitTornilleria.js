const mongoose = require('mongoose')

const DetailRetraitTornilleria = mongoose.Schema({
    nomUser: {type: String, required: true},
    quantiteRetirer: {type: Number, required: true},
    dateRetrait: {type: Date, required: true},
    nomProduit: {type: String, required: true},
    tailleProduit: {type:Number, required: true},
    CategorieProduit: {type: String, required: true}
})

module.exports = mongoose.model("DetailRetraitTornilleria", DetailRetraitTornilleria)