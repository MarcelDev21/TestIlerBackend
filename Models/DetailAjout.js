const mongoose = require('mongoose')

const DetailAjout = mongoose.Schema({
    nomUser: {type: String, required: true},
    quantiteAjouté: {type: Number, required: true},
    dateRetrait: {type: Date, required: true},
    nomProduit: {type: String, required: true},
    tailleProduit: {type:Number, required: true},
    CategorieProduit: {type: String, required: true}
})

module.exports = mongoose.model("DetailAjout", DetailAjout)