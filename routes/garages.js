const express = require("express")
const app = express()
const Cars = require("../models/Cars")
const Garages = require("../models/Garages")
// route pour ajouter un garage en base de donée
app.post('/garages', async (req, res) => {    
    
    // on crée un nouveau garage avec le model Garages
    const garage = new Garages({
      ...req.body
    })
  
    garage.save((err, garage) => {
        // si il y a une erreur 
      if (err) {
        res.status(500).json({ error: err })
        return
      }
        //sinon tu me renvoie l'objet crée
      res.json(garage)
    })
  
})

app.get("/garages/:id",async (req, res) => {
    const { id } = req.params
    try {
        // avec la methode findOne et la comparaison quon lui passe lui permet de nous retourner le bon garage
      let garage = await Garages.findOne({ _id: id })
      console.log(garage);
    //   après on cherche la voiture qui le meme id du garage dans sa clef garage_id
      const car = await Cars.find({ garage_id : id })
      console.log(car);
    //   après je rajoute la voiture qui est lié par garage_id a ma variable garage 
      garage = {
          ...garage._doc,
          cars:car
      }
      console.log(garage);
    //   toujours log l'objet qui nous renvoie car il faudrat chercher la bonne clef ou sont no valeur
    // car sa nous renvoie plein de fichier mangoose function etc..
      res.json(garage)
    } catch (err) {
        console.log(err);
      res.status(500).json({ error: err })
    }
})

module.exports = app