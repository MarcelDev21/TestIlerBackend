const mongoose = require('mongoose')

const TokenNotification = mongoose.Schema({
    userId: {type: String},
    nom:{type: String},
    token: {type: String},
    data: { type: Object}
})

module.exports = mongoose.model('TokenNotification', TokenNotification)