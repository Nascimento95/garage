const mongoose = require('mongoose')

const garageSchema = mongoose.Schema({
    name : { type: String, required : true},
}, {
    // timestamps va créer automatiquement sans qu'on
    // ait a le spécifier les clés `createdAt` et `updatedAt` qui sont le date de création plus la date des updates
    timestamps: true
})

// on exporte avec mongoose.model qui prend en param le nom du fichier , plus 
// le nom de la variable qui contient le model crée 
module.exports = mongoose.model('Garages',garageSchema)