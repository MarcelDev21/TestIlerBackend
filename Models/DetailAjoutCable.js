const mongoose = require('mongoose')

const DetailAjoutCable = mongoose.Schema({
    nomUser: {type: String, required: true},
    quantiteAjouté: {type: Number, required: true},
    dateRetrait: {type: Date, required: true},
    nomProduit: {type: String, required: true},
    tailleProduit: {type:String, required: true},
    //CategorieProduit: {type: String, required: true}
})

module.exports = mongoose.model("DetailAjoutCable", DetailAjoutCable)