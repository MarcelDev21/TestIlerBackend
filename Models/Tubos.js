const mongoose = require('mongoose')

const TubosSchema = mongoose.Schema({
    imageProduit : {type: String, required: true},
    CategorieProduit : {type: String, required: true},
    nomProduit : {type: String, required: true},
    tailleProduit : {type: Number, required: true},
    nomUser : {type: String, required: true},
    quantiteEnStock : {type: Number, required: true},
    dateRetrait : {type: Date, required: true},
   // quantiteARetierer : {type: Array},
    /*quantiteARetierer: [{
        nomUser: String, 
        quantiteRetirer:Number, 
        dateRetrait: Date,
        nomProduit:String, 
        tailleProduit: Number, 
        CategorieProduit: String}],*/
    /*quantiteTubosAEnregistrer:[{
            nomUser: String, 
            quantiteAjouté:Number, 
            dateRetrait: Date,
            nomProduit:String, 
            tailleProduit: Number, 
            CategorieProduit: String
        }],*/
    DetailRetrait: [{type: mongoose.Schema.Types.ObjectId, ref : "DetailRetrait"}],
    DetailAjout: [{type: mongoose.Schema.Types.ObjectId, ref : "DetailAjout"}],
    quantitePropreARetierer : {type: Number}
})

module.exports = mongoose.model("TubosSchema", TubosSchema)