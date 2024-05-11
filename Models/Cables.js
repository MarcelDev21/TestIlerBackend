const mongoose = require('mongoose')

const CableSchema = mongoose.Schema({
    imageVoiture: {type: String},
    cloudinary_id: {type: String},
    nomCable:{type:String, required: true},
    nomUser:{type:String, required: true},
    Dimmension:{type:String},
    Taille:{type:Number, required: true},
    Quantite:{type:Number},
    DetailAjoutCable: [{type: mongoose.Schema.Types.ObjectId, ref : "DetailAjoutCable"}],
    DetailRetraitCable: [{type: mongoose.Schema.Types.ObjectId, ref : "DetailRetraitCable"}],
    //QuantiteDemande:[{nomUtilisateur: String, QuantiteEnleveUser: Number}] on doit avoir la date du jour ou tu as enlevé
})

module.exports =  mongoose.model("cables", CableSchema)