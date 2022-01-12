const express = require("express")
const app = express()
//  j'apelle mon model cars
const Cars = require("../models/Cars")

// route qui permet de crée des voitures
app.post('/car', async (req, res) => {
    // 2 manières pour créer un document en base de donnée
    
    // 1ere méthode
    // on crée un nouvel etudiant avec le model Student
    const car = new Cars({
      ...req.body
    })
  
    car.save((err, car) => {
        // si il y a une erreur 
      if (err) {
        res.status(500).json({ error: err })
        return
      }
        //sinon tu me renvoie l'objet crée
      res.json(car)
    })
  
})

// route qui permet de voir toute les voitures en async
app.get ("/cars", async (req, res) => {

    try {
        const cars = await Cars.find().select("-createdAt -updatedAt -__v").exec()
        res.json(cars)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

// route qui recupère une voiture par rapport a son id
app.get('/cars/:id', async (req, res) => {
    const { id } = req.params
  
    try {
        // avec la methode findOne et la comparaison quon lui passe lui permet de nous retourner le bon véhicule 
      const car = await Cars.findOne({ _id: id }).exec()
      
      res.json(car)
    } catch (err) {
      res.status(500).json({ error: err })
    }
})

// route qui permet de modifier les info d'une voiture
app.put('/:id', async (req, res) => {
    const { id } = req.params
  
    try {
        // la methode findOneAndUpdate de mongoose me permet de trouver et de modifier l'objet en question
      const car = await Cars.findOneAndUpdate(
        // le filter quon lui passe pour trouver la bonne voiture a changer
        { _id: id },
        // les données qu'on met a jour
        {
          $set: { ...req.body }
        },
        // les options, new:true permet de retourner la voiture à jour dans posteman
        { new: true }
      ).exec()
  
      res.json(car)
    } catch(err) {
      res.status(500).json({ error: err })
    }
})

// route qui va effacer une voiture
app.delete("/cars/delete/:id",async (req, res) => {
    const { id } = req.params

    try {
        // on utilise la methode de mongoose deleteOne avec la comparaison 
        // qui lui permet de cibler le bonne élément 
        await Cars.deleteOne({ _id: id }).exec()
        res.status(200).json({ success: "car deleted" })
    } catch(err) {
        res.status(500).json({ error: err })
    }
})
  
module.exports = app