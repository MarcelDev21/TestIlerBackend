const mongoose = require('mongoose')
//const { Schema } = mongoose;

const ProduitSchema = mongoose.Schema({
    title:{type:String, required:true},
    type:[{type:mongoose.Schema.Types.ObjectId, ref: 'Categorie'}], // plusieurs Produits
    image: {type: String},
    cloudinary_id: {type: String},
}, {timestamps: true})

module.exports = mongoose.model("ProduitSchema", ProduitSchema)