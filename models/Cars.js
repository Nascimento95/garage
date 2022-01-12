const mongoose = require('mongoose')

const carSchema = mongoose.Schema({
    brand : { type: String, required : true},
    model : { type: String, required : true},
    year: { type: Number, required : true},
    garage_id : { type: String },
}, {
    // timestamps va créer automatiquement sans qu'on
    // ait a le spécifier les clés `createdAt` et `updatedAt`
    timestamps: true
})

// on exporte avec mongoose.model qui prend en param le nom du fichier , plus 
// le nom de la variable qui contient le model crée 
module.exports = mongoose.model('Cars',carSchema)