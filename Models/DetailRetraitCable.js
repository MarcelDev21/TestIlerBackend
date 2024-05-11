const mongoose = require('mongoose')

const DetailRetraitCable = mongoose.Schema({
    nomUser: {type: String,},
    quantiteRetirer: {type: Number,},
    dateRetrait: {type: Date,},
    nomProduit: {type: String,},
    tailleProduit: {type:String,},
    //CategorieProduit: {type: String, required: true}
})

module.exports = mongoose.model("DetailRetraitCable", DetailRetraitCable)