const mongoose = require('mongoose')

const CategorieSchema = mongoose.Schema({
    ProductId: {type:String, required: true}, // id Arandelas
    CategorieProduct: [{
        nom: {type:String, required: true},
        quantite: {type: Number, required: true},
        Taille:{type:Number, required: true},
        typologie: {type: String, required: true}, // inox ou galva
        description: {type: String},
        nomUser: {type: String},
        DateDuRetrait : {type: Date}
    }]
})

module.exports = mongoose.model("Categorie", CategorieSchema)