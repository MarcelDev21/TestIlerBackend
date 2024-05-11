const mongoose = require('mongoose')

const AjoutRetrait = mongoose.Schema({
    nomUtilisateur : {type: String, required: true},
    AjouterCable: [{type: mongoose.Schema.Types.ObjectId, ref : "cables"}],
    quantiteRetire: {type: Number},
    date: {type: Date}
})

module.exports = mongoose.model('AjoutRetrait', AjoutRetrait)