const mongoose = require('mongoose')

const FavorisSchema = mongoose.Schema({
    userName:{type: String, required: true},
    Favoris: [
        //{type: mongoose.Schema.Types.ObjectId, ref:"Categorie"},
       {type: mongoose.Schema.Types.ObjectId, ref: "cables"}
    ],
    FavorisCategorie : [{type: mongoose.Schema.Types.ObjectId, ref:"Categorie"}],
    FavorisCable : [{type: mongoose.Schema.Types.ObjectId, ref:"cables"}],
    FavorisTubos : [{type: mongoose.Schema.Types.ObjectId, ref:"TubosSchema"}],
    FavorisTornilleria : [{type: mongoose.Schema.Types.ObjectId, ref:"Tonilleria"}]
})

module.exports = mongoose.model("Favoris", FavorisSchema)
