const mongoose = require('mongoose')

const TornilleriaModel = mongoose.Schema({
    imageProduit : {type: String, required: true},
    CategorieProduit : {type: String, required: true},
    nomProduit : {type: String, required: true},
    tailleProduit : {type: Number, required: true},
    nomUser : {type: String, required: true},
    quantiteEnStock : {type: Number, required: true},
    dateRetrait : {type: Date},
    DetailRetraitTornilleria: [{type: mongoose.Schema.Types.ObjectId, ref : "DetailRetraitTornilleria"}],
    DetailAjoutTornilleria: [{type: mongoose.Schema.Types.ObjectId, ref : "DetailAjoutTornilleria"}],
    quantitePropreARetierer : {type: Number}
})

module.exports = mongoose.model("Tonilleria", TornilleriaModel)