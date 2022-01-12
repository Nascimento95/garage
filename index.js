const express = require("express")
const app = express()
const port = 5000
const { dbConnect } = require("./config/db")

const carsRoutes =require("./routes/cars")
const garagesRoutes = require("./routes/garages")
// cette function me connecter a la base de donée
dbConnect()

app.use(express.json())

app.use('/', carsRoutes)
app.use('/', garagesRoutes)

app.listen(port, () => {
    console.log(`le serveur started on port ${port}`);
})