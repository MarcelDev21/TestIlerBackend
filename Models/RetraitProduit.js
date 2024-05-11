const mongoose = require('mongoose')

const RetraitSchema = mongoose.Schema({
    nomUtilisateur : {type: String, required: true},
    produit: [{type: mongoose.Schema.Types.ObjectId, ref : "Categorie"}],
    CablesRetrait: [{type: mongoose.Schema.Types.ObjectId, ref : "cables"}],
   // TubosRetrait: [{type: mongoose.Schema.Types.ObjectId, ref : "TubosSchema"}],
    //AjouterCable: [{type: mongoose.Schema.Types.ObjectId, ref : "cables"}],
    TubosRetrait: [{MesTubos: {type: mongoose.Schema.Types.ObjectId, ref : "TubosSchema"}, dateRetrait:  Date}],
    TubosRetraits: [{type: mongoose.Schema.Types.ObjectId, ref : "TubosSchema"}],
    quantiteRetire: {type: Number},
    date: {type: Date} 
})

module.exports = mongoose.model('Retrait', RetraitSchema)